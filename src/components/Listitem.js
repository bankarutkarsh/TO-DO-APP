import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputIcon from "@mui/icons-material/Input";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDone, setForm, setGone, setProg, settodo } from "../redux/todo.slice";

function Listitem({ but }) {
  let dispatch = useDispatch();
  let { todo,prog,Gone,Done, form } = useSelector((state) => state.todo);

  useEffect(() => {
    async function fetchTasks() {
      const target =
        but.value === "To Do"
          ? "todo"
          : but.value === "In Progress"
          ? "progress"
          : but.value;
      const res = await axios.get(`http://localhost:3004/${target}`);
      but.value === 'To Do' ? (dispatch(settodo(res.data))) :  but.value === 'In Progress' ? (dispatch(setProg(res.data))) : but.value === 'Gone' ? (dispatch(setGone(res.data))) : (dispatch(setDone(res.data)))
      console.log(todo,prog,Gone,Done)
    }

    fetchTasks();
  }, [dispatch]);



  //   const progress = async (i) => {
  //     await axios.post("http://localhost:3004/progress", i);
  //   };

  return (
    <div>

    </div>
  );
}

export default Listitem;
{/* <>
      {sec.map((i) => (
        <li key={i.id} className="dd-item" data-id={1}>
          <h3 className="title dd-handle">{i.task}</h3>
          <div className="text">{i.description}</div>
          {but.value !== "Done" && but.value !== "Gone" && (
            <div className="actions">
              <i
                onClick={() => dispatch(setForm(!form))}
                className="material-icons"
              >
                <EditIcon />
              </i>
              <i className="material-icons">
                <DeleteIcon />
              </i>
              <i className="material-icons">
                {but.value === "To Do" ? <InputIcon /> : <CheckBoxIcon />}
              </i>
              <i className="material-icons">
                <CancelIcon />
              </i>
            </div>
          )}
        </li>
      ))}
    </> */}