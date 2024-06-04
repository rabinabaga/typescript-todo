import { createContext, useContext, useState } from "react";
import { Todos } from "./App";
import { JSX, ReactNode , ReactElement} from "react";

interface ContextShape{
    todos:Array<Todos>,
    setTodos:(todos:Todos[])=>void
}
interface ContextProps{
    children:ReactElement
}

export const TodosContext = createContext<ContextShape | null>(null);
let todoList: Array<Todos> = [
  { id: "1", title: "a title", status: "incomplete" },
  { id: "2", title: "another title", status: "incomplete" },
];

const TodoProvider = (contextProps: ContextProps) =>{
    const [todos, setTodos] = useState<Array<Todos>>(todoList);
    return <TodosContext.Provider value={{todos,setTodos}}>{contextProps.children}</TodosContext.Provider>
}

export const useGetTodos = () => {
  const object = useContext(TodosContext);
  if (!object) {
    throw new Error("useGetComplexObject must be used within a Provider");
  }
  return object;
};

export default TodoProvider;