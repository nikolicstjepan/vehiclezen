import React from "react";
import { Link } from "react-router-dom";

export default function SearchBar({ filter, handleFilterChange }) {
  const { type, term } = filter;

  return (
    <div className="row justify-content-between mb-3">
      <div className="col-auto">
        <Link className="btn btn-primary mx-auto" to="/new">
          Add new
        </Link>
      </div>
      <div className="col-auto">
        <div className="row justify-content-end g-2">
          <div className="col-auto">
            <input
              type="text"
              name="term"
              value={term}
              placeholder="Search..."
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-auto">
            <select className="form-select" onChange={handleFilterChange} name="type" value={type}>
              <option value="make">Make</option>
              <option value="model">Model</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
