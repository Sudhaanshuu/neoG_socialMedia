import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getPostedTime } from "../../utils/postedTime";
import { textImage, userImage } from "../../utils/styles";
import { likeButtonPressed } from "./postSlice";

export const Post = ({ post }) => {
  const postDispatch = useDispatch();
  const user = useSelector((state) => state.users.users).find(
    (user) => user._id === post.user
  );
  const postedDate = getPostedTime(post.created, new Date());
  const navigate = useNavigate();

  return (
    <div className="m-3 p-2 border border-black-900 flex">
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
      <div className="mx-1">
        <b
          className="mr-1 hover:underline cursor-pointer"
          onClick={() => navigate(`/${user.username}`)}
        >
          {user.name}
        </b>
        <small className="cursor-pointer" onClick={() => navigate(`/${user.username}`)}>
          @{user.username} . {postedDate}
        </small>
        <section className="post-data">
          <p>{post.description}</p>
          <div>
            <span
              className="px-2"
              onClick={() => postDispatch(likeButtonPressed(post._id))}
            >
              <i className="pr-1 far fa-heart text-red-700"></i>
              {post.likes.length}
            </span>
            <span
              className="px-2"
              onClick={() => navigate(`${user.username}/post/${post._id}`)}
            >
              <i className="pr-1 far fa-comment-alt text-blue-700"></i>
              {post.comments.length}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

// you would have current user id, if it is within the like array, show fas,else far. heart
