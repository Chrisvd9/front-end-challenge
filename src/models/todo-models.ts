export interface TodoModel {
  id: number;
  label: string;
  checked: boolean;
}

export interface TodoArrayModel {
  all_todos: TodoModel[];
}
