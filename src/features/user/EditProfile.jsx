import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export const EditProfile = ({ setEditProfile }) => {
  const { username } = useParams();
  const initialState = useSelector((state) => state.users.users).find(
    (user) => user.username === username
  );
  const [user, setUser] = useState(initialState);
  const [charCount, setCharCount] = useState(user.bio.length);

  const cancelChanges = (e) => {
    e.preventDefault();
    setUser(initialState);
    setEditProfile(false);
  };
  const validateForm = (e) => {
    e.preventDefault();
  };
  const validateImageURL = (e) => {
    if (
      e.target.value.match(/\.(jpeg|jpg|gif|png)$/) != null ||
      e.target.value === ""
    ) {
      setUser((data) => ({ ...data, image: e.target.value }));
    }
  };
  return (
    <section className="flex items-center justify-center px-4 pb-12 bg-blue-50 h-screen">
      <div className="mt-12 w-full rounded-lg shadow-lg p-4 bg-white md:w-3/4 lg:w-6/12 ">
        <h3 className="font-semibold text-lg text-blue-800 tracking-wide mb-2 text-center">
          Edit Profile
        </h3>
        <form onSubmit={validateForm}>
          <div className="flex justify-between items-center py-2 px-1 md:w-3/4 m-auto">
            <label>Username: </label>
            <span
              className="cursor-not-allowed px-2 py-1 text-blue-500 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 opacity:80 mx-1 w-48"
            >@{user.username}</span>
          </div>
          <div className="flex justify-between items-center py-2 px-1 md:w-3/4 m-auto">
            <label>Name: </label>
            <input
              className="px-2 py-1 text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={user.name}
              onChange={(e) =>
                setUser((data) => ({ ...data, name: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-between items-center py-2 px-1 relative md:w-3/4 m-auto">
            <label className="self-start">Bio: </label>
            <textarea
              className="px-2 py-1 w-48 text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-24"
              value={user.bio}
              maxLength="160"
              onChange={(e) => {
                setUser((data) => ({ ...data, bio: e.target.value }));
                setCharCount(e.target.value.length);
              }}
            ></textarea>
            <small
              className={`absolute ${
                charCount >= 150 ? "text-red-700 font-medium" : "text-blue-700"
              }`}
            >
              {charCount}/160
            </small>
          </div>
          <div className="flex justify-between items-center py-2 px-1 md:w-3/4 m-auto">
            <label>Photo URL: </label>
            <input
              className="px-2 py-1 text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={user.image}
              onChange={(e) => validateImageURL(e)}
            />
          </div>
          <div className="flex justify-evenly items-center py-2 px-1 md:w-3/4 m-auto">
            <button
              className="uppercase font-semibold tracking-wide bg-blue-700 text-blue-100 px-4 py-2 rounded-lg rounded-lg focus:outline-none hover:bg-blue-800 w-1/2 mr-1"
              type="submit"
            >
              Update
            </button>
            <button
              className="uppercase font-semibold tracking-wide bg-red-100 text-red-700 px-4 py-2 rounded-lg rounded-lg focus:outline-none hover:bg-red-200 w-1/2 ml-1"
              onClick={cancelChanges}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// export const EditProfile = ({setEditProfile}) => {
//     return(
//         <div className="opacity-25 fixed inset-0 z-30 bg-black">
//             Edit here
//             <button onClick={() => setEditProfile(false)}>Click</button>
//           <div
//             className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none rounded-lg focus:outline-none"
//           >
//             <div className="relative w-auto my-6 mx-auto max-w-3xl">
//               {/*content*/}
//               <div className="focus:ring-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none rounded-lg focus:outline-none">
//                 {/*header*/}
//                 <div className="flex items-start justify-between p-5 focus:ring-b focus:ring-solid focus:ring-blueGray-200 rounded-t">
//                   <h3 className="text-3xl font-semibold">
//                     Modal Title
//                   </h3>
//                   <button
//                     className="py-2 px-1 ml-auto bg-transparent focus:ring-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none rounded-lg focus:outline-none"
//                     onClick={() => setEditProfile(false)}
//                   >
//                     <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none rounded-lg focus:outline-none">
//                       ×
//                     </span>
//                   </button>
//                 </div>
//                 {/*body*/}
//                 <div className="relative p-6 flex-auto">
//                   <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
//                     I always felt like I could do anything. That’s the main
//                     thing people are controlled by! Thoughts- their perception
//                     of themselves! They're slowed down by their perception of
//                     themselves. If you're taught you can’t do anything, you
//                     won’t do anything. I was taught I could do everything.
//                   </p>
//                 </div>
//                 {/*footer*/}
//                 <div className="flex items-center justify-end p-6 focus:ring-t focus:ring-solid focus:ring-blueGray-200 rounded-b">
//                   <button
//                     className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none rounded-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={() => setEditProfile(false)}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none rounded-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={() => setEditProfile(false)}
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//     )
// }
