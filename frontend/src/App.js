import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Advertisement from "./pages/Advertisement"
import User from "./pages/User"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
  {
    path: "/advertisement/:id",
    element: <Advertisement/>,
  },
  {
    path: "/user/:id",
    element: <User/>,
  },
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
