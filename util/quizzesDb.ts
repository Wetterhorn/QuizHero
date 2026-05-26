import { Quiz, Question } from "@/types/quiz";
import { pool } from "@/util/db";

export async function getQuizById(id: string): Promise<Quiz | null> {
    const quizId = Number(id);

    if (!Number.isInteger(quizId)) {
        return null;
    }

    const client = await pool.connect();

    try {
        // Quiz laden
        const quizResult = await client.query<Quiz>(
            `
      select id, slug, title, description, category
      from quizzes
      where id = $1
      `,
            [quizId]
        );

        if (quizResult.rows.length === 0) {
            return null;
        }

        const quizRow = quizResult.rows[0];

        // Fragen laden
        const questionsResult = await client.query<{
            id: number;
            question: string;
            position: number;
        }>(
            `
      select id, question, position
      from questions
      where quiz_id = $1
      order by position asc
      `,
            [quizRow.id]
        );

        const questions: Question[] = [];

        for (const questionRow of questionsResult.rows) {
            // Antworten laden
            const answersResult = await client.query<{
                answer: string;
                position: number;
                is_correct: boolean;
            }>(
                `
        select answer, position, is_correct
        from answers
        where question_id = $1
        order by position asc
        `,
                [questionRow.id]
            );

            const answers = answersResult.rows.map((a) => a.answer);

            const correctAnswer = answersResult.rows.findIndex(
                (a) => a.is_correct
            );

            questions.push({
                question: questionRow.question,
                answers,
                correctAnswer,
            });
        }

        const quiz: Quiz = {
            id: id,
            slug: quizRow.slug,
            title: quizRow.title,
            description: quizRow.description,
            category: quizRow.category,
            questions: questions,
        };

        return quiz;
    } finally {
        client.release();
    }
}