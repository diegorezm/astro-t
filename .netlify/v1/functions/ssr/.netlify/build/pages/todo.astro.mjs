import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_ChqK_OFe.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, B as Button, $ as $$Layout } from '../chunks/card_7PJwbnJ5.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { L as Label, I as Input } from '../chunks/label_D-csBqcf.mjs';
import { useState } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) => {
        set((state) => {
          const newTodos = [...state.todos, todo];
          return { todos: newTodos };
        });
      },
      removeTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }));
      },
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map(
            (todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }));
      },
      editTodo: (id, text) => {
        set((state) => ({
          todos: state.todos.map(
            (todo) => todo.id === id ? { ...todo, text } : todo
          )
        }));
      }
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

function TodoForm() {
  const [text, setText] = useState("");
  const { addTodo, todos } = useTodoStore();
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Please enter a todo item.");
      return;
    }
    const newTodo = { id: Date.now(), title: text, completed: false };
    try {
      addTodo(newTodo);
      setText("");
      toast.success("Todo added successfully!");
      console.log(todos);
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast.error("There was an error adding your todo. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxs(Card, { className: "w-full lg:w-1/2", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Add Todo" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit, children: [
      /* @__PURE__ */ jsx(Label, { children: "Title" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "text",
          name: "text",
          placeholder: "Todo...",
          required: true,
          value: text,
          onChange: (e) => setText(e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(Button, { type: "submit", children: "Submit" })
    ] }) })
  ] });
}

const TodoItem = ({ todo }) => {
  const { removeTodo, toggleTodo } = useTodoStore();
  const handleToggle = () => {
    toggleTodo(todo.id);
  };
  const handleRemove = () => {
    removeTodo(todo.id);
  };
  return /* @__PURE__ */ jsxs("li", { className: "relative flex justify-between items-center py-2 group", children: [
    /* @__PURE__ */ jsx("span", { className: `${todo.completed ? "line-through" : ""}`, children: todo.title }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "absolute right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
        children: [
          /* @__PURE__ */ jsx(Button, { onClick: handleToggle, children: todo.completed ? "Undo" : "Complete" }),
          /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: handleRemove, children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" }) })
        ]
      }
    )
  ] });
};

function TodoList() {
  const { todos } = useTodoStore();
  return /* @__PURE__ */ jsxs(Card, { className: "w-full lg:w-1/2", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: "Todo List" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("ul", { children: todos.map((todo, i) => /* @__PURE__ */ jsx(TodoItem, { todo }, i)) }) })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Todo App" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex flex-col items-center justfy-center w-full gap-2"> <h1 class="text-3xl font-bold">Todo</h1> ${renderComponent($$result2, "TodoForm", TodoForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/diego/docs/code/tests/astro-t/src/pages/todo/_form.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "TodoList", TodoList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/diego/docs/code/tests/astro-t/src/pages/todo/_list.tsx", "client:component-export": "default" })} </section> ` })}`;
}, "/home/diego/docs/code/tests/astro-t/src/pages/todo/index.astro", void 0);

const $$file = "/home/diego/docs/code/tests/astro-t/src/pages/todo/index.astro";
const $$url = "/todo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
