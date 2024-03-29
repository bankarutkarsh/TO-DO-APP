import axios from "axios";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../redux/todo.slice";

function Taskform() {
  let dispatch = useDispatch();
  let { form } = useSelector((state) => state.todo);
  let task = useRef(null);
  let description = useRef(null);

  function saveTask() {
    let newTask = {
      task: task.current.value,
      description: description.current.value,
    };
    if (newTask.task === "" || newTask.description === "") {
      alert("Enter a valid task");
    } else {
      axios.post("http://localhost:3004/todo", newTask);
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
              required
            />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <input
              ref={description}
              type="text"
              id="description"
              placeholder="Enter Your Description"
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
              onClick={() => dispatch(setForm(!form))}
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
