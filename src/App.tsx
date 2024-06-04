import { useState } from "react";

type Todos = {
  id: string;
  title: string;
  status: "incomplete" | "completed";
};
let todoList: Array<Todos> = [
  { id: "1", title: "a title", status: "incomplete" },
  { id: "2", title: "another title", status: "incomplete" },
];

function App() {
  const [todos, setTodos] = useState<Array<Todos>>(todoList);
  const [forceUpdate, setForceUpdate] = useState(false);
  const handleChange = (todo: Todos): void => {
    const updatedTodo: Todos = {
      ...todo,
      status: todo.status === "incomplete" ? "completed" : "incomplete",
    };
    const updatedTodos = todos.map((todoSingle): Todos => {
      if (todoSingle?.id === updatedTodo.id) {
        return updatedTodo;
      } else {
        return todoSingle;
      }
    });
    setTodos(updatedTodos);
    setForceUpdate((prevState) => !prevState);
  };
  console.log(todos);

  return (
    <div
      className="h-screen w-screen overflow-y-auto flex items-center justify-center
    "
    >
      <section className="w-96">
        <h4 className="text-bold text-4xl">Todos</h4>
        {todos.map((todo: Todos) => {
          return (
            <div key={todo?.id} className="bg-slate-200 my-4 p-4 rounded-lg">
              <input
              className="mr-3"
                type="checkbox"
                onChange={() => handleChange(todo)}
                checked={todo?.status === "completed" ? true : false}
              />
              <h3 className="inline">{todo?.title}</h3>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
