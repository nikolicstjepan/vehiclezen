import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import VehiclesListTable from "./VehiclesListTable";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ErrorAlert from "../../components/ErrorAlert";

import usePage from "./usePage";
import { throttle } from "../../lib/utils";
import history from "../../history";

import {
  fetchVehicles,
  selectVehiclesStatus,
  selectAllVehicles,
  selectVehiclesError,
} from "./vehiclesSlice";

export default function VehiclesListPage() {
  const status = useSelector(selectVehiclesStatus);
  const vehicles = useSelector(selectAllVehicles);
  const error = useSelector(selectVehiclesError);
  const dispatch = useDispatch();

  const page = usePage("page");
  const hasPrevious = page > 1;
  const hasNext = vehicles.length >= 10;

  const loading = status !== "succeeded";
  const [filter, setFilter] = useState({ type: "make", term: "" });
  const { type, term } = filter;

  const throttledSearch = useCallback(
    throttle(({ term, type, page }) => {
      dispatch(fetchVehicles({ term, type, page }));
    }, 200),
    [dispatch]
  );

  useEffect(() => {
    throttledSearch({ page, type, term });
  }, [page, type, term, throttledSearch]);

  const handleFilterChange = ({ target }) => {
    if (page !== 1) {
      history.push("/");
    }

    const { name, value } = target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div>
      <div className="text-center">
        <h1>Vehicles List</h1>
      </div>
      <div className="py-5">
        <ErrorAlert error={error} />
        <SearchBar setFilter={setFilter} filter={filter} handleFilterChange={handleFilterChange} />
        <VehiclesListTable vehicles={vehicles} loading={loading} />
      </div>
      <Pagination hasNext={hasNext} hasPrevious={hasPrevious} page={page} />
    </div>
  );
}
