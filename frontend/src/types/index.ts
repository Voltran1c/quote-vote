export interface Quote {
  id: number;
  text: string;
  author: string;
  votesCount?: number;
}

export interface Vote {
  id: number;
  quoteId: number;
  userId: number;
}