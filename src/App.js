import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { Home } from "./Components/Home";
import { Navigation } from "./Components/Navigation";
import { Footer } from "./Components/Footer";
import { PostDetails } from "./features/post/PostDetails";
import { Followers } from "./features/user/Followers";
import { Following } from "./features/user/Following";
import { UserProfile } from "./features/user/UserProfile";
import { SearchUsers } from "./features/user/SearchUsers";
import { Landing } from "./Components/Landing";
import { EditProfile } from "./features/user/EditProfile";
import { Login } from "./features/authentication/Login";
import { Signup } from "./features/authentication/Signup";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./features/user/userSlice";
import { loadPosts } from "./features/post/postSlice";
import { PrivateRoute } from "./Components/PrivateRoute";
import axios from "axios";

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
      dispatch(getUsers());
      dispatch(loadPosts());
    }
  }, [currentUser]);
  return (
    <div className="bg-blue-50 text-blue-900 min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {user.status === "fulfilled" && posts.status === "fulfilled" && (
        <div className="px-2 min-h-body">
          <Routes>
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
      )}
      <Footer />
    </div>
  );
}

export default App;
