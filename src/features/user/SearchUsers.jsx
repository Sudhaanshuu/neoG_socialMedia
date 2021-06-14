import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import { UserCard } from "./UserCard";

export const SearchUsers = () => {
  let users = useSelector((state) => state.users.users);
  const query = new URLSearchParams(useLocation().search);
  const searchValue = query.get("user");
  console.log(searchValue);
  users = searchValue
    ? users.filter(
        (user) =>
          user.name.includes(searchValue) || user.username.includes(searchValue)
      )
    : users;
  return (
    <div className="shadow-xl py-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-1/2">
      <SearchBox />
      {users.map(({ _id }) => (
        <UserCard key={_id} userId={_id} />
      ))}
    </div>
  );
};
