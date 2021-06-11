import React from "react";
import { useSelector } from "react-redux";
import { Post } from "./Post";

export const Posts = ({userPosts}) => {
  let postData = useSelector((state) => state.posts.posts);
  postData = userPosts? userPosts : postData;
  return (
    <div>
      {postData.map((post) => (
       <Post post={post} key={post._id}/>
      ))}
    </div>
  );
};
