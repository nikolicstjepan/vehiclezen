import React, { useState } from "react";

export default function DeleteButton({ handleRemove }) {
  const [text, setText] = useState("Delete");

  const onClick = () => {
    if (text === "Delete") {
      return setText("Are you sure?");
    } else {
      handleRemove();
    }
  };

  return (
    <button className="btn btn-danger" onClick={onClick}>
      {text}
    </button>
  );
}
