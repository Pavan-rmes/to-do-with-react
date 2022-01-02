import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"

export function Login() {
  const history = useHistory()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [errorMessg,setErrorMessg] = useState("")

  console.log(email,password)
  function loginButton(){
    // axios.post("https://pavan-todo-sever.herokuapp.com/login",{
    //     "email":email,
    //     "password":password
    // },{withCredentials:true})
    // .then((loginResponse)=>{
    //   console.log(loginResponse)
    //   if(loginResponse.status === "success"){
    //     localStorage.setItem("email",email)
    //     history.push("/myday")
    //   }
    //   else{
    //     setErrorMessg("Invalid Credentials")
    //   }
    // })
    if(email ==="guvi@gmail.com" && password === "guvi"){
      localStorage.setItem("email",email)
      history.push("/myday")
    }
    else{
      setErrorMessg("Invalid Credentials")
    }
    
  }

  if(localStorage.getItem("email")){
    history.push("/myday")
  }
  return (
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input onInput={(event)=>{setEmail(event.target.value)}} class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="email" placeholder="Username" />
    </div>
    <div class="mb-6">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input onInput={(event)=>{setPassword(event.target.value)}} class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
      <p class="text-red text-xs italic">Please choose a password.</p>
      <p style={{color:"red"}} >{errorMessg}</p>
    </div>
    
    <div class="flex items-center justify-between">
      <button onClick={()=>loginButton()} class="bg-blue-500 hover:bg-blue-dark-400 text-white font-bold py-2 px-4 rounded" type="button">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
        Forgot Password?
      </a>
    </div>
</div>
  );
}
