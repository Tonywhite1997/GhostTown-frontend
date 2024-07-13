import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";
import { AuthContextType } from "../types/types";

function Signup() {
  const context = useContext<AuthContextType | null>(authContext);

  if (!context) {
    throw new Error("Something went wrong");
  }

  const { user } = context;

  return (
    <div>
      <p>signup</p>
      <div>
        {user?.profilePicURL && (
          <img src={user?.profilePicURL} alt="some content" />
        )}
      </div>
    </div>
  );
}

export default Signup;
