import React, { useEffect } from "react";
import Listitem from "./Listitem";
import BuildIcon from "@mui/icons-material/Build";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import "../styles/orderList.css";
import Taskform from "./Taskform";
import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../redux/todo.slice";

function Orderlist({ section }) {
  let dispatch = useDispatch();
  let { form, sec } = useSelector((state) => state.todo);

  useEffect(() => {
    console.log("section changed");
  }, [sec]);

  return (
    <>
      <ol className={"kanban " + section.type}>
        <div className="kanban__title">
          <h2>
            <i className="material-icons">
              {section.name === "To Do" ? (
                <AddTaskIcon />
              ) : section.name === "In Progress" ? (
                <BuildIcon />
              ) : section.name === "Done" ? (
                <CheckCircleIcon />
              ) : (
                <AssignmentLateIcon />
              )}
            </i>
            {" " + section.name}
          </h2>
        </div>
        <Listitem but={section.name} />
        {section.name === "To Do" && (
          <div className="actions">
            <button
              className="addbutt"
              onClick={() => dispatch(setForm(!form))}
            >
              Add new{" "}
              <i className="material-icons">
                <ControlPointIcon />
              </i>
            </button>
          </div>
        )}
      </ol>
      {form && <Taskform />}
    </>
  );
}

export default Orderlist;
