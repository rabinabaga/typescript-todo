import { FormEvent } from "react";
import { Todos } from "./App";
import { JSX } from "react";
interface AddTodoProps {
  handleSubmission: (e: FormEvent) => void;
  setTodoNew: (todo: Todos) => void;
  todoNew: Todos;
}

function AddToDo(addTodoProps: AddTodoProps): JSX.Element {
  return (
    <>
      <h3 className="text-semibold text-2xl">Add new Todo</h3>
      <form onSubmit={addTodoProps.handleSubmission}>
        <input
          className="border border-slate-200 border-2 shadow-md mr-3 p-3"
          type="text"
          value={addTodoProps.todoNew?.title}
          onChange={(e) =>
            addTodoProps.setTodoNew({
              ...addTodoProps.todoNew,
              title: e.target.value,
            })
          }
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
