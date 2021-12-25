import { useState } from "react";
import {PlusIcon} from "../icons/index"


export function Myday() {
  return(
    <div>
      <Title/>
      <Addtask />
    </div>
  );
}

function Title(){
  const d = new Date()
  const date = d.toDateString().split(" ")
  return(
    <div className="py-4 pl-6">
      <div className="text-xl font-medium" >
      My Day ...
    </div>
    <div className="pt-2 text-m">
      {date[0]}  ,{date[1]}  ,{date[2]}
    </div>
    </div>
  )
}
function Addtask(){
  const [addTask,setAddTask] = useState(false)
  return(
    <div class="pl-6 pt-4">  
    <div class={addTask?`bg-gray-100 h-20 p-2 rounded shadow-lg flex items-center`:`bg-gray-100 h-16 p-2 rounded shadow-lg flex items-center`}>
    <p className="text-gray-700 text-xl" >
      <PlusIcon />
    </p>
    <input onFocus={()=>setAddTask(true)} onBlur={()=>setAddTask(false)} class="bg-gray-100 appearance-none border-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:bg-white-100 focus:outline-none focus:shadow-outline" id="task" type="text" placeholder="Add task" />
    </div>
  </div>
  )
}
