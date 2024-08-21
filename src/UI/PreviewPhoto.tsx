import { Dispatch, SetStateAction } from "react";
import { FaX } from "react-icons/fa6";

function PreviewPhoto({
  url,
  setPreviewURL,
  setUploadData,
  setViewPhoto,
}: {
  url: string;
  setPreviewURL: Dispatch<SetStateAction<string | null>>;
  setUploadData: Dispatch<SetStateAction<Blob | null>>;
  setViewPhoto: Dispatch<SetStateAction<boolean>>;
}) {
  function setToDefault() {
    setPreviewURL(null);
    setUploadData(null);
  }

  return (
    <div className="photo-preview">
      <img
        src={url}
        onClick={() => {
          setViewPhoto(true);
        }}
      />
      <FaX className="remove-photo" onClick={setToDefault} />
    </div>
  );
}

export default PreviewPhoto;
