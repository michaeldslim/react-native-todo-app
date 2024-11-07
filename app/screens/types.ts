export interface Todo {
  id: string;
  todo: string;
  completed: boolean;
  createdAt: string;
  category?: string;
  userId?: string;
}
