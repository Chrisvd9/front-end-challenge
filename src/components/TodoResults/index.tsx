import "./styles.css";
import { useAppSelector } from "hooks/redux-hooks";

const TodoResults = () => {
  const allTodos = useAppSelector((state) => state.reducer.all_todos);
  const completedTodos = allTodos.filter((todo) => todo.checked);

  return <div className="todo-results">Done: {completedTodos.length}</div>;
};

export default TodoResults;
