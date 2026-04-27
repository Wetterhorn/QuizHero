import { readdir, readFile } from 'fs/promises'
import path from 'path'
const dataDir = path.join(process.cwd(), 'data')

export type QuizQuestion = {
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
  questions: QuizQuestion[]
}

export type QuizSummary = {
  id: string
  title: string
  description: string
  category: string
  questionCount: number
}

/**
 * Liefert alle Quiz vollständig.
 */
export async function getAllQuizzes(): Promise<Quiz[]> {
  const files = await readdir(dataDir);

  const quizzes = await Promise.all(
    files.map(async (file) => {
        console.log(file);
      const filePath = path.join(dataDir, file);
      const content = await readFile(filePath, 'utf-8');
      return JSON.parse(content);
    })
  );
  return quizzes;
}

/**
 * Liefert ein Quiz anhand seiner ID.
 * Gibt null zurück, wenn kein passendes Quiz gefunden wurde.
 */
export async function getQuizById(id: string): Promise<Quiz | null> {
  const filePath = path.join(dataDir, `${id}.json`)

  try {
    const file = await readFile(filePath, 'utf-8')
    const quiz: Quiz = JSON.parse(file);
    return quiz;
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === 'ENOENT') {
      // Datei existiert nicht → Quiz nicht gefunden
      return null;
    }
    // anderer Fehler → weiterwerfen
    throw err;
  }
}

/**
 * Liefert nur die wichtigsten Infos für Listenansichten.
 */
export async function getQuizSummaries(): Promise<QuizSummary[]> {
  const quizzes = await getAllQuizzes()

  return quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    category: quiz.category,
    questionCount: quiz.questions.length
  }))
}

/**
 * Prüft, ob ein Quiz mit der gegebenen ID existiert.
 */
export async function quizExists(id: string): Promise<boolean> {
  throw new Error('Not implemented')
}

/**
 * Liefert nur die Fragen eines Quiz.
 */
export async function getQuestionsByQuizId(id: string): Promise<QuizQuestion[] | null> {
  throw new Error('Not implemented')
}

/**
 * Liefert die Anzahl Fragen zu einem Quiz.
 */
export async function getQuestionCountByQuizId(id: string): Promise<number | null> {
  throw new Error('Not implemented')
}