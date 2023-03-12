import { TodoModel, TodoArrayModel } from "models/todo-models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialTodoState: TodoArrayModel = {
  all_todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoState,
  reducers: {
    setAllTodos(state, action: PayloadAction<TodoModel[]>) {
      state.all_todos = action.payload;
    },

    addTodo(state, action: PayloadAction<TodoModel>) {
      state.all_todos.push(action.payload);
    },

    // Actualiza un todo existente (buscando el índice del todo en el array con findIndex y lo actualiza) en el estado de Redux con un todo actualizado.
    updateTodo(state, action: PayloadAction<TodoModel>) {
      const updatedTodo = action.payload;
      const todoIndex = state.all_todos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );
      if (todoIndex !== -1) {
        state.all_todos[todoIndex] = updatedTodo;
      }
    },

    // Utiliza el método findIndex para buscar el índice de la tarea con el ID especificado en la lista de tareas si se encuentra se usa el splice para eliminarlo del array de tareas
    // Si no se encuentra la tarea, findIndex devuelve -1
    deleteTodo(state, action: PayloadAction<number>) {
      const todoIndex = state.all_todos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (todoIndex !== -1) {
        state.all_todos.splice(todoIndex, 1);
      }
    },
  },
});

export default todoSlice;
