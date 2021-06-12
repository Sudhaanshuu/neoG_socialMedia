import { CreatePost } from "../features/post/CreatePost";
import { Posts } from "../features/post/Posts";
import { SearchBox } from "../features/user/SearchBox";

export const Home = () => {
  return (
    <div className="shadow-xl pb-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-1/2">
      <SearchBox />
      <CreatePost />
      <Posts />
    </div>
  );
};
