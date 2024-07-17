import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

function Loader({
  number = 20,
  color = "#32a852",
}: {
  number?: number;
  color?: string;
}) {
  return <ClipLoader cssOverride={override} size={number} color={color} />;
}

export default Loader;
