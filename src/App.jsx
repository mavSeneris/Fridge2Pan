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

const route = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="fridge" element={<Fridge/>}/>
    <Route path="search-recipes" element={<Search/>}/>

  </Route>
))

function App() {
  return (
    <RouterProvider router={route}/>
  );
}

export default App;
