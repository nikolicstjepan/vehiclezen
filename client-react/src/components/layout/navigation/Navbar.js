import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NavbarNav from "./NavbarNav";

import { selectToken, setToken } from "../../../features/user/userSlice";
import history from "../../../history";

export default function Navbar() {
  const isGuest = !useSelector(selectToken);
  const dispatch = useDispatch();

  const logout = () => {
    history.push("/login");
    dispatch(setToken());
  };

  return <NavbarNav isGuest={isGuest} onLogout={logout} />;
}
