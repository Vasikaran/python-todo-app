export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
  priority: "low" | "medium" | "high";
}
