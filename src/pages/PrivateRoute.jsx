import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  let auth = localStorage.getItem("name");

  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
