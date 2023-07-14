import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./App.css";
import Fridge from "./pages/Fridge";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Meal from "./pages/Meal";
import Login, {action as loginAction} from "./pages/Login";
import Register, {action as registerAction} from "./pages/Register";

const route = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="fridge" element={<Fridge/>}/>
    <Route path="search-recipes" element={<Search/>}/>
    <Route path="meal" element={<Meal/>}/>
    <Route path="login" element={<Login/>} action={loginAction}/>
    <Route path="register" element={<Register/>} action={registerAction}/>
  </Route>
))

function App() {
  return (
    <RouterProvider router={route}/>
  );
}

export default App;
