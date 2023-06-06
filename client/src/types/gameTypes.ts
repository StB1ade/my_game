export type GameType = {
  game: Category[];
  score: number;
  continueGame: boolean;
};

export type Category = {
  title: string;
  id: number;
  questions: Questions[];
};

export type Questions = {
  id: number;
  questionId: number;
  question: string;
  right_answer: string;
  score: number;
  answered: boolean;
};
