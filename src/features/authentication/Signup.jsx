import { useState } from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { primaryBtn, secondaryBtn } from "../../utils/styles";
import {
  clearSignupFlag,
  registerUser,
  startLoadingAuth,
} from "./authenticationSlice";
import { Password } from "./Password";

export const Signup = () => {
  const [{ username, password, email, name, error }, setCredentials] = useState(
    {
      name: "",
      email: "",
      username: "",
      password: "",
      error: "",
    }
  );

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const signupHandler = async (e) => {
    e.preventDefault();
    if (!isPasswordValid()) {
      setCredentials((data) => ({
        ...data,
        error:
          "Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters.",
      }));
    } else {
      dispatch(startLoadingAuth());
      await dispatch(registerUser({ username, password, email, name }));
      setCredentials((data) => ({
        name: "",
        email: "",
        username: "",
        password: "",
        error: "",
      }));
    }
  };

  const isPasswordValid = () => {
    if (
      password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) ==
      null
    )
      return false;
    else return true;
  };
  return auth.signup ? (
    <Registered />
  ) : (
    <div className="shadow-xl pb-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-8/12 text-center">
      <h2 className="text-2xl font-medium m-3">
        Sign <span className="text-yellow-700">up</span>
      </h2>
      <form
        className="border border-blue-900 rounded-sm p-6 md:w-3/4 m-auto lg:w-8/12"
        onSubmit={signupHandler}
      >
        <div className="p-2">
          <input
            required
            className="p-2 rounded-sm border border-transparent  focus:outline-none focus:ring-2 focus:ring-blue-900 w-3/4"
            type="text"
            value={name}
            onChange={(e) =>
              setCredentials((credentials) => ({
                ...credentials,
                name: e.target.value,
              }))
            }
            placeholder="Name"
          />
          <span className="p-2 bg-blue-900 text-blue-50 rounded-sm">
            <i className="fas fa-address-card fa-lg"></i>
          </span>
        </div>
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
        <div className="p-2">
          <span className="p-2 bg-blue-900 text-blue-50 rounded-sm">
            <i className="fas fa-envelope fa-lg"></i>
          </span>
          <input
            required
            className="p-2 rounded-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-900 w-3/4"
            type="email"
            value={email}
            onChange={(e) =>
              setCredentials((credentials) => ({
                ...credentials,
                email: e.target.value,
              }))
            }
            placeholder="Email address"
          />
        </div>
        <Password userValue={password} setCredentials={setCredentials} />
        {error && <p className="text-red-600 pt-3">{error}</p>}
        <button type="submit" className={`${primaryBtn} mt-2`}>
          Register
        </button>
        {auth.error && (
          <p className="text-red-600 text-lg pt-3">{auth.error}</p>
        )}
      </form>
      <div className="text-lg font-semibold p-2 md:w-3/4 lg:w-8/12 m-auto">
        Already a member?{" "}
        <Link to="/login">
          <button className={`${secondaryBtn} mt-2`}>Login</button>
        </Link>
      </div>
      {auth.loading && (
        <Loader
          className="m-auto w-min"
          type="Oval"
          color="#1e3a8a"
          height={40}
          width={40}
        />
      )}
    </div>
  );
};

const Registered = () => {
  const userDispatch = useDispatch();
  return (
    <div className="shadow-xl pb-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-8/12 text-center min-h-body">
      <h3 className="text-2xl p-4">
        Thank you for signing up on <b>SupSocial</b>.
      </h3>
      <Link
        onClick={() => userDispatch(clearSignupFlag())}
        className={secondaryBtn}
        to="/login"
      >
        Login to continue
      </Link>
    </div>
  );
};
