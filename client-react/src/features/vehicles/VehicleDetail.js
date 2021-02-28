import React from "react";
import { useDispatch } from "react-redux";

import DeleteButton from "./DeleteButton";

import { removeVehicle } from "./vehiclesSlice";

export default function VehicleDetail(vehicle) {
  const dispatch = useDispatch();

  const { id, make, model, year } = vehicle;

  return (
    <tr key={id}>
      <td>{make}</td>
      <td>{model}</td>
      <td>{year}</td>
      <td>
        <DeleteButton handleRemove={() => dispatch(removeVehicle({ id }))} />
      </td>
    </tr>
  );
}
