import React, { useState } from "react";

import UserForm from "./UserForm";

import { callRegisterUser } from "../../lib/api";
import history from "../../history";

export default function RegisterUser() {
  const [error, setError] = useState();

  const onSubmit = async (data) => {
    try {
      await callRegisterUser(data);

      history.push("/login");
    } catch (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1 className="text-center">Register</h1>
      <div className="py-5">
        {error && (
          <div className="alert alert-danger m-3 position-fixed bottom-0 end-0" role="alert">
            {error}
          </div>
        )}
        <UserForm handleSubmit={onSubmit} actionText="Register" />
      </div>
    </div>
  );
}
