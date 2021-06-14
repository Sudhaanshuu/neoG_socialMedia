import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export const Navigation = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.auth);

  return (
    <nav className="z-10 flex justify-between items-center h-12 sticky top-0 mb-1 p-4 pl-3 bg-blue-900 rounded-b-lg">
      <div className="flex justify-center items-center cursor-pointer " onClick={() => navigate("/")}>
        <img
          className="h-auto w-12 rounded-full shadow-lg"
          src={Logo}
          alt="logo"
        />
        <h2 className="font-cursive text-2xl px-1 text-blue-100">
          SupSocial
        </h2>
      </div>
      <div className="w-14 flex justify-between">
      <Link to={`/search`}>
        <i className="fas fa-search fa-lg text-blue-100"></i>
      </Link>
      <Link to={`/${currentUser.username}`}>
        <i className="fas fa-user fa-lg text-blue-100"></i>
      </Link>
      </div>
    </nav>
  );
};
