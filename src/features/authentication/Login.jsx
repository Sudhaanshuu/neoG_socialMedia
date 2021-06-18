import { useEffect, useState } from "react";
import { Password } from "./Password";
import { primaryBtn, secondaryBtn } from "../../utils/styles";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, startLoadingAuth } from "./authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingUser } from "../user/userSlice";

export const Login = () => {
  const [{ username, password }, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.login;

  useEffect(() => {
    if (currentUser.token) {
      navigate("/home");
    }
  }, [currentUser.token]);

  const dispatch = useDispatch();
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(startLoadingAuth());
    await dispatch(loginUser({ username, password }));
  };

  return (
    <div className="shadow-xl p-2 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-8/12 text-center">
      <h2 className="text-2xl font-medium m-3">
        Login to <span className="text-yellow-700">continue!</span>
      </h2>
      <form
        className="border border-blue-900 rounded-sm p-6 md:w-3/4 m-auto lg:w-8/12"
        onSubmit={loginHandler}
      >
        <div className="p-2">
          <span className="p-2 bg-blue-900 text-blue-50 rounded-sm">
            <i className="fas fa-at fa-lg"></i>
          </span>
          <input
            required
            className="p-2 rounded-sm border border-transparent  focus:outline-none focus:ring-2 focus:ring-blue-900 w-3/4"
            type="text"
            value={username}
            onChange={(e) =>
              setCredentials((credentials) => ({
                ...credentials,
                username: e.target.value,
              }))
            }
            placeholder="Username"
          />
        </div>
        <Password userValue={password} setCredentials={setCredentials} />
        <button type="submit" className={`${primaryBtn} mt-2`}>
          Login
        </button>
        {auth.error && (
          <p className="text-red-600 text-lg pt-3">{auth.error}</p>
        )}
      </form>

      <div className="p-2 md:w-3/4 lg:w-8/12 m-auto">
        <b className="text-lg">Not a member? </b>
        <Link to="/signup">
          <button className={`${secondaryBtn} mt-2`}>Sign up</button>
        </Link>
      </div>
    </div>
  );
};
