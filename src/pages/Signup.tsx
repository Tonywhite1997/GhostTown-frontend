import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../UI/Input";
import useSignUp from "../apis/useSignUp";
import Loader from "../UI/Loader";
import { SignUpDataType } from "../types/types";

function Signup() {
  const [signUpData, setSignUpData] = useState<SignUpDataType>({
    username: "",
    email: "",
    gender: "",
    password: "",
  });

  function getSignUpData(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignUpData((prevData: SignUpDataType) => {
      return { ...prevData, [name]: value };
    });
  }

  const { isLoading, handleSignUp } = useSignUp({
    username: signUpData.username,
    email: signUpData.email,
    password: signUpData.password,
    gender: signUpData.gender,
  });

  return (
    <section className="signup">
      <div className="description-container">
        <p className="description-title">Sign Up</p>
        <p className="description-text">Start a new conversation with ease.</p>
      </div>
      <form className="signup-form">
        <label className="signup-form-label">
          Username
          <Input
            name="username"
            placeholder="username"
            value={signUpData.username}
            onChange={getSignUpData}
          />
        </label>
        <label className="signup-form-label">
          Email
          <Input
            name="email"
            placeholder="jondoe@gmail.com"
            value={signUpData.email}
            onChange={getSignUpData}
          />
        </label>
        <label className="signup-form-label">
          Password{" "}
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={signUpData.password}
            onChange={getSignUpData}
          />
        </label>
        <div className="signup-form-label radio">
          <p>Gender</p>

          <div className="radio-input-container">
            <label className="radio-input">
              Male
              <Input
                type="radio"
                value="male"
                name="gender"
                checked={signUpData.gender === "male"}
                onChange={getSignUpData}
              />
            </label>

            <label className="radio-input">
              Female
              <Input
                type="radio"
                value="female"
                name="gender"
                checked={signUpData.gender === "female"}
                onChange={getSignUpData}
              />
            </label>
          </div>
        </div>

        <div className="signup-button">
          <button disabled={isLoading} onClick={handleSignUp}>
            {isLoading ? <Loader /> : "Sign Up"}
          </button>
        </div>
        <hr className="divider" />
        <div className="login-page-container">
          <Link className="login-page-btn" to="/auth/login">
            Login
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Signup;
