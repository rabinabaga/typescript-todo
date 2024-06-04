import { FormEvent, useState } from "react";
import {v4 as uuidV4} from "uuid";
type Todos = {
  id: string;
  title?: string;
  status: "incomplete" | "completed";
};
let todoList: Array<Todos> = [
  { id: "1", title: "a title", status: "incomplete" },
  { id: "2", title: "another title", status: "incomplete" },
];

function App() {
  const [todos, setTodos] = useState<Array<Todos>>(todoList);
  const [todoNew, setTodoNew] = useState<Todos>({status:"incomplete", id:uuidV4()});


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
  };

  const handleSubmission = (e:FormEvent)=>{
    e.preventDefault();
    setTodos([...todos,todoNew])
    setTodoNew({title:"", id:uuidV4(),status:"incomplete"})
  }
  console.log(todos);

  return (
    <div
      className="h-screen w-screen overflow-y-auto flex flex-col items-center justify-center
    "
    >
      <section>
        <div className="flex justify-center">
          <h4 className="fixed top-10 text-bold text-4xl underline mb-4 text-center">
            Todos
          </h4>
        </div>{" "}
        <h3 className="text-semibold text-2xl">Add new Todo</h3>
        <form onSubmit={handleSubmission}>
          <input
            className="border border-slate-200 border-2 shadow-md mr-3 p-3"
            type="text"
            value={todoNew?.title}
            onChange={(e) => setTodoNew({ ...todoNew, title: e.target.value })}
          />
          <button
            className="border-slate-200  bg-slate-200 p-3 rounded-md shadow-md"
            type="submit"
          >
            Add
          </button>
        </form>
      </section>
      <section className="w-96 mt-4">
        <h3 className="text-semibold text-2xl">Your List</h3>

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
