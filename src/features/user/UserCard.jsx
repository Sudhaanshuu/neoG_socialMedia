import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { textImage, userImage, link } from "../../utils/styles";
import { toggleFollowButton } from "./userSlice";

export const UserCard = ({ userId }) => {
    const userDispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.users.users).find(
      (user) => user._id === userId
    );
    const currentUser = useSelector((state) => state.auth.login);
    const textForButton =
    currentUser._id === userId
      ? ""
      : user.followers.includes(currentUser._id)
      ? "Following"
      : "Follow";
  
  
    return (
      <div className="m-2 p-1 border border-black-900 relative">
        <div className="flex justify-start">
          <section className="flex flex-col justify-center self-start w-24">
            {user.image ? (
              <img onClick={() => navigate(`/${user.username}`)}
                className={userImage}
                src={user.image}
                alt="userDP"
              />
            ) : (
              <span onClick={() => navigate(`/${user.username}`)} className={textImage}>
                {user.name.charAt(0)}
              </span>
            )}
            <button
              onClick={() =>
                userDispatch(
                  toggleFollowButton({ currentUser: currentUser._id, user: user._id })
                )
              }
              className={`border border-blue-900 font-medium  rounded-sm py-0.5 ${
                  textForButton === "Following"
                    ? "bg-blue-600 text-blue-100 hover:opacity-90"
                    : textForButton === "Follow"
                    ? "text-blue-900 hover:bg-blue-100"
                    : "hidden"
                }`}
            >
              {textForButton}
            </button>
          </section>
          <section className="mx-3 w-full">
            <h1 onClick={() => navigate(`/${user.username}`)} className="text-2xl font-bold text-blue-900 cursor-pointer hover:underline">{user.name}</h1>
            <h3 onClick={() => navigate(`/${user.username}`)} className="font-medium text-blue-500 cursor-pointer">@{user.username}</h3>
            <p>{user.bio}</p>
            {user.link && (
              <span>
                <i className="fas fa-link text-blue-900"></i>{" "}
                <a
                  className={link}
                  href={user.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.link}
                </a>
              </span>
            )}
          </section>
        </div>
      </div>
    );
  };
  