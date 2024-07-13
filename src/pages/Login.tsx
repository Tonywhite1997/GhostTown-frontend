import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Description from "../UI/Description";
import { useShowPassword } from "../functions/generalfunction";
import { useLogin } from "../apis/useLogin";
import { LoginDataType } from "../types/types";
import Loader from "../UI/Loader";

function Login() {
  const [loginData, setLoginData] = useState<LoginDataType>({
    username: "",
    password: "",
  });

  function getLoginData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }
  const { handleShowPass, seePassword } = useShowPassword();
  const { handleLogin, isLoading } = useLogin({
    username: loginData.username,
    password: loginData.password,
  });

  return (
    <section className="login">
      <Description />
      <form className="login-form">
        <label className="login-form_label">
          Username
          <input
            placeholder="johndoe"
            name="username"
            onChange={(e) => {
              getLoginData(e);
            }}
            value={loginData.username}
          />
        </label>

        <label className="login-form_label">
          Password
          <div className="password-container">
            <input
              type={seePassword ? "text" : "password"}
              placeholder="password"
              value={loginData.password}
              name="password"
              onChange={(e) => {
                getLoginData(e);
              }}
            />
            {!seePassword ? (
              <FaEyeSlash onClick={handleShowPass} className="eye" />
            ) : (
              <FaEye onClick={handleShowPass} className="eye" />
            )}
          </div>
        </label>

        <div className="login-form_button">
          <button disabled={isLoading} onClick={handleLogin}>
            {isLoading ? <Loader /> : "Login"}
          </button>
        </div>

        <Link className="forgotten-password" to="/forgotten-password">
          Forgotten password?
        </Link>
        <hr className="divider" />
        <div className="create-new-account">
          <Link to="/signup" className="create-new-account-btn">
            Create new account
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
