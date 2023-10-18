import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

function TableNav() {
  return (
    <div>
      <header className="navbar justify-content-center navbar-light bg-light">
        <h3 className="h3 text-muted start-0 mb-3" style={{ margin: "10px" }}>
          Select Table View
        </h3>
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <nav className="nav end-0">
            <NavLink
              to="/"
              type="button"
              className="nav-item"
              style={{ margin: "10px" }}
            >
              All Orders
            </NavLink>
            <NavLink
              to="/not-arrived"
              type="button"
              className="nav-item"
              style={{ margin: "10px" }}
            >
              Not Arrived
            </NavLink>
            <NavLink
              to="/not-scheduled"
              type="button"
              className="nav-item"
              style={{ margin: "10px" }}
            >
              Not Scheduled
            </NavLink>
            <NavLink
              to="/not-delivered"
              type="button"
              className="nav-item"
              style={{ margin: "10px" }}
            >
              Not Delivered
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default TableNav;
