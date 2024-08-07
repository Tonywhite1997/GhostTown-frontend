import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  return (
    <section className="forgot-password">
      <p>Provide the valid email associated with your account.</p>
      <div className="forgot-password-form">
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="send-btn">Send Token</button>
      </div>
    </section>
  );
}
export default ForgotPassword;
