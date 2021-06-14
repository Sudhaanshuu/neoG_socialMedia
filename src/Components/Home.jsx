import { CreatePost } from "../features/post/CreatePost";
import { Posts } from "../features/post/Posts";

export const Home = () => {
  return (
    <div className="shadow-xl py-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-1/2">
      <CreatePost />
      <Posts />
    </div>
  );
};
