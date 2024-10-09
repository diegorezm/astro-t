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
        <ul>
          {todos.map((todo, i) => (
            <TodoItem key={i} todo={todo} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
