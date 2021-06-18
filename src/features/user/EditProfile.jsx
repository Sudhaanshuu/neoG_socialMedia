import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { updateUserDetails } from "./userSlice";
import { textImage, userImage } from "../../utils/styles";
import { IMG_API_URL } from "../../utils/api_details";

export const EditProfile = () => {
  const userDispatch = useDispatch();
  const { username } = useParams();
  const navigate = useNavigate();
  const loadStatus = useSelector((state) => state.users.status);
  const initialState = useSelector((state) => state.users.users).find(
    (user) => user.username === username
  );
  const currentUser = useSelector((state) => state.auth.login);
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
    if (
      user.link &&
      !/(http(s)?:\/\/.)?[-a-zA-Z0-9@:%.+_~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/.test(
        user.link
      )
    ) {
      setError("Invalid link URL.");
    } else {
      userDispatch(updateUserDetails(user));
      navigate(`/${username}`);
    }
  };
  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", process.env.REACT_APP_PRESET);

    try {
      delete axios.defaults.headers.common["Authorization"];
      const response = await axios.post(IMG_API_URL, formData);
      setUser((data) => ({ ...data, image: response.data.secure_url }));
    } catch (err) {
      console.error(err);
    } finally {
      axios.defaults.headers.common["Authorization"] = currentUser.token;
    }
  };

  return (
    loadStatus === "fulfilled" && (
      <section className="flex items-center justify-center pb-12 bg-blue-50 h-screen">
        <div className="mt-12 w-full rounded-lg shadow-lg p-4 bg-white sm:mx-4 md:w-3/4 lg:w-1/2">
          <h3 className="font-semibold text-xl text-blue-800 tracking-wide mb-2 text-center">
            Edit Profile
          </h3>
          <form onSubmit={validateForm} className="sm:px-4">
            <div className="flex justify-between items-center py-2 px-1 m-auto">
              {user?.image ? (
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
              <input
                type="file"
                className="p-2 text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-48 sm:w-80"
                onChange={uploadImage}
              />
            </div>
            <div className="flex justify-between items-center py-2 px-1 m-auto">
              <label className="font-medium">Username: </label>
              <span className="cursor-not-allowed p-2 text-blue-500 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 opacity:80 mx-1 w-48 sm:w-80">
                @{user.username}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 px-1 m-auto">
              <label className="font-medium">Name: </label>
              <input
                type="text"
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
                  charCount >= 150
                    ? "text-red-700 font-medium"
                    : "text-blue-700"
                }`}
              >
                {charCount}/160
              </small>
            </div>
            <div className="flex justify-between items-center py-2 px-1 m-auto">
              <label className="font-medium">Website: </label>
              <input
                type="text"
                className="p-2 text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-48 sm:w-80"
                value={user.link}
                onChange={(e) =>
                  setUser((data) => ({ ...data, link: e.target.value }))
                }
              />
            </div>
            {error && <div className="text-red-600 text-center">{error}</div>}
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
    )
  );
};
