import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/layout";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import RaidPage from "../pages/Raid";
import Write from "../pages/Raid/Write";
import MyPagePage from "../pages/MyPage";
import EditProfile from "../components/Mypage/EditProfile";
import TrainerList from "../components/TrainerList/TrainerList";

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
      {
        path: "mypage",
        element: <MyPagePage />,
      },
      {
        path: "editprofile",
        element: <EditProfile />,
      },
      {
        path: "trainerlist",
        element: <TrainerList />,
      },
    ],
  },
]);

export default Router;
