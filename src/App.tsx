import { FormEvent, useState } from "react";
import AddToDo from "./AddToDo";
import { v4 as uuidV4 } from "uuid";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodoList } from "./myapi";

export type Todos = {
  id: string;
  title?: string;
  status: "incomplete" | "completed";
};


function App() {

 const {isLoading, isError,error,data} = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });

  const handleChange = (todo: Todos): void => {
    const updatedTodo: Todos = {
      ...todo,
      status: todo.status === "incomplete" ? "completed" : "incomplete",
    };
    const updatedTodos = data.map((todoSingle:Todos): Todos => {
      if (todoSingle?.id === updatedTodo.id) {
        return updatedTodo;
      } else {
        return todoSingle;
      }
    });
    // setTodos(updatedTodos);
  };
  if (isLoading) {
    return <span>Loading...</span>;
  }
    if (isError) {
      return <span>Error: {error.message}</span>;
    }
    

  console.log(data);

  return (
    <div
      className="h-screen w-screen overflow-y-auto 
    "
    >
      {" "}
      <h4 className=" text-bold text-4xl underline mb-8 text-center ">Todos</h4>
      <div className="w-fit mx-auto">
        <section>
          <AddToDo />
        </section>
        <section className="w-96 mt-4">
          <h3 className="text-semibold text-2xl">Your List</h3>

          {data.map((todo: Todos) => {
            return (
              <div key={todo?.id} className="bg-slate-200 my-4 p-4 rounded-lg">
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
  );
}

export default App;
