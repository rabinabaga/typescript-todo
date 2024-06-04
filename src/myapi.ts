import { Todos } from "./App";
export const fetchTodoList = async()=>{
   const response = await fetch("http://localhost:3000/todos");
   return response.json();
}

export const postTodo = async(newTodo:Todos) =>{
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    return response;
}