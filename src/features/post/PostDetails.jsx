import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getPostedTime } from "../../utils/postedTime";
import { primaryBtn, textImage, userImage } from "../../utils/styles";
import { addComment, likeButtonPressed } from "./postSlice";

export const PostDetails = () => {
    const navigate = useNavigate();
  const { postId, username } = useParams();
  const postData = useSelector((state) => state.posts.posts).find(
    (post) => post._id === postId
  );
  const postDispatch = useDispatch();
  const user = useSelector((state) => state.users.users).find(
    (user) => user.username === username
  );
    const [commentData, setCommentData] = useState({
        comment:"",
        user:"admin"
    });

  return (
    <>
      <div className="m-3 p-2 border border-black-900">
        <div className="flex">
          {user.image ? (
            <img onClick={() => navigate(`:`)}
              className={userImage}
              src={user.image}
              alt="userDP"
            />
          ) : (
            <span className={textImage}>
              {user.name.charAt(0)}
            </span>
          )}
          <div className="flex flex-col m-1">
            <Link to={`/${username}`} className="text-xl font-semibold mr-1 text-blue-900">{user.name}</Link>
            <span>@{username}</span>
          </div>
        </div>
        <section>
              <p className="text-xl">{postData.description}</p>
              <div className="mt-1">
                <span
                  className="px-2"
                  onClick={() => postDispatch(likeButtonPressed(postData._id))}
                >
                  <i className="pr-1 far fa-heart text-red-700"></i>
                  {postData.likes.length}
                </span>
                <span className="px-2">
                  <i className="pr-1 far fa-comment-alt text-blue-700"></i>
                  {postData.comments.length}
                </span>
              </div>
            </section>
      </div>
      <div>
          <textarea className="border border-black-900 mx-3 w-11/12 p-1" placeholder="Write a comment" value={commentData.comment} onChange={(e) => setCommentData(data => ({...data, comment: e.target.value}))}></textarea>
          <button className={primaryBtn} disabled={!commentData.comment} onClick={() => {
              postDispatch(addComment({postId,comment: commentData.comment, user: commentData.user}));
              setCommentData(data => ({...data, comment:""}))
              }}>Comment</button>
      </div>
      {postData.comments.map(data => (
          <div key={data._id} className="border border-black-900 p-2">
              <p>{data.comment}</p>
              <Link to={`/${data.user}`} className="text-sm hover:underline text-blue-800">@{data.user}</Link>
              <small className="px-1" >. {getPostedTime(data.created, new Date())}</small>
            
          </div>
      ))}
    </>
  );
};
