import { CreatePost } from "../features/post/CreatePost";
import { Posts } from "../features/post/Posts";
import { SearchBox } from "../features/user/SearchBox";

export const Home = () => {
  return (
    <>
      <SearchBox />
      <CreatePost />
      <Posts />
    </>
  );
};
