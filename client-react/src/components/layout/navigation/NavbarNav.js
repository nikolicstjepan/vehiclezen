import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function NavbarNav({ isGuest, onLogout }) {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {isGuest ? (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link active" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/register">
                Register
              </Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Vehicles
              </Link>
            </li>
            <li className="nav-item ms-2">
              <button className="btn btn-outline-light" onClick={onLogout}>
                Logout
              </button>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
}
