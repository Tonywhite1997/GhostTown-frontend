import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Description from "../UI/Description";
import { useShowPassword } from "../functions/generalfunction";
import { useLogin } from "../apis/useLogin";
import { LoginDataType } from "../types/types";
import Loader from "../UI/Loader";
import Input from "../UI/Input";

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
          <Input
            name="username"
            placeholder="johndoe"
            value={loginData.username}
            onChange={getLoginData}
          />
        </label>

        <label className="login-form_label">
          Password
          <div className="password-container">
            <Input
              name="password"
              placeholder="password"
              value={loginData.password}
              type={seePassword ? "text" : "password"}
              onChange={getLoginData}
            />
            {seePassword ? (
              <FaEye onClick={handleShowPass} className="eye" />
            ) : (
              <FaEyeSlash onClick={handleShowPass} className="eye" />
            )}
          </div>
        </label>

        <div className="login-form_button">
          <button disabled={isLoading} onClick={handleLogin}>
            {isLoading ? <Loader /> : "Login"}
          </button>
        </div>

        <Link className="forgotten-password" to="/auth/forgotten-password">
          Forgotten password?
        </Link>
        <hr className="divider" />
        <div className="create-new-account">
          <Link to="/auth/signup" className="create-new-account-btn">
            Create new account
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
