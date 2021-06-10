import { Posts } from "../features/post/Posts";

export const Home = () => {
  return (
    <>
      <h1 className="m-2 font-semibold text-blue-900 text-2xl text-center">
        {" "}
        Social Media App
      </h1>
      <Posts />
    </>
  );
};
