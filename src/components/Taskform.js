import axios from "axios";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEdit, setForm } from "../redux/todo.slice";

function Taskform() {
  let dispatch = useDispatch();
  let { form, edit } = useSelector((state) => state.todo);
  let task = useRef(null);
  let description = useRef(null);

  async function saveTask() {
    let newTask = {
      task: task.current.value,
      description: description.current.value,
    };
    if (newTask.task === "" || newTask.description === "") {
      alert("Enter a valid task");
    } else {
      if (edit === undefined || edit === "") {
        await axios.post("http://localhost:3004/todo", newTask);
      } else {
        await axios.put(`http://localhost:3004/todo/${edit.id}`, newTask);
      }
    }
  }

  return (
    <section className="pop-registration">
      <section className="user-registration">
        <form action="#">
          <h1>Add Task</h1>
          <div>
            <label htmlFor="">Task Name</label>
            <input
              ref={task}
              type="text"
              id="taskName"
              placeholder="Enter name of Task"
              defaultValue={edit !== undefined ? edit.task : undefined}
              required
            />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <input
              ref={description}
              type="text"
              id="description"
              placeholder="Enter task description"
              defaultValue={edit !== undefined ? edit.description : undefined}
              required
            />
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                saveTask();
                dispatch(setForm(!form));
              }}
              type="button"
              id="save"
              className="btn btn-success"
            >
              Save
            </button>
            <button
              onClick={() => {
                dispatch(setForm(!form));
                dispatch(setEdit(""));
              }}
              type="button"
              className="cancel btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default Taskform;
