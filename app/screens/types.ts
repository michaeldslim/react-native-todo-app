export interface Todo {
  id: string;
  todo: string;
  completed: boolean;
  createdAt: Date;
  category?: string;
}
