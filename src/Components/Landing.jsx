import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Social from "../assets/social.svg";
import {primaryBtn, secondaryBtn} from "../utils/styles"

export const Landing = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser.token) {
      navigate("/home");
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center py-1">
      <img className="w-full p-1 sm:w-1/2 lg:w-8/12" src={Social} alt="Landing page" />
      <section className="text-center">
        <h1 className="font-bold text-4xl m-2">Jump Rope Community</h1>
        <p className="text-xl font-normal m-1 p-1 tracking-wide">Connect with jump ropers around the world! Follow each other's progress and collaborate together.</p>
        <h3 className="text-2xl font-semibold m-1 p-1">Join Socialize today!</h3>
        <Link className={`${primaryBtn} p-1.5 my-4 sm:text-lg w-52`} to="/signup">Sign up</Link>
        <Link className={`${secondaryBtn} p-1.5 my-4 sm:text-lg w-52`} to="/login">Login</Link>
      </section>
    </div>
  );
};
