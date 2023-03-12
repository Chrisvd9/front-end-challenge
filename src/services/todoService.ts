import api from "./api";
import { TodoModel } from "models/todo-models";
import { toast } from "react-toastify";

export default {
  async getAllTodos() {
    try {
      const response = await api().get("todos");
      return response.data;
    } catch (error) {
      toast.error("No se pudo cargar la lista de tareas.");
      throw error;
    }
  },

  async addTodo(newTodo: TodoModel) {
    try {
      const response = await api().post("todos", newTodo);
      return response.data;
    } catch (error) {
      toast.error("No se pudo agregar la tarea.");
      throw error;
    }
  },

  async updateTodo(updatedTodo: TodoModel) {
    try {
      const response = await api().patch(
        `todos/${updatedTodo.id}`,
        updatedTodo
      );
      console.log(updatedTodo.id);
      return response.data
    } catch (error) {
      toast.error("No se pudo actualizar la tarea.");
      throw error;
    }
  },

  async deleteTodo(todo_id: number) {
    try {
      const response = await api().delete(`todos/${todo_id}`);
      return response.data;
    } catch (error) {
      toast.error("No se pudo eliminar la tarea.");
      throw error;
    }
  },
};
