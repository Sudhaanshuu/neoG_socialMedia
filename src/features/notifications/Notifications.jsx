import { useDispatch, useSelector } from "react-redux";
import { NotificationCard } from "./NotificationCard";
import {
  clearAllNotifications,
  startLoadingNotifications,
} from "./notificationSlice";

export const Notifications = () => {
  const notifications = useSelector((state) => state.notify.notifications);
  const dispatch = useDispatch();
  return (
    <div className="shadow-xl py-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-1/2">
      {notifications.length > 0 && (
        <button
          className="px-4 pt-2 font-semibold cursor-pointer hover:underline"
          onClick={() => {
            dispatch(startLoadingNotifications());
            dispatch(clearAllNotifications());
          }}
        >
          Clear all notifications
        </button>
      )}
      {notifications.map((notification) => (
        <NotificationCard key={notification._id} notification={notification} />
      ))}
      {notifications.length === 0 && (
        <h2 className="text-xl font-semibold text-center p-8">
          There are no new notifications.
        </h2>
      )}
    </div>
  );
};
