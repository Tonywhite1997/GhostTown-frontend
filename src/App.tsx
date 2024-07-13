import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import LoginLayout from "./layouts/Login";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
              path="/login"
              element={<LoginLayout children={<Login />} />}
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}
export default App;
