import React, { useState } from "react";

import InputGroup from "../../components/InputGroup";
import ErrorAlert from "../../components/ErrorAlert";

export default function AddVehicleForm({ onAdd, error }) {
  const initialState = { make: "", model: "", year: "" };
  const [form, setForm] = useState(initialState);

  const handleFormChange = ({ target }) => {
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onAdd(form);
      setForm(initialState);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-5 col-md-4">
      <ErrorAlert error={error} />

      <InputGroup name="make" value={form.make} onChange={handleFormChange} />
      <InputGroup name="model" value={form.model} onChange={handleFormChange} />
      <InputGroup type="number" name="year" value={form.year} onChange={handleFormChange} />

      <div className="mb-3">
        <button className="btn btn-primary">Add new</button>
      </div>
    </form>
  );
}
