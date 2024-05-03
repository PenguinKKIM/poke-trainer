import { createBrowserRouter } from "react-router-dom";
import LoginInput from "../components/FormInput/LoginInput";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginInput />,
  },
]);

export default Router;
