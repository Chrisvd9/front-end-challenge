import todoSlice from "./todo-slice";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";
import { TodoModel } from "models/todo-models";
import todoService from "services/todoService";

export const todoActions = todoSlice.actions;

export const fetchAllTodos = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    if (getState().reducer.all_todos.length === 0) { // Aquí se valida que el array de "todos" esté vacío
      const response: TodoModel[] = await todoService.getAllTodos();
      dispatch(todoActions.setAllTodos(response));
    }
  };
};

export const fetchAddTodo = (
  newTodo: TodoModel
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response: TodoModel = await todoService.addTodo(newTodo);
    dispatch(todoActions.addTodo(response));
  };
};

export const fetchUpdateTodo = (
  updatedTodo: TodoModel
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    if (updatedTodo && updatedTodo.id !== undefined) { // Aquí se valida que el objeto tenga la propiedad 'id'
      const response: TodoModel = await todoService.updateTodo(updatedTodo);
      dispatch(todoActions.updateTodo(response));
    } else {
      console.warn("El objeto updatedTodo no tiene la propiedad 'id'"); // Aquí se muestra un mensaje de advertencia
    }
  };
};

export const fetchDeleteTodo = (
  todo_id: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    await todoService.deleteTodo(todo_id);
    dispatch(todoActions.deleteTodo(todo_id));
  };
};
