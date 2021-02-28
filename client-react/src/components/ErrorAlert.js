import React from "react";

export default function ErrorAlert({ error }) {
  if (!error) {
    return null;
  }

  return (
    <div className="alert alert-danger m-3 position-fixed bottom-0 end-0" role="alert">
      {error}
    </div>
  );
}
