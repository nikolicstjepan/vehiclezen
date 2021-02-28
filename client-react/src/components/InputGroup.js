import React from "react";
import { capitalize } from "../lib/utils";

export default function InputGroup({ type = "text", name, value, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {capitalize(name)}
      </label>
      <input
        type={type}
        value={value}
        required
        className="form-control"
        name={name}
        id={name}
        onChange={onChange}
      />
    </div>
  );
}
