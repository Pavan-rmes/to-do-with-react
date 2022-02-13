import { useEffect, useState } from "react";
import { PlusIcon } from "../icons/index";
import axios from "axios";
import { Mydblocation,inComTasks } from "../util";
import { StarIcon } from "../icons/index";
import { API } from "../util";

export function Tasks() {
  return (
    <div className="h-screen overflow-auto">
      <Title />
      <Addtask />
    </div>
  );
}

function Title() {
  const d = new Date();
  const date = d.toDateString().split(" ");
  return (
    <div className="py-4 pl-6">
      <div className="text-xl font-medium">Tasks ...</div>
    </div>
  );
}


function Addtask() {
  const [addTask, setAddTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    axios.get(`${API}/tasks`)
    .then((res) => setTasks(res.data));
  }, []);

  return (
    <div class="pl-6 pt-4">
      <div
        class={
          addTask
            ? `bg-gray-100 h-20 p-2 rounded shadow-lg flex items-center`
            : `bg-gray-100 h-16 p-2 rounded shadow-lg flex items-center`
        }
      >
        <p className="text-gray-700 text-xl">
          <PlusIcon onClick={() => setAddTask(true)} />
        </p>
        <input
          autoFocus={addTask}
          onFocus={() => setAddTask(true)}
          onBlur={() => setAddTask(false)}
          class="bg-gray-100 appearance-none border-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:bg-white-100 focus:outline-none focus:shadow-outline"
          id="task"
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
      </div>
      <button
        onClick={() => {
          if (newTask.length > 5) {
            axios.post(`${API}/tasks`,{
              task:newTask,
              imp:false})
            setNewTask("");
            setErr("")
          }
          if (newTask.length < 5) {
            setErr("Must contain min of 5 char");
          }
        }}
        style={
          addTask || newTask.length > 0
            ? { display: "block" }
            : { display: "none" }
        }
        class="bg-blue-500 float-right hover:bg-blue-600 text-white font-bold mt-4 mr-4 py-2 px-4 rounded"
      >
        Add
      </button>
      <p className="ml-10 mt-4 text-red-500">{err}</p>

      <AllTasks tasks={tasks} />
    </div>
  );
}

function AllTasks(props) {
  // const mytasks = props.tasks.filter((task)=>!task.imp)
  return (
    <div className="mt-14">
      {props.tasks.map((task, index) =><TasksComp task={task} index={index} />)}
    </div>
  );
}

function TasksComp({ task,index }) {
  const [check, setCheck] = useState(false);
  const [impDialog,setImpDialog]= useState(false);
  const [startColor,setStartColor]= useState(task.imp)
  return (
    <>
      <div className="flex mb-3 mt-3 items-center">
        <CheckedBtn
          onChange={(event) => setCheck(event.target.checked)}
          name="task"
        />
        {check ? (
          <p className="">
            <strike>{task.task}</strike>
          </p>
        ) : (
          <p className="">{task.task}</p>
        )}
        <div 
        onMouseLeave={()=>setImpDialog((impDialog)=>!impDialog)} 
        onMouseEnter={()=>setImpDialog((impDialog)=>!impDialog)} 
        className="ralative ml-auto mr-10 cursor-pointer">
          <dialog 
          style={{position:"absolute",marginTop:"-30px",padding:"2px"}} 
          className="mr-3 bg-gray-100" 
          open={impDialog}>{task.imp?"Remove importance":"make task as important"}</dialog>
          <StarIcon onClick={()=>setStartColor((startColor)=>!startColor)} fill={startColor?"gold":"none"} color={startColor?"gold":"none"} />
        </div>
      </div>
      <hr></hr>
    </>
  );
}


function CheckedBtn(props) {
  return (
    <div class="form-check">
      <input
        class="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="checkbox"
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}
