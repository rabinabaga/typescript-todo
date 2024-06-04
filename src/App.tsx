import { FormEvent, useState } from "react";
import AddToDo from "./AddToDo";
import { v4 as uuidV4 } from "uuid";
import { useGetTodos } from "./todoContext";

export type Todos = {
  id: string;
  title?: string;
  status: "incomplete" | "completed";
};


function App() {
  const {todos, setTodos} = useGetTodos();
  const [todoNew, setTodoNew] = useState<Todos>({
    status: "incomplete",
    id: uuidV4(),
  });

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

  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();
    setTodos([...todos, todoNew]);
    setTodoNew({ title: "", id: uuidV4(), status: "incomplete" });
  };
  console.log(todos);

  return (
    <>
      <h4 className="mt-10 text-bold text-4xl underline mb-4 text-center ">
        Todos
      </h4>
      <div
        className="h-screen w-screen overflow-y-auto  
    "
      >
        <div className="w-fit mx-auto p-4">
          <section className="">
            <AddToDo
              handleSubmission={handleSubmission}
              setTodoNew={setTodoNew}
              todoNew={todoNew}
            />
          </section>
          <section className="w-96 mt-4">
            <h3 className="text-semibold text-2xl">Your List</h3>

            {todos.map((todo: Todos) => {
              return (
                <div
                  key={todo?.id}
                  className="bg-slate-200 my-4 p-4 rounded-lg"
                >
                  <input
                    className="mr-3 w-5 h-5"
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
      </div>
    </>
  );
}

export default App;
