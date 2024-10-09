import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useTodoStore} from "./_store";
import {TodoItem} from "./_item";

export default function TodoList() {
  const {todos} = useTodoStore()
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader>
        <CardTitle className="text-2xl">Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        {todos.length === 0 && <p className="mb-2 text-md">No todos found</p>}
        <p className="mb-2 text-sm">Total: {todos.length}</p>
        <ul className="space-y-4">
          {todos.map((todo, i) => (
            <TodoItem key={i} todo={todo} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
