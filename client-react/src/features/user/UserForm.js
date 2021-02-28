import React, { useState } from "react";

import InputGroup from "../../components/InputGroup";

export default function UserForm({ handleSubmit, actionText }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(form);
  };

  const handleFormChange = ({ target }) => {
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={onSubmit}>
          <InputGroup name="username" value={form.username} onChange={handleFormChange} />
          <InputGroup
            name="password"
            type="password"
            value={form.password}
            onChange={handleFormChange}
          />
          <button type="submit" className="btn btn-primary">
            {actionText}
          </button>
        </form>
      </div>
    </div>
  );
}
