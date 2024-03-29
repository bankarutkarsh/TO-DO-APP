import "./App.css";
import Orderlist from "./components/Orderlist";
import FactCheckIcon from '@mui/icons-material/FactCheck';

function App() {
  return (
    <div className="App">
      <>
        <div id="p1" className="mdl-progress mdl-js-progress" />
        <div className="kanban__title">
          <h1>
            <i className="material-icons"><FactCheckIcon /></i> To do list
          </h1>
        </div>
        <div className="dd">
          <Orderlist section={{name:"To Do",type: "To-do"}} />
          <Orderlist section={{name:"In Progress",type: "progress"}} />
          <Orderlist section={{name:"Done",type: "Done"}} />
          <Orderlist section={{name:"Gone",type: "Gone"}} />
        </div>
        
      </>
    </div>
  );
}

export default App;
