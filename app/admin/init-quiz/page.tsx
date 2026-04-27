import { importQuiz } from "@/util/importQuiz";
import { getAllQuizzes } from "@/util/quizzes";

async function initQuiz() {
    "use server";
    const quizzes = await getAllQuizzes()
    await importQuiz(quizzes);
}

export default function InitQuizPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        
        <h1 className="text-2xl font-semibold text-gray-900">
          Quiz initialisieren
        </h1>

        <p className="text-gray-600">
          Diese Seite lädt das Europa-Quiz in die Datenbank.
        </p>

        <form action={initQuiz} className="pt-2">
          <button
            type="submit"
            className="
              w-full
              bg-blue-600 hover:bg-blue-700
              text-white font-medium
              py-2.5 px-4
              rounded-xl
              transition
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              active:scale-[0.99]
            "
          >
            Quiz in Datenbank laden
          </button>
        </form>

      </div>
    </main>
  );
}