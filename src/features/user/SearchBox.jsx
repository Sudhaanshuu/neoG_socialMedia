import { useState } from "react";
import { useNavigate } from "react-router";

export const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const searchForUser = () => {
    navigate(`/search?user=${searchText}`);
  };
  const searchOnEnter = (e) => {
    if (e.key === "Enter") {
      searchForUser();
    }
  };
  
  return (
    <div className="flex justify-center items-center py-2">
      <input
        className="border border-blue-900 p-1 bg-blue-50 text-blue-900 font-normal sm:w-3/4 md:w-1/2"
        onKeyDown={searchOnEnter}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for user"
      />
      <i
        onClick={searchForUser}
        className="fas fa-search border border-blue-900 p-2 cursor-pointer hover:bg-blue-100"
      ></i>
    </div>
  );
};
