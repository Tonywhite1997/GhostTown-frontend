import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useShowPassword } from "../functions/generalfunction";

function ResetPassword() {
  const { handleShowPass, seePassword } = useShowPassword();
  return (
    <section className="reset-password">
      <p>Provide the reset token sent to your email.</p>
      <div className="reset-password-form">
        <label className="reset-label">
          Reset Token
          <input type="text" placeholder="reset token" />
        </label>
        <label className="new-pass-label">
          New Password
          <input
            type={seePassword ? "text" : "password"}
            placeholder="new password"
          />
          {!seePassword ? (
            <FaEyeSlash className="eye-icon" onClick={handleShowPass} />
          ) : (
            <FaEye className="eye-icon" onClick={handleShowPass} />
          )}
        </label>
        <button className="reset-btn">Reset Password</button>
      </div>
    </section>
  );
}

export default ResetPassword;
