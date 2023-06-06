export type GameType = {
  game: Category[]
}

export type Category = {
  title: string,
  id: number,
  questions: Questions[]
}

export type Questions = {
  id: number,
  question: string,
  right_answer: string,
  score: number,
  answered: boolean,
}