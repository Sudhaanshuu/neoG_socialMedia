import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { secondaryBtn } from "../../utils/styles";
import { Post } from "./Post";

export const Posts = ({ userPosts }) => {
  let postData = useSelector((state) => state.posts.posts);
  postData = userPosts ? userPosts : postData;
  return (
    <div>
      {postData
        .slice(0)
        .reverse()
        .map((post) => (
          <Post post={post} key={post._id} />
        ))}
      {postData.length === 0 && (
        <div className="m-3 px-1 py-2 border border-black-900 text-center">
          <h3 className="text-lg font-semibold">No posts to view.</h3>
          <p className="font-medium">
            Follow user to start watching their posts.
          </p>
          <Link to="/search" className={secondaryBtn}>
            Discover Users
          </Link>
        </div>
      )}
    </div>
  );
};
