import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import SetAvatar from "../pages/SetAvatar";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/set-avatar",
    element: <SetAvatar />,
  },
];

export default routes;
