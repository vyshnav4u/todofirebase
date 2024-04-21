import React from "react";
import { UserAuth } from "../../context/AuthContext";
import Main from "./Main";

function Todo() {
  const { logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Main signOut={handleSignOut} />
    </div>
  );
}

export default Todo;
