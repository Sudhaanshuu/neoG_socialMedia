import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { API_URL } from "../../utils/api_details";
import { UserCard } from "../user/UserCard";

export const LikedUsersList = ({ setShowModal, postId }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/post/${postId}/like`);
        if (data.success) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error("Something went wrong :(", err);
      } finally {
        setShowLoader(false);
      }
    })();
  }, [postId]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        {showLoader ? (
          <Loader
            className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            type="Oval"
            color="#1e3a8a"
            height={40}
            width={40}
          />
        ) : (
          <>
            <div className="w-auto my-6 mx-auto max-w-xl rounded-sm shadow-lg relative w-full bg-blue-50 outline-none focus:outline-none">
              <div className="flex items-center justify-between border-t border-solid border-blueGray-200">
                <h2 className="text-xl font-semibold p-2 pl-8">
                  Users who liked this post
                </h2>
                <button
                  className="bg-blue-600 text-white active:bg-blue-500 font-bold uppercase text-sm p-2 cursor-pointer rounded shadow hover:shadow-lg outline-none focus:outline-none m-3 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  x
                </button>
              </div>
              <div className="relative px-6 pb-6 flex-auto">
                {users.map((user) => (
                  <UserCard key={user._id} userId={user._id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
