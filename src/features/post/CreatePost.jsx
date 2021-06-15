import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { primaryBtn, textImage, userImage } from "../../utils/styles";
import { postButtonPressed } from "./postSlice";

export const CreatePost = () => {
  const postDispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login);
  const user = useSelector((state) => state.users.users).find(
    (user) => user._id === currentUser._id
  );
  const navigate = useNavigate();
  const [postData, setPostData] = useState("");

  const addPost = () => {
    postDispatch(postButtonPressed({ postData }));
    setPostData("");
  };

  return (
    <div className="m-3 border border-black-900 flex bg-blue-50">
      {user?.image ? (
        <img
          onClick={() => navigate(`/${currentUser.username}`)}
          className={userImage}
          src={user.image}
          alt="userDP"
        />
      ) : (
        <span
          onClick={() => navigate(`/${currentUser.username}`)}
          className={textImage}
        >
          {currentUser.name.charAt(0)}
        </span>
      )}
      <div className="ml-1 w-9/12 relative">
        <textarea
          className="w-full h-24 resize-none p-1 outline-none text-blue-900 bg-blue-50"
          placeholder="Write a Post"
          maxLength="280"
          value={postData}
          onChange={(e) => setPostData(e.target.value)}
        ></textarea>

        <button onClick={addPost} className={primaryBtn}>
          Post
        </button>
        <small
          className={`absolute right-3 bottom-3 ${
            postData.length >= 270
              ? "text-red-700 font-medium"
              : "text-blue-700"
          }`}
        >
          {postData.length}/280
        </small>
      </div>
    </div>
  );
};

//change currentUser references to user references