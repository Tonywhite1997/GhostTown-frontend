import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

function Loader() {
  return <ClipLoader cssOverride={override} size={20} />;
}

export default Loader;
