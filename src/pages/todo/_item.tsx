import type {Todo} from "@/models/todo";
import {useTodoStore} from "./_store";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {toast} from "sonner";

export const TodoItem = ({todo}: {todo: Todo}) => {

  const {removeTodo, toggleTodo} = useTodoStore();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleRemove = () => {
    removeTodo(todo.id);
    toast.success("Todo removed successfully!");
  };

  return (
    <li className="relative flex justify-between items-center group border rounded-md px-2 py-4">
      <span className={`${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
      <div
        className="absolute right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button onClick={handleToggle}>
          {todo.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button variant="destructive" onClick={handleRemove}>
          <Trash2 className="size-4" />
        </Button>
      </div>
    </li>
  );

}
