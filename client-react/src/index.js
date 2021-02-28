import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";
import { setToken } from "./features/user/userSlice";

store.dispatch(setToken(localStorage.getItem("token")));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
