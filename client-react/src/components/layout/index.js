import React from "react";
import Navigation from "./navigation";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />

      <div className="container py-5">{children}</div>
    </div>
  );
}
