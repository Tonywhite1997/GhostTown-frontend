import { useContext, useState } from "react";
import { authContext } from "../contexts/AuthContext";
import Loader from "../UI/Loader";

function Me() {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const auth = useContext(authContext);
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
        <button className="link">Change Password</button>
        <button className="link">Delete Account</button>
      </div>
    </div>
  );
}

export default Me;
