import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/user/:id",
      element: <User />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
