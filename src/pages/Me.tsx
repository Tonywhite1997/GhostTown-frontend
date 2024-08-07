import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import Loader from "../UI/Loader";
import useLogout from "../apis/useLogout";

function Me() {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const auth = useContext(authContext);
  const { logout, isLogout } = useLogout();
  if (!auth)
    throw new Error("useAuth must be used within authContext provider");

  return (
    <div className="me">
      <div className="me-image">
        {isImageLoading && <Loader color="grey" />}
        <img
          src={auth.user?.profilePicURL}
          onLoad={() => setIsImageLoading(false)}
        />
      </div>
      <div className="me-details">
        <p>{auth.user?.username}</p>
        <p>{auth.user?.email}</p>
      </div>
      <div className="me-actions">
        <Link to="/auth/change-password" className="link">
          Change Password
        </Link>
        <Link to="/auth/delete-account" className="link">
          Delete Account
        </Link>
        <button onClick={logout} className="link">
          {isLogout ? <Loader /> : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Me;
