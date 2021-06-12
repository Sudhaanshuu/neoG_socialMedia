import { useState } from "react";


export const Password = ({ userValue, setCredentials }) => {
  const [viewPwd, setViewPwd] = useState(false);

  return (
    <div className="p-2">
      <input
        required
        className="p-2 rounded-sm border border-transparent  focus:outline-none focus:ring-2 focus:ring-blue-900 w-3/4"
        type={viewPwd ? "text" : "password"}
        value={userValue}
        onChange={(e) =>
          setCredentials((credentials) => ({
            ...credentials,
            password: e.target.value,
          }))
        }
        placeholder="Password"
      />
      <span className="p-2 bg-blue-900 text-blue-50 rounded-sm" onClick={() => setViewPwd((val) => !val)}>
        <i className="fas fa-eye fa-lg"></i>
      </span>
    </div>
  );
};
