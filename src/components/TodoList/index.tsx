import { useEffect } from "react";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import {
  fetchAllTodos,
  fetchDeleteTodo,
  fetchUpdateTodo,
} from "store/todo-actions";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "store/store";
import TodoListItem from "components/TodoListItem";
import todoService from "services/todoService";

const TodoList = () => {
  const dispatch: ThunkDispatch<RootState, unknown, any> = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  const allTodos = useAppSelector((state) => state.reducer.all_todos);

  const handleDelete = (todoId: number) => {
    dispatch(fetchDeleteTodo(todoId));
  };

  const toggleCheck = (todoId: number, isChecked: boolean) => {
    const todo = allTodos.find((todo) => todo.id === todoId); //Encuentra el "todo" en el state
    const updatedTodo = Object.assign({}, todo, { checked: isChecked }); // Crea un nuevo objeto con los mismos valores que el "todo" encontrado, pero con el valor de "checked" cambiado

    dispatch(fetchUpdateTodo(updatedTodo));

    todoService.updateTodo(updatedTodo).then((response) => {
      dispatch(fetchUpdateTodo(response.data));
    });
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-list-content">
        {allTodos.length > 0 ? (
          allTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              onCheck={() => toggleCheck(todo.id, !todo.checked)}
              checked={todo.checked}
              onDelete={() => handleDelete(todo.id)}
              label={todo.label}
            />
          ))
        ) : (
          <div className="no-todos">
            Looks like you&apos;re absolutely free today!
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
