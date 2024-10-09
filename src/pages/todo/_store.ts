import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import type {Todo} from "@/models/todo";

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
}

export const useTodoStore = create(
  persist<TodoStore>(
    (set) => ({
      todos: [],
      addTodo: (todo) => {
        set((state) => {
          const newTodos = [...state.todos, todo];
          return {todos: newTodos};
        });
      },
      removeTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        }));
      },
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
          )
        }));
      },
      editTodo: (id, text) => {
        set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id ? {...todo, text} : todo
          )
        }));
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

