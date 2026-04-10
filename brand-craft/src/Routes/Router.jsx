import { createBrowserRouter } from "react-router-dom";
import User from "../Pages/User";
import Login from "../Pages/Login";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/register",
    element: <User />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
]);

export default router;