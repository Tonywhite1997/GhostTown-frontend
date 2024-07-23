import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import LoginLayout from "./layouts/Login";
import SignupLayout from "./layouts/Signup";
import FeedLayout from "./layouts/Feed";
import ChatLayout from "./layouts/Chat";
import GroupLayout from "./layouts/Group";
import MeLayout from "./layouts/Me";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Chat from "./pages/Chat";
import Group from "./pages/Group";
import Me from "./pages/Me";
import SocketContextProvider from "./contexts/SocketContext";

const queryClient = new QueryClient();
function App() {
  return (
    <Router>
      <ToastContainer theme="dark" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketContextProvider>
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
              <Route
                path="/feed"
                element={<FeedLayout children={<Feed />} />}
              />

              <Route
                path="/chats"
                element={<ChatLayout children={<Chat />} />}
              />

              <Route
                path="/chats/:id"
                element={<ChatLayout children={<Chat />} />}
              />

              <Route
                path="/groups"
                element={<GroupLayout children={<Group />} />}
              />

              <Route path="/me" element={<MeLayout children={<Me />} />} />
            </Routes>
          </SocketContextProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}
export default App;
