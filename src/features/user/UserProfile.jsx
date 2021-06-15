import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { textImage, userImage, link } from "../../utils/styles";
import { Posts } from "../post/Posts";
import { toggleFollow } from "./userSlice";

export const UserProfile = () => {
  const { username } = useParams();
  const userDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.users).find(
    (user) => user.username === username
  );
  const currentUser = useSelector((state) => state.auth.login);
  const textForButton =
    currentUser._id === user._id
      ? "Edit Profile"
      : user.followers.includes(currentUser._id)
      ? "Following"
      : "Follow";
      let userPosts = useSelector((state) => state.posts.posts).filter(post => post.user === user._id);

  const buttonClicked = () => {
    switch (textForButton) {
      case "Following":
      case "Follow":
        userDispatch(
          toggleFollow({ currentUser: currentUser._id, user: user._id })
        );
        break;
      case "Edit Profile":
        navigate(`/${username}/profile`);
        break;
      default:
        break;
    }
  };
  return (
    <div className="shadow-xl py-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-1/2">
      <div className="m-2 p-1 border border-black-900 relative">
        <div className="flex">
          <section className="flex flex-col justify-center self-start w-40">
            {user.image ? (
              <img
                className={`${userImage} h-24 w-24`}
                src={user.image}
                alt="userDP"
              />
            ) : (
              <span className={`${textImage} h-24 w-24`}>
                {user.name.charAt(0)}
              </span>
            )}
            <button
              onClick={buttonClicked}
              className={`border border-blue-900 font-medium rounded-sm py-0.5 ${
                textForButton === "Following"
                  ? "bg-blue-600 text-blue-100 hover:opacity-90"
                  : "text-blue-900 hover:bg-blue-100"
              }`}
            >
              {textForButton}
            </button>
          </section>
          <section className="w-full ml-3 sm:ml-8">
            <h1 className="text-2xl font-bold text-blue-900">{user.name}</h1>
            <h3 className="font-medium text-blue-500">@{username}</h3>
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
            <div className="text-blue-800">
              <Link className="hover:underline" to={`/${username}/following`}>
                <b>{user.following.length}</b>{" "}
                <span className="text-blue-500">Following</span>
              </Link>
              <Link
                className="hover:underline ml-3"
                to={`/${username}/followers`}
              >
                <b>{user.followers.length}</b>{" "}
                <span className="text-blue-500">Followers</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
      <h3 className="text-center text-blue-900 font-medium text-xl">Posts</h3>
     <Posts userPosts={userPosts}/>
    </div>
  );
};

/*
  {currentUser._id === user._id && <i className="fas fa-user-edit fa-lg cursor-pointer px-1 py-2.5 rounded-full border-2 border-blue-800 hover:bg-blue-200 text-blue-800 absolute top-2 right-2"></i>}
*/
