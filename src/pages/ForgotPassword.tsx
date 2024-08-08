import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForgotPassword from "../apis/useForgotPassword";
import Loader from "../UI/Loader";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const { sendResetToken, isLoading } = useForgotPassword(email, navigate);

  return (
    <section className="forgot-password">
      <p>Provide the valid email associated with your account.</p>
      <div className="forgot-password-form">
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="send-btn" onClick={sendResetToken}>
          {isLoading ? <Loader /> : "Send Token"}
        </button>
      </div>
    </section>
  );
}
export default ForgotPassword;
