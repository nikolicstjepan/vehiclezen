import React, { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { addNewVehicle, selectVehiclesError, removeError } from "./vehiclesSlice";
import history from "../../history";

import AddVehicleForm from "./AddVehicleForm";

export default function AddVehicle() {
  const error = useSelector(selectVehiclesError);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(removeError());
    };
  }, [dispatch]);

  const onAdd = async (form) => {
    const res = await dispatch(addNewVehicle(form));
    await unwrapResult(res);

    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <h1 className="text-center">Add new vehicle</h1>
      <AddVehicleForm error={error} onAdd={onAdd} />
    </div>
  );
}
