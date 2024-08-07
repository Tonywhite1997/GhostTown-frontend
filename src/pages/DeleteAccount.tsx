import { useState } from "react";
import { useDeleteAccount } from "../apis/useDeleteAcc";
import Loader from "../UI/Loader";

function DeleteAccount() {
  const [userInput, setUserInput] = useState<string>("");

  const { deleteAccount, isLoading } = useDeleteAccount();

  return (
    <section className="delete-account">
      <p className="warning">
        Deleting your account will delete all your data and this action is not
        reversible.
      </p>
      <div className="delete-form">
        <label className="password-label">
          password{" "}
          <input
            placeholder="password"
            value={userInput}
            type="password"
            name="password"
            onChange={(e) => setUserInput(e.target.value)}
          />
        </label>
        <button onClick={() => deleteAccount(userInput)} className="delete-btn">
          {isLoading ? <Loader /> : "Delete Account"}
        </button>
      </div>
    </section>
  );
}

export default DeleteAccount;
