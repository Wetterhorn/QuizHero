import { notFound } from 'next/navigation'
import { getQuizById } from '@/util/quizzes'

type QuizPageProps = { 
    params: Promise<{id: string}>
}

export default async function QuizPage({ params }: QuizPageProps) {
  const {id} = await params;
  const quiz = await getQuizById(id);

  if (!quiz) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900">
            {quiz.title}
      </h1>
      {quiz.questions.map((quest, index) =>(<div key={index}>{quest.question}</div>))}
    </main>
  )
}