import react, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ChangePasswordType } from "../types/types";
import { useShowPassword } from "../functions/generalfunction";
import useChangePassword from "../apis/useChangePassword";
import Loader from "../UI/Loader";

function ChangePassword() {
  const [newPasswordDetails, setNewPasswordDetails] =
    useState<ChangePasswordType>({
      oldPassword: "",
      newPassword: "",
    });

  const { handleShowPass: handleNewPass, seePassword: seeNewPass } =
    useShowPassword();

  const { handleShowPass: handleOldPass, seePassword: seeOldPass } =
    useShowPassword();

  const { changePassword, isLoading } = useChangePassword(newPasswordDetails);

  function collectNewPassDetails(e: react.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const { name, value } = e.target;

    setNewPasswordDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  return (
    <section className="change-password">
      <form className="password-form">
        <label className="old-password">
          <input
            type={seeOldPass ? "text" : "password"}
            placeholder="old password"
            name="oldPassword"
            value={newPasswordDetails.oldPassword}
            onChange={collectNewPassDetails}
          />
          Old Password
          {!seeOldPass ? (
            <FaEyeSlash className="eye-icon" onClick={handleOldPass} />
          ) : (
            <FaEye className="eye-icon" onClick={handleOldPass} />
          )}
        </label>
        <label className="new-password">
          <input
            type={seeNewPass ? "text" : "password"}
            placeholder="new-password"
            name="newPassword"
            value={newPasswordDetails.newPassword}
            onChange={collectNewPassDetails}
          />
          New Password
          {!seeNewPass ? (
            <FaEyeSlash className="eye-icon" onClick={handleNewPass} />
          ) : (
            <FaEye className="eye-icon" onClick={handleNewPass} />
          )}
        </label>
        <button
          className="change-btn"
          onClick={(e) => {
            !isLoading && changePassword(e);
          }}
        >
          {isLoading ? <Loader /> : "change"}
        </button>
      </form>
    </section>
  );
}

export default ChangePassword;
