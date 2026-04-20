import { notFound } from 'next/navigation'
import { getQuizById } from '@/util/quizzes'
import QuizFrame from '@/components/QuizFrame'

type QuizPageProps = { 
    params: Promise<{id: string}>
}

export default async function QuizPage({ params }: QuizPageProps) {
  const {id} = await params;
  const quiz = await getQuizById(id);

  if (!quiz) {
    notFound();
  }

  return <QuizFrame quiz={quiz} />
}