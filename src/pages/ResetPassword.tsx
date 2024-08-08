import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useShowPassword } from "../functions/generalfunction";
import useResetPassword from "../apis/useResetPassword";
import Loader from "../UI/Loader";

type PassResetType = {
  resetToken: string;
  newPassword: string;
};

function ResetPassword() {
  const [passResetDetails, setPassResetDetails] = useState<PassResetType>({
    resetToken: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const { handleShowPass, seePassword } = useShowPassword();

  const { resetPassword, isLoading } = useResetPassword(
    passResetDetails.resetToken,
    passResetDetails.newPassword,
    navigate
  );

  function collectPassResetDetails(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setPassResetDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  return (
    <section className="reset-password">
      <p>Provide the reset token sent to your email and your new password.</p>
      <div className="reset-password-form">
        <label className="reset-label">
          Reset Token
          <input
            type="text"
            placeholder="reset token"
            name="resetToken"
            value={passResetDetails?.resetToken}
            onChange={collectPassResetDetails}
          />
        </label>
        <label className="new-pass-label">
          New Password
          <input
            type={seePassword ? "text" : "password"}
            placeholder="new password"
            name="newPassword"
            value={passResetDetails?.newPassword}
            onChange={collectPassResetDetails}
          />
          {!seePassword ? (
            <FaEyeSlash className="eye-icon" onClick={handleShowPass} />
          ) : (
            <FaEye className="eye-icon" onClick={handleShowPass} />
          )}
        </label>
        <button className="reset-btn" onClick={resetPassword}>
          {isLoading ? <Loader /> : "Reset Password"}
        </button>
      </div>
    </section>
  );
}

export default ResetPassword;
