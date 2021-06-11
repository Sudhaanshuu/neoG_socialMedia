import React from 'react';
import { Route, Routes } from 'react-router';
import { Home } from './Components/Home';
import { PostDetails } from './features/post/PostDetails';
import { Followers } from './features/user/Followers';
import { Following } from './features/user/Following';
import { UserProfile } from './features/user/UserProfile';

function App() {
  return (
    <div>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/:username" element={<UserProfile />}/>
       <Route path="/:username/following" element={<Following />}/>
       <Route path="/:username/followers" element={<Followers />}/>
       <Route path="/:username/post/:postId" element={<PostDetails />}/>
     </Routes>
    </div>
  );
}

export default App;
