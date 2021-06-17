import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getPostedTime } from "../../utils/postedTime";
import { textImage, userImage } from "../../utils/styles";
import {
  deletePostPressed,
  likeButtonPressed,
  startLoadingPost,
} from "./postSlice";

export const Post = ({ post }) => {
  const postDispatch = useDispatch();
  let user = useSelector((state) => state.users.users).find(
    (user) => user._id === post.user
  );
  const currentUser = useSelector((state) => state.auth.login);
  const postedDate = getPostedTime(new Date(post.createdAt), new Date());
  const navigate = useNavigate();
  return (
    <div className="m-3 px-1 py-2 border border-black-900 flex relative">
      {post.user === currentUser._id && (
        <i
          onClick={() => {
            postDispatch(startLoadingPost());
            postDispatch(deletePostPressed(post._id));
          }}
          className="fas fa-trash absolute right-2 cursor-pointer"
        ></i>
      )}
      <section className="w-20">
        {user?.image ? (
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
      </section>
      <div className="ml-2 w-full">
        <b
          className="mr-1 hover:underline cursor-pointer"
          onClick={() => navigate(`/${user.username}`)}
        >
          {user.name}
        </b>
        <small
          className="cursor-pointer"
          onClick={() => navigate(`/${user.username}`)}
        >
          @{user.username} . {postedDate}
        </small>
        <section className="post-data">
          <p
            className="font-normal cursor-pointer"
            onClick={() => navigate(`/${user.username}/post/${post._id}`)}
          >
            {post.description}
          </p>
          <div className="my-1">
            <span className="pr-2">
              <i
                className={`pr-1 cursor-pointer fa-lg ${
                  post.likes.includes(currentUser._id) ? "fas" : "far"
                } fa-heart text-red-700 hover:opacity-80`}
                onClick={() => {
                  postDispatch(startLoadingPost());
                  postDispatch(likeButtonPressed({ postId: post._id }));
                }}
              ></i>
              {post.likes.length}
            </span>
            <span className="px-2">
              <i
                className="pr-1 cursor-pointer fa-lg far fa-comment-alt text-blue-700 hover:opacity-80"
                onClick={() => navigate(`/${user.username}/post/${post._id}`)}
              ></i>
              {post.comments.length}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

// you would have current user id, if it is within the like array, show fas,else far. heart
