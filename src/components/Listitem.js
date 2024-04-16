import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputIcon from "@mui/icons-material/Input";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  setChange,
  setDone,
  setEdit,
  setForm,
  setGone,
  setProg,
  setSec,
} from "../redux/todo.slice";
import axios from "axios";

function Listitem({ but }) {
  const dispatch = useDispatch();
  const { form, change, sec, Gone, Done, prog } = useSelector(
    (state) => state.todo
  );
  const target =
    but === "To Do" ? "todo" : but === "In Progress" ? "progress" : but;
  useEffect(() => {
    async function fetchTasks() {
      const res = await axios.get(`https://todo-json-server-ivory.vercel.app/${target}`);
      const data = res.data;
      but === "To Do"
        ? dispatch(setSec(data))
        : but === "In Progress"
        ? dispatch(setProg(data))
        : but === "Done"
        ? dispatch(setDone(data))
        : dispatch(setGone(data));
      console.log("Rendering");
    }

    fetchTasks();
  }, [change]);

  const deleteItem = async (i) => {
    await axios.delete(`https://todo-json-server-ivory.vercel.app/${target}/${i.id}`);
    dispatch(setChange(1));
  };

  const move = async (i) => {
    let res = await axios.delete(`https://todo-json-server-ivory.vercel.app/${target}/${i.id}`);
    await axios.post("https://todo-json-server-ivory.vercel.app/progress", res.data);
    dispatch(setChange(1));
  };

  const gone = async (i) => {
    let res = await axios.delete(`https://todo-json-server-ivory.vercel.app/${target}/${i.id}`);
    await axios.post("https://todo-json-server-ivory.vercel.app/Gone", res.data);
    dispatch(setChange(1));
  };

  const done = async (i) => {
    let res = await axios.delete(`https://todo-json-server-ivory.vercel.app/${target}/${i.id}`);
    await axios.post("https://todo-json-server-ivory.vercel.app/Done", res.data);
    dispatch(setChange(1));
  };

  let arr;
  but === "To Do"
    ? (arr = sec)
    : but === "In Progress"
    ? (arr = prog)
    : but === "Done"
    ? (arr = Done)
    : (arr = Gone);

  return (
    <>
      {arr.map((i) => (
        <li key={i.id} className="dd-item" data-id={1}>
          <h3 className="title dd-handle">{i.task}</h3>
          <div className="text">{i.description}</div>
          {but !== "Done" && but !== "Gone" && (
            <div className="actions">
              <i
                onClick={() => {
                  dispatch(setForm(!form));
                  dispatch(setEdit(i));
                }}
                className="material-icons"
              >
                <EditIcon />
              </i>
              <i onClick={() => deleteItem(i)} className="material-icons">
                <DeleteIcon />
              </i>
              <i className="material-icons">
                {but === "To Do" ? (
                  <InputIcon onClick={() => move(i)} />
                ) : (
                  <CheckBoxIcon onClick={() => done(i)} />
                )}
              </i>
              <i className="material-icons">
                <CancelIcon onClick={() => gone(i)} />
              </i>
            </div>
          )}
        </li>
      ))}
    </>
  );
}

export default Listitem;
