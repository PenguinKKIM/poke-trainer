import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/layout";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import RaidPage from "../pages/Raid";
import Write from "../pages/Raid/Write";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "raid",
        element: <RaidPage />,
      },
      {
        path: "raid/write",
        element: <Write />,
      },
    ],
  },
]);

export default Router;
