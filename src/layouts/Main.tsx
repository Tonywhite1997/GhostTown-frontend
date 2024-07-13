import react from "react";
import Header from "./Header";
import Footer from "./Footer";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Main;
