import React from 'react';

export const NavSellerOrder = ({ statusFilter, setStatusFilter }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li
            className={`nav-item ${
              statusFilter === 0 ? 'btn btn-outline-success' : ''
            }`}
          >
            <a
              className="nav-link"
              onClick={() => {
                setStatusFilter(0);
              }}
            >
              All
            </a>
          </li>
          <li
            className={`nav-item  ${
              statusFilter === 1 ? 'btn btn-outline-success' : ''
            } `}
          >
            <a
              className="nav-link"
              onClick={() => {
                setStatusFilter(1);
              }}
            >
              Wait
            </a>
          </li>
          <li
            className={`nav-item  ${
              statusFilter === 2 ? 'btn btn-outline-success' : ''
            }`}
          >
            <a
              className="nav-link"
              onClick={() => {
                setStatusFilter(2);
              }}
              href="#"
            >
              Store Accepted
            </a>
          </li>
          <li
            className={`nav-item ${
              statusFilter === 3 ? 'btn btn-outline-success' : ''
            }`}
          >
            <a
              className="nav-link"
              onClick={() => {
                setStatusFilter(3);
              }}
              href="#"
            >
              Preparing
            </a>
          </li>
          <li
            className={`nav-item ${
              statusFilter === 4 ? 'btn btn-outline-success' : ''
            }`}
          >
            <a
              className="nav-link"
              onClick={() => {
                setStatusFilter(4);
              }}
              href="#"
            >
              Delivering
            </a>
          </li>
          <li
            className={`nav-item ${
              statusFilter === 5 ? 'btn btn-outline-success' : ''
            }`}
          >
            <a
              className="nav-link"
              onClick={() => {
                setStatusFilter(5);
              }}
              href="#"
            >
              Delivered
            </a>
          </li>
          <li
            className={`nav-item ${
              statusFilter === 6 ? 'btn btn-outline-success' : ''
            }`}
          >
            <a
              className="nav-link"
              onClick={() => {
                setStatusFilter(6);
              }}
              href="#"
            >
              Cancel
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
