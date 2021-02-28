import React, { useState } from "react";
import { useDispatch } from "react-redux";

import UserForm from "./UserForm";

import { callLoginUser } from "../../lib/api";
import { setToken } from "./userSlice";
import history from "../../history";

export default function LoginUser() {
  const dispatch = useDispatch();

  const [error, setError] = useState();

  const onSubmit = async (data) => {
    try {
      const response = await callLoginUser(data);
      console.log({ response });
      dispatch(setToken(response.token));

      history.push("/");
    } catch (error) {
      setError("Wrong combination of username and password");
    }
  };

  return (
    <div>
      <h1 className="text-center">Login</h1>
      <div className="py-5">
        {error && (
          <div className="alert alert-danger m-3 position-fixed bottom-0 end-0" role="alert">
            {error}
          </div>
        )}
        <UserForm handleSubmit={onSubmit} actionText="Login" />
      </div>
    </div>
  );
}
