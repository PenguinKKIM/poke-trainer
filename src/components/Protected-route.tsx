import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

function ProtectedRoute({ children }: { children: React.ReactNode }) {

  const currentUser = auth.currentUser;
  if (currentUser === null) {
    return <Navigate to="login" />
  }
  return children;
}

export default ProtectedRoute;