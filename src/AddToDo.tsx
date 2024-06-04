import { FormEvent, useState } from "react";
import { Todos } from "./App";
import { JSX } from "react";
import { v4 as uuidV4 } from "uuid";
import { ChangeEvent } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postTodo } from "./myapi";



function AddToDo(): JSX.Element {
  const [newTodo, setNewTodo] = useState<string>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleSubmission = ()=>{
    mutation.mutate({id:uuidV4(), title:newTodo,status:"incomplete"})
  }
const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
  setNewTodo(e.currentTarget.value)
}
  return (
    <>
      <h3 className="text-semibold text-2xl">Add new Todo</h3>
      <form onSubmit={handleSubmission}>
        <input
          className="border border-slate-200 border-2 shadow-md mr-3 p-3"
          type="text"
          value={newTodo}
          onChange={handleChange}
        />
        <button
          className="border-slate-200  bg-slate-200 p-3 rounded-md shadow-md"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default AddToDo;
