import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

function Loader({ number = 20 }: { number?: number }) {
  return <ClipLoader cssOverride={override} size={number} color="#32a852" />;
}

export default Loader;
