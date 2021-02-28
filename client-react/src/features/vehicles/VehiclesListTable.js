import React from "react";

import VehicleDetail from "./VehicleDetail";

export default function VehiclesListTable({ vehicles, loading }) {
  const listVehicles = () =>
    loading ? (
      <Loading />
    ) : (
      vehicles.map((vehicle) => <VehicleDetail key={vehicle.id} {...vehicle} />)
    );

  if (vehicles.length === 0) {
    return <div className="text-center fw-bold">No vehicles</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th style={{ width: "200px" }} scope="col">
              Make
            </th>
            <th style={{ width: "350px" }} scope="col">
              Model
            </th>
            <th scope="col">Year</th>
            <th style={{ width: "100px" }} scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{listVehicles()}</tbody>
      </table>
    </div>
  );
}

function Loading() {
  return new Array(10).fill(true).map((_, i) => <tr key={i} style={{ height: "47px" }}></tr>);
}
