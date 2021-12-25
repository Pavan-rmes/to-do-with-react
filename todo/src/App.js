import logo from "./logo.svg";
import "./App.css";
import { Login } from "./login/Login";
import { Switch, Route, useHistory } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import {
  CalenderIcon,
  StarIcon,
  SunIcon,
  UserIcon,
  FlagIcon,
  HomeIcon,
} from "./icons/index";
import { Myday } from "./myday/Myday";

function App() {
  return (
    <div className="App" exact>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Sidenav>
          <AuthRoute path="/myday" exact>
            <Myday />
          </AuthRoute>
          <AuthRoute path="/important" exact>
            <Important />
          </AuthRoute>
        </Sidenav>
      </Switch>
    </div>
  );
}
function Important() {
  return <>Important</>;
}
function Sidenav(props) {
  return (
    <>
      <Todo />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <Sidenavigation />
        </div>
        <div className="col-span-10 w-auto">{props.children}</div>
      </div>
    </>
  );
}

function Todo() {
  return (
    <div className="text-xl bg-blue-500 mx-2">
      <p className="pl-4 py-2 text-white">To Do</p>
    </div>
  );
}
const sidebarValues = [
  { name: "My day", sym: <SunIcon />,link:"myday" },
  { name: "Important", sym: <StarIcon />,link:"important" },
  { name: "Planned", sym: <CalenderIcon />,link:"planned" },
  { name: "Assigned to me", sym: <UserIcon />,link:"assignedtome" },
  { name: "Flagged email", sym: <FlagIcon />,link:"flagged" },
  { name: "Tasks", sym: <HomeIcon />,link:"tasks" },
];

function Sidenavigation() {
  const history = useHistory()
  return (
    <div className="bg-gray-100 h-screen">
      {sidebarValues.map((value) => (
        <div onClick={()=>history.push("/"+value.link)}>
          <div className="pl-4 py-4 flex items-center cursor-pointer hover:bg-gray-200">
            {value.sym}
            <div className="pl-2">{value.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default App;
