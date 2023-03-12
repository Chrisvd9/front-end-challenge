import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TodoModel } from "models/todo-models";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { fetchAddTodo } from "store/todo-actions";
import { RootState } from "store/store";

const TodoForm = () => {
  const [newTodoLabel, setNewTodoLabel] = useState("");
  const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodoLabel) {
      const newTodo: TodoModel = {
        id: Math.floor(Math.random() * 10000), // Para generar un id local aleatorio
        label: newTodoLabel,
        checked: false,
      };

      dispatch(fetchAddTodo(newTodo));
      setNewTodoLabel("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoLabel(e.target.value);
  };

  const isDisabled = newTodoLabel === ""; // Para deshabilitar el botón y añadirle estilo con tailwind cuando el input esté vacío

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="text-center mt-4">
        <input
          className="w-2/3 rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
          type="text"
          value={newTodoLabel}
          onChange={handleInputChange}
          placeholder="Enter new to do"
        />
        <button
          className={`inline-block rounded-lg bg-blue-500 px-5 py-4 text-sm font-medium text-white ml-3 hover:bg-blue-700 dark:focus:ring-blue-600 ${
            isDisabled ? "cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isDisabled}
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
