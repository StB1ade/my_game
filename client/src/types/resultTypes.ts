export type StateType = {
    userGames: ResultType[],
    allGames: ResultType[]
  }

  export type ResultType = {
    id: number;
    total_score: number,
    user_id: number,
    finished: boolean
    createdAt?: string
    User?: string
  }