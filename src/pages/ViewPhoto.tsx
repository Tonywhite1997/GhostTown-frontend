import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";
import Loader from "../UI/Loader";

function ViewPhoto({
  photoURL,
  setViewPhoto,
}: {
  photoURL: string;
  setViewPhoto: Dispatch<SetStateAction<boolean>>;
}) {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  function handleImageLoader() {
    setIsImageLoading(false);
  }

  return (
    <div className="view-photo-backdrop">
      <FaX
        className="cancel-btn"
        onClick={() => {
          setViewPhoto(false);
        }}
      />
      <div className="view-photo">
        {isImageLoading && (
          <div className="image-loader">
            <Loader color="white" />
          </div>
        )}
        <img src={photoURL} alt={photoURL} onLoad={handleImageLoader} />
      </div>
    </div>
  );
}

export default ViewPhoto;
