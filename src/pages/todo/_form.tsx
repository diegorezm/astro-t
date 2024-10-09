import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useState, type FormEvent} from "react";
import {useTodoStore} from "./_store";
import {toast} from "sonner";

export default function TodoForm() {
  const [text, setText] = useState('');
  const {addTodo, todos} = useTodoStore()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Please enter a todo item.");
      return;
    }
    const newTodo = {id: Date.now(), title: text, completed: false};

    try {
      addTodo(newTodo);
      setText('');
      toast.success("Todo added successfully!");
      console.log(todos)
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast.error("There was an error adding your todo. Please try again.");
    }
  };

  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader>
        <CardTitle>Add Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Label>Title</Label>
          <Input
            type="text"
            name="text"
            placeholder="Todo..."
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

