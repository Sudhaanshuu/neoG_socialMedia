import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ path, element }) => {
  const currentUser = useSelector((state) => state.auth.login);

  return currentUser.token ? (
    <Route element={element} path={path} />
  ) : (
    <Navigate replace state={{ from: path }} to={"/login"} />
  );
};
