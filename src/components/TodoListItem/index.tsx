import React from "react";
import "./styles.css";

interface TodoListItemProps {
  onCheck: () => void;
  checked: boolean;
  onDelete: () => void;
  label: string;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  onCheck,
  checked,
  onDelete,
  label,
}) => (
  <div className="todo-list-item">
    <div
      tabIndex={0} // para utilizar el tab
      role="checkbox"
      aria-checked={checked}
      className="todo-list-item-content"
    >
      <input
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover: cursor-pointer"
        tabIndex={-1} // para que no se pueda seleccionar con el tab
        type="checkbox"
        checked={checked}
        onChange={onCheck}
      />
      <span className={checked ? "todo-list-item-checked" : ""}>{label}</span>
    </div>
    <button
      type="button"
      className="todo-list-item-delete text-red-500"
      onClick={onDelete}
    >
      <i className="fas fa-trash"></i>
    </button>
  </div>
);

export default TodoListItem;
