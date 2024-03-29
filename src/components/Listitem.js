import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputIcon from "@mui/icons-material/Input";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { setEdit, setForm } from "../redux/todo.slice";
import axios from "axios";

function Listitem({ but }) {
  const dispatch = useDispatch();
  const { form, edit } = useSelector((state) => state.todo);
  const [sec, setSec] = useState([]);
  const target =
        but === "To Do"
          ? "todo"
          : but === "In Progress"
          ? "progress"
          : but;
  useEffect(() => {
    async function fetchTasks() {
      
      const res = await axios.get(`http://localhost:3004/${target}`);
      const data = res.data;
      setSec(data);
      console.log("Rendering")
    }

    fetchTasks();
  }, []);
  
  useEffect(()=>{
    console.log(edit);
  },[sec])

  const deleteItem = async (i) => {
    await axios.delete(`http://localhost:3004/${target}/${i.id}`)
  }

  const move = async (i) => {
    let res = await axios.delete(`http://localhost:3004/${target}/${i.id}`)
    await axios.post("http://localhost:3004/progress",res.data)
  }

  const gone = async (i) => {
    let res = await axios.delete(`http://localhost:3004/${target}/${i.id}`)
    await axios.post("http://localhost:3004/Gone",res.data)
  }

  const done = async (i) => {
    let res = await axios.delete(`http://localhost:3004/${target}/${i.id}`)
    await axios.post("http://localhost:3004/Done",res.data)
  }

  return (
    <>
      {sec.map((i) => (
        <li key={i.id} className="dd-item" data-id={1}>
          <h3 className="title dd-handle">{i.task}</h3>
          <div className="text">{i.description}</div>
          {but !== "Done" && but !== "Gone" && (
            <div className="actions">
              <i
                onClick={() => {dispatch(setForm(!form)); dispatch(setEdit(i))}}
                className="material-icons"
              >
                <EditIcon />
              </i>
              <i onClick={()=> deleteItem(i)} className="material-icons">
                <DeleteIcon />
              </i>
              <i className="material-icons">
                {but === "To Do" ? <InputIcon onClick={()=> move(i)} /> : <CheckBoxIcon onClick={()=> done(i)} />}
              </i>
              <i className="material-icons">
                <CancelIcon onClick={()=> gone(i)} />
              </i>
            </div>
          )}
        </li>
      ))}
    </>
  );
}

export default Listitem;
