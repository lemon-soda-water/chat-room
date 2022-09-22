import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Login from "../pages/Login";

const routes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
];

export default routes;
