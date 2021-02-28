import React from "react";
import { Link } from "react-router-dom";

export default function Pagination({ page, hasNext, hasPrevious }) {
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <Link className={`page-link ${!hasPrevious && "btn disabled"}`} to={`/?page=${page - 1}`}>
            Previous Page
          </Link>
        </li>
        <li className="page-item">
          <Link className={`page-link  ${!hasNext && "btn disabled"}`} to={`/?page=${page + 1}`}>
            Next Page
          </Link>
        </li>
      </ul>
    </nav>
  );
}
