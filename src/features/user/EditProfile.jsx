import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { updateUserDetails } from "./userSlice";

export const EditProfile = () => {
  const userDispatch = useDispatch();
  const { username } = useParams();
  const navigate = useNavigate();
  const initialState = useSelector((state) => state.users.users).find(
    (user) => user.username === username
  );
  const [user, setUser] = useState(initialState);
  const [charCount, setCharCount] = useState(user?.bio ? user.bio.length : 0);
  const [error, setError] = useState("");

  const cancelChanges = (e) => {
    e.preventDefault();
    setUser(initialState);
    navigate(`/${username}`);
  };
  const validateForm = (e) => {
    e.preventDefault();
    if (!isImageURLValid()) {
      setError("Photo URL must be of jpeg, jpg, png, gif or svg extension.");
    }
    if (!isURLValid()) {
      setError("Invalid link URL.");
    } else {
      userDispatch(updateUserDetails(user));
      navigate(`/${username}`);
    }
  };

  function isURLValid() {
    if (!user?.link || user.link === "") {
      return true;
    }
    if (
      user.link.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      ) == null
    )
      return false;
    else return true;
  }

  const isImageURLValid = () => {
    if (!user?.image || user.image === "") {
      return true;
    } else if (user.image.match(/\.(jpeg|jpg|gif|png|svg)$/) != null) {
      return true;
    }
    return false;
  };

  return (
    <section className="flex items-center justify-center pb-12 bg-blue-50 h-screen">
      <div className="mt-12 w-full rounded-lg shadow-lg p-4 bg-white sm:mx-4 md:w-3/4 lg:w-1/2">
        <h3 className="font-semibold text-xl text-blue-800 tracking-wide mb-2 text-center">
          Edit Profile
        </h3>
        <form onSubmit={validateForm} className="sm:px-4">
          <div className="flex justify-between items-center py-2 px-1 m-auto">
            <label className="font-medium">Username: </label>
            <span className="cursor-not-allowed p-2 text-blue-500 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 opacity:80 mx-1 w-48 sm:w-80">
              @{user.username}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 px-1 m-auto">
            <label className="font-medium">Name: </label>
            <input
              maxLength="50"
              required
              className="p-2 text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-48 sm:w-80"
              value={user.name}
              onChange={(e) =>
                setUser((data) => ({ ...data, name: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-between items-center py-2 px-1 relative  m-auto">
            <label className="self-start font-medium">Bio: </label>
            <textarea
              className="p-2 w-48 sm:w-80 text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-24"
              value={user.bio}
              maxLength="160"
              onChange={(e) => {
                setUser((data) => ({ ...data, bio: e.target.value }));
                setCharCount(e.target.value.length);
              }}
            ></textarea>
            <small
              className={`absolute ${
                charCount >= 150 ? "text-red-700 font-medium" : "text-blue-700"
              }`}
            >
              {charCount}/160
            </small>
          </div>
          <div className="flex justify-between items-center py-2 px-1 m-auto">
            <label className="font-medium">Website: </label>
            <input
              className="p-2 text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-48 sm:w-80"
              value={user.link}
              onChange={(e) =>
                setUser((data) => ({ ...data, link: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-between items-center py-2 px-1 m-auto">
            <label className="font-medium">Photo URL: </label>
            <input
              className="p-2 text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-48 sm:w-80"
              value={user.image}
              onChange={(e) =>
                setUser((data) => ({ ...data, image: e.target.value }))
              }
            />
          </div>
          <div className="text-red-600">{error}</div>
          <div className="flex justify-evenly items-center py-2 px-1 md:w-3/4 m-auto">
            <button
              className="uppercase font-semibold tracking-wide bg-blue-700 text-blue-100 px-4 py-2 rounded-lg rounded-lg focus:outline-none hover:bg-blue-800 w-1/2 mr-1"
              type="submit"
            >
              Update
            </button>
            <button
              className="uppercase font-semibold tracking-wide bg-red-100 text-red-700 px-4 py-2 rounded-lg rounded-lg focus:outline-none hover:bg-red-200 w-1/2 ml-1"
              onClick={cancelChanges}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
