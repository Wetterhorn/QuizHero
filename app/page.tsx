import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="text-5xl font-extrabold">Willkommen bei QuizHero</h1>

      <p className="mt-4 text-lg text-gray-600">
        Teste dein Wissen mit interaktiven Quiz.
      </p>

      <div className="mt-8">
        <Link
          href="/quiz"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Quiz auswählen
        </Link>
      </div>
    </main>
  )
}
