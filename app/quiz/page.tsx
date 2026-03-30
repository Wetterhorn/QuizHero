// app/page.tsx
import QuizCard from '@/components/QuizCard'
import { getQuizSummaries } from '@/util/quizzes'

export default async function HomePage() {
  const quizzes = await getQuizSummaries();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-center text-4xl font-extrabold">Quizze</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            description={quiz.description}
            category={quiz.category}
            questionCount={quiz.questionCount}
          />
        ))}
      </div>
    </main>
  )
}