import { useState } from "react";
import { PlusIcon } from "../icons/index";

export function Myday() {
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
      <div className="text-xl font-medium">My Day ...</div>
      <div className="pt-2 text-m">
        {date[0]} ,{date[1]} ,{date[2]}
      </div>
    </div>
  );
}

const prevTasks = [
  { task: "Lab view to be completed" },
  { task: "Testing g/w" },
  { task: "Testing Cloud" },
];

function Addtask() {
  const [addTask, setAddTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(prevTasks);
  const [err, setErr] = useState("");
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
          <PlusIcon />
        </p>
        <input
          onFocus={() => setAddTask(true)}
          onBlur={() => setAddTask(false)}
          class="bg-gray-100 appearance-none border-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:bg-white-100 focus:outline-none focus:shadow-outline"
          id="task"
          type="text"
          placeholder="Add task"
          onChange={(event) => setNewTask(event.target.value)}
        />
      </div>
      <button
        onClick={() => {
          if (newTask.length > 5) {
            setTasks([...tasks, { task: newTask }]);
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
  return (
    <div className="mt-14">
      {props.tasks.map((task, index) => (
        <TasksComp task={task} index={index} />
      ))}
    </div>
  );
}

function TasksComp({ task, index }) {
  const [check, setCheck] = useState(false);
  return (
    <div className="flex mb-6 items-center">
      <CheckedBtn
        onChange={(event) => setCheck(event.target.checked)}
        name="task"
      />
      {check ? (
        <p className="text-xl">
          <strike>{task.task}</strike>
        </p>
      ) : (
        <p className="text-xl">{task.task}</p>
      )}
    </div>
  );
}

const completed = [];

function CheckedBtn(props) {
  return (
    <div class="form-check">
      <input
        class="form-check-input appearance-none rounded-full h-6 w-6 border border-gray-300 bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="checkbox"
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}
