import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { textImage, userImage } from "../../utils/styles";
import {
  clearNotification,
  startLoadingNotifications,
} from "./notificationSlice";

export const NotificationCard = ({ notification }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.users).find(
    (user) => user._id === notification.actionedUser
  );
  const username = useSelector((state) => state.auth.login.username);
  const iconClass =
    notification.actionType === "like"
      ? "fa-heart text-red-700"
      : notification.actionType === "comment"
      ? "fa-comment text-blue-800"
      : "fa-user-friends text-green-800";

  const navigateRoute = () => {
    if (notification.actionType === "follow") {
      navigate(`/${user.username}`);
    } else {
      navigate(`/${username}/post/${notification.post}`);
    }
  };
  return (
    <div className="m-3 px-1 py-2 border border-black-900 flex relative relative">
      <i
        className="fas fa-times absolute right-5 cursor-pointer"
        onClick={() => {
          dispatch(startLoadingNotifications());
          dispatch(clearNotification({ notificationId: notification._id }));
        }}
      ></i>
      <section className="w-20 cursor-pointer">
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
      <div onClick={navigateRoute} className="cursor-pointer font-semibold">
        <h3 className="m-1 ">{user.username}</h3>
        <p>
          <i className={`fas ${iconClass} fa-lg px-1 hover:opacity-90`}></i>
          {notification.actionType === "like"
            ? "has liked your post"
            : notification.actionType === "comment"
            ? "added a comment on your post"
            : "started following you!"}
        </p>
      </div>
    </div>
  );
};
