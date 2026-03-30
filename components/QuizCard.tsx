// components/QuizCard.tsx
import Link from 'next/link'

type QuizCardProps = {
  id: string
  title: string
  description: string
  category: string
  questionCount: number
}

export default function QuizCard({
  id,
  title,
  description,
  category,
  questionCount,
}: QuizCardProps) {
  return (
    <Link
      href={`/quiz/${id}`}
      className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {category}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>

      <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
        <span>{questionCount} Fragen</span>
        <span className="font-medium text-blue-600">Ansehen →</span>
      </div>
    </Link>
  )
}