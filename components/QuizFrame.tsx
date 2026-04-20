'use client'

import { useState } from 'react'
import type { Quiz } from '@/types/quiz'

type Props = {
  quiz: Quiz
}

export default function QuizFrame({ quiz }: Props) {
  const [index, setIndex] = useState(0)

  const q = quiz.questions[index]

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>

      <p>
        Frage {index + 1} / {quiz.questions.length}
      </p>

      <h2>{q.question}</h2>

      <ul>
        {q.answers.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      <button onClick={() => setIndex(index - 1)} disabled={index === 0}>
        Zurück
      </button>

      <button
        onClick={() => setIndex(index + 1)}
        disabled={index === quiz.questions.length - 1}
      >
        Weiter
      </button>
    </div>
  )
}