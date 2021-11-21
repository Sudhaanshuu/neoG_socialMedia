import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { UserCard } from "./UserCard";

export const Following = () => {
  const { username } = useParams();
  const user = useSelector((state) => state.users.users).find(
    (user) => user.username === username
  );

  return (
    <div className="shadow-xl py-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-1/2">
      {user.following.map((userId) => (
        <UserCard key={userId} userId={userId} />
      ))}
      {user.following.length === 0 && (
        <div className="text center p-10">
        <h2 className="font-semibold text-xl">@{username} isn't following anyone.</h2>
        <p>When they do, they’ll be listed here.</p>
        </div>
      )}
    </div>
  );
};
