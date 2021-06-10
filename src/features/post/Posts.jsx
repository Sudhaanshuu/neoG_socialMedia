import React from "react";
import { useSelector } from "react-redux";
import { Post } from "./Post";

export const Posts = () => {
  const postData = useSelector((state) => state.posts.posts);
 
  return (
    <div>
      {postData.map((post) => (
       <Post post={post} key={post._id}/>
      ))}
    </div>
  );
};
