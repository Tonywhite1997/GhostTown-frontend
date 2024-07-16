import Header from "../layouts/Header";
import { PropagateLoader } from "react-spinners";

function LoaderPage() {
  return (
    <div
      className="loader-container"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PropagateLoader color="grey" />
    </div>
  );
}

export default LoaderPage;
