import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getPostedTime } from "../../utils/postedTime";
import { primaryBtn, textImage, userImage } from "../../utils/styles";
import { commentButtonPressed, likeButtonPressed } from "./postSlice";

export const PostDetails = () => {
  const commentRef = useRef(null);
  const navigate = useNavigate();
  const { postId, username } = useParams();
  const currentUser = useSelector((state) => state.auth);

  const postData = useSelector((state) => state.posts.posts).find(
    (post) => post._id === postId
  );
  const postDispatch = useDispatch();
  const user = useSelector((state) => state.users.users).find(
    (user) => user.username === username
  );
  
  const [commentData, setCommentData] = useState({
    comment: "",
    user: currentUser.username,
  });
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    commentRef.current.focus();
  },[]);

  return (
    <div className="shadow-xl py-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-1/2">
      <div className="m-3 p-2 border border-black-900">
        <div className="flex">
          {user.image ? (
            <img
              onClick={() => navigate(`:`)}
              className={userImage}
              src={user.image}
              alt="userDP"
            />
          ) : (
            <span className={textImage}>{user.name.charAt(0)}</span>
          )}
          <div className="flex flex-col m-1">
            <Link
              to={`/${username}`}
              className="text-xl font-semibold mr-1 text-blue-900 hover:underline"
            >
              {user.name}
            </Link>
            <span>@{username}</span>
          </div>
        </div>
        <section>
          <p className="text-xl">{postData.description}</p>
          <div className="mt-1">
            <span
              className="px-2"
              onClick={() =>
                postDispatch(
                  likeButtonPressed({
                    postId: postData._id,
                    user: currentUser._id,
                  })
                )
              }
            >
              <i
                className={`pr-1 cursor-pointer fa-lg ${
                  postData.likes.includes(currentUser._id) ? "fas" : "far"
                } fa-heart text-red-700 hover:opacity-80`}
              ></i>
              {postData.likes.length}
            </span>
            <span className="px-2">
              <i className="pr-1 cursor-pointer fa-lg far fa-comment-alt text-blue-700"></i>
              {postData.comments.length}
            </span>
          </div>
        </section>
      </div>
      <div className="relative mx-3">
        <textarea
        ref={commentRef}
          className="border border-black-900 bg-blue-50 p-1.5 w-full h-24 resize-none outline-none focus:ring focus:ring-blue-200"
          placeholder="Write a comment"
          maxLength="280"
          value={commentData.comment}
          onChange={(e) => {
            setCommentData((data) => ({ ...data, comment: e.target.value }));
            setCharCount(e.target.value.length);
          }}
        ></textarea>
        <button
          className={`${primaryBtn} ml-0`}
          disabled={!commentData.comment}
          onClick={() => {
            postDispatch(
              commentButtonPressed({
                postId,
                comment: commentData.comment,
                user: commentData.user,
              })
            );
            setCommentData((data) => ({ ...data, comment: "" }));
          }}
        >
          Comment
        </button>
        <p className={`absolute right-10 bottom-2 ${charCount>270?"text-red-700 font-medium":"text-blue-900"}`}>{charCount}/280</p>
      </div>
      {postData.comments.slice(0)
          .reverse().map((data) => (
        <div key={data._id} className="border border-black-900 p-2 mx-2 my-1">
          <p className="font-medium">{data.comment}</p>
          <Link
            to={`/${data.user}`}
            className="text-sm hover:underline text-blue-800"
          >
            @{data.user}
          </Link>
          <small className="px-1">
            . {getPostedTime(data.created, new Date())}
          </small>
        </div>
      ))}
    </div>
  );
};
