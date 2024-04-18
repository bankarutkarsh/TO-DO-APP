import axios from "axios";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChange, setEdit, setForm } from "../redux/todo.slice";

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
        await axios.post("https://todo-backend-umber.vercel.app/todo", newTask);
      } else {
        try {
          await axios.put(`https://todo-backend-umber.vercel.app/todo/${edit._id}`, newTask);
        } catch (error) {
          try {
            await axios.put(
              `https://todo-backend-umber.vercel.app/progress/${edit._id}`,
              newTask
            );
            dispatch(setChange(1));
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }

  return (
    <section className="pop-registration">
      <section className="user-registration">
        <form action="#">
          <h1>Add Task</h1>
          <div>
            <label htmlFor="taskName">Task Name</label>
            <input
              ref={task}
              type="text"
              id="taskName"
              placeholder="Enter name of Task"
              defaultValue={
                edit !== undefined && edit !== "" ? edit.task : undefined
              }
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              ref={description}
              type="text"
              id="description"
              placeholder="Enter task description"
              defaultValue={
                edit !== undefined && edit !== "" ? edit.description : undefined
              }
              required
            />
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                saveTask();
                dispatch(setChange(1));
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
