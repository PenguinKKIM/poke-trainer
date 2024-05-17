import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/layout";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import RaidPage from "../pages/Raid";

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
    ],
  },
]);

export default Router;
