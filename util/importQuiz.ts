import { Quiz } from "@/types/quiz";
import { pool } from "@/util/db";


export async function importQuiz(quizzes: Quiz[]) {
    const client = await pool.connect();

    try {
        await client.query("begin");
        await client.query("delete from quizzes"); //Alles löschen
        for (const quiz of quizzes) {
            const quizResult = await client.query<{ id: number }>(
                `
      insert into quizzes (slug, title, description, category)
      values ($1, $2, $3, $4)
      returning id
      `,
                [quiz.slug, quiz.title, quiz.description ?? null, quiz.category ?? null]
            );

            const quizId = quizResult.rows[0].id;

            for (const [questionIndex, q] of quiz.questions.entries()) {
                const questionResult = await client.query<{ id: number }>(
                    `
        insert into questions (quiz_id, question, position)
        values ($1, $2, $3)
        returning id
        `,
                    [quizId, q.question, questionIndex]
                );

                const questionId = questionResult.rows[0].id;

                for (const [answerIndex, answer] of q.answers.entries()) {
                    await client.query(
                        `
          insert into answers (question_id, answer, position, is_correct)
          values ($1, $2, $3, $4)
          `,
                        [
                            questionId,
                            answer,
                            answerIndex,
                            answerIndex === q.correctAnswer,
                        ]
                    );
                }
            }
        }

    

    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}