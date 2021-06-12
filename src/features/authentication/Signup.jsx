import { useState } from "react";
import { Link } from "react-router-dom";
import { primaryBtn, secondaryBtn } from "../../utils/styles";
import { Password } from "./Password";

export const Signup = () => {
  const [{ username, password, email, name }, setCredentials] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const signupHandler = (e) => {
    e.preventDefault();
    //logic
  };

  return (
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
            className="p-2 rounded-sm border border-transparent  focus:outline-none focus:ring-2 focus:ring-blue-900 w-3/4"
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
        <button type="submit" className={`${primaryBtn} mt-2`}>
          Register
        </button>
      </form>
      <div className="text-lg font-semibold p-2 md:w-3/4 lg:w-8/12 m-auto">
        Already a member?{" "}
        <Link to="/login">
          <button className={`${secondaryBtn} mt-2`}>Login</button>
        </Link>
      </div>
    </div>
  );
};
