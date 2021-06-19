import axios from "axios";
import Loader from "react-loader-spinner";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Home, Navigation, Footer, Landing, PrivateRoute } from "./Components";
import {
  PostDetails,
  Followers,
  Following,
  UserProfile,
  SearchUsers,
  EditProfile,
  Login,
  Signup,
  getUsers,
  startLoadingUser,
  loadPosts,
  startLoadingPost,
} from "./features";

function App() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth);
  const currentUser = login.login;
  const user = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (currentUser) {
      axios.defaults.headers.common["Authorization"] = currentUser.token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.token) {
      dispatch(startLoadingUser());
      dispatch(startLoadingPost());
      dispatch(getUsers());
      dispatch(loadPosts());
    }
  }, [currentUser]);
  return (
    <div className="bg-blue-50 text-blue-900 min-h-screen relative">
      <Navigation />
      {(user.loading || posts.loading) && (
        <Loader
          className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          type="Oval"
          color="#1e3a8a"
          height={40}
          width={40}
        />
      )}
      <div className="px-2 min-h-body">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <PrivateRoute path="/home" element={<Home />} />
          <PrivateRoute path="/:username" element={<UserProfile />} />
          <PrivateRoute path="/:username/profile" element={<EditProfile />} />
          <PrivateRoute path="/:username/following" element={<Following />} />
          <PrivateRoute path="/:username/followers" element={<Followers />} />
          <PrivateRoute
            path="/:username/post/:postId"
            element={<PostDetails />}
          />
          <PrivateRoute path="/search" element={<SearchUsers />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
