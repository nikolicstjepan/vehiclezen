import React, { useState, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { addNewVehicle, selectVehiclesError, removeError } from "./vehiclesSlice";
import history from "../../history";

import InputGroup from "../../components/InputGroup";

export default function AddVehicleForm() {
  const error = useSelector(selectVehiclesError);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(removeError());
    };
  }, [dispatch]);

  const initialState = { make: "", model: "", year: "" };
  const [form, setForm] = useState(initialState);

  const handleFormChange = ({ target }) => {
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  const onAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(addNewVehicle(form));
      await unwrapResult(res);

      setForm(initialState);
      history.push("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="row justify-content-center">
      <h1 className="text-center">Add new vehicle</h1>
      <form onSubmit={onAdd} className="py-5 col-md-4">
        {error && (
          <div className="alert alert-danger m-3 position-fixed bottom-0 end-0" role="alert">
            {error}
          </div>
        )}

        <InputGroup name="make" value={form.make} onChange={handleFormChange} />
        <InputGroup name="model" value={form.model} onChange={handleFormChange} />
        <InputGroup type="number" name="year" value={form.year} onChange={handleFormChange} />

        <div className="mb-3">
          <button className="btn btn-primary" onClick={onAdd}>
            Add new
          </button>
        </div>
      </form>
    </div>
  );
}
