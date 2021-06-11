import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { SearchBox } from "./SearchBox";
import { textImage, userImage, link } from "../../utils/styles";
import { toggleFollow } from "./userSlice";

export const SearchUsers = () => {
  const userDispatch = useDispatch();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const searchValue = query.get("user");
  const currentUser = useSelector((state) => state.auth);
  let users = useSelector((state) => state.users.users).filter(
    (user) =>
      user.name.includes(searchValue) || user.username.includes(searchValue)
  );
  const textForButton = users.map((user) =>
    currentUser._id === user._id
      ? ""
      : user.followers.includes(currentUser._id)
      ? "Following"
      : "Follow"
  );
  return (
    <>
      <SearchBox />
      {users ? (
        users.map((user, idx) => (
          <div
            key={user._id}
            className="m-2 p-1 border border-black-900 relative"
          >
            <div className="flex justify-start">
              <section className="flex flex-col justify-center">
                {user.image ? (
                  <img
                    onClick={() => navigate(`/${user.username}`)}
                    className={userImage}
                    src={user.image}
                    alt="userDP"
                  />
                ) : (
                  <span
                    onClick={() => navigate(`/${user.username}`)}
                    className={textImage}
                  >
                    {user.name.charAt(0)}
                  </span>
                )}
                <button
                  onClick={() =>
                    userDispatch(
                      toggleFollow({
                        currentUser: currentUser._id,
                        user: user._id,
                      })
                    )
                  }
                  className={`border border-blue-900 font-medium  rounded-xl py-0.5 ${
                    textForButton[idx] === "Following"
                      ? "bg-blue-600 text-blue-100 hover:opacity-90"
                      : textForButton[idx] === "Follow"
                      ? "text-blue-900 hover:bg-blue-100"
                      : "hidden"
                  }`}
                >
                  {textForButton[idx]}
                </button>
              </section>
              <section className="mx-3">
                <h1
                  onClick={() => navigate(`/${user.username}`)}
                  className="text-2xl font-bold text-blue-900 cursor-pointer hover:underline"
                >
                  {user.name}
                </h1>
                <h3
                  onClick={() => navigate(`/${user.username}`)}
                  className="font-medium text-blue-500 cursor-pointer"
                >
                  @{user.username}
                </h3>
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
        ))
      ) : (
        <p>No User found</p>
      )}
    </>
  );
};
