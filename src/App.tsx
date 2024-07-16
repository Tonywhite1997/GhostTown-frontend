import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import LoginLayout from "./layouts/Login";
import SignupLayout from "./layouts/Signup";
import FeedLayout from "./layouts/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

const queryClient = new QueryClient();
function App() {
  return (
    <Router>
      <ToastContainer theme="dark" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginLayout children={<Login />} />} />
            <Route
              path="/auth/login"
              element={<LoginLayout children={<Login />} />}
            />
            <Route
              path="/auth/signup"
              element={<SignupLayout children={<Signup />} />}
            />
            <Route path="/feed" element={<FeedLayout children={<Feed />} />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}
export default App;
