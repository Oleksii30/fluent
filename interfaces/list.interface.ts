export type WordInput = {
  id?: string,
  word: string,
  translations: Array<string>,
  associations: Array<string>
}

export interface IList {
  userId: string;
  createdAt: number;
  header: string;
  language: string;
  list: Array<WordInput>;
  isLearned: boolean;
}
