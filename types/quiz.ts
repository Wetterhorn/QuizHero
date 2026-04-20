export type Question = {
  id: string
  question: string
  answers: string[]
  correctAnswer: number
}

export type Quiz = {
  id: string
  slug: string
  title: string
  description: string
  category: string
  questions: Question[]
}