import React from "react";
import { Outlet, Link } from "react-router-dom";

import "../styles/section.css";
const Section = () => {
  return (
    <>
      <div className="main1">
        <div className="sidebar">
          <ul className="sidebar-nav">
            <Link className="sidebar-li" to="/home">
              <i className="bi bi-house-door"></i>Home
              <i class="bi1 bi-caret-right-fill"></i>
            </Link>
            <Link className="sidebar-li" to="/role">
              <i className="bi bi-clipboard-data-fill"></i>Roles{" "}
              <i class="bi1 bi-caret-right-fill"></i>
            </Link>
            <Link className="sidebar-li" to="/user">
              <i className="bi bi-person-circle"></i>Users{" "}
              <i class="bi1 bi-caret-right-fill"></i>
            </Link>
          </ul>
        </div>
        <div className="container1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Section;
