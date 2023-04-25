import React from "react";
import { Link } from "react-router-dom";

const NavigationSidebar = ({ active = "feed" }) => {
  return (
    <div className="list-group mb-1 d-flex flex-wrap">
      <div className="d-flex justify-content-between flex-wrap">
        <Link
          to="/feed"
          className={`list-group-item list-group-item-action ${
            active === "feed" ? "active" : ""
          }`}
        >
          <i className="bi bi-newspaper"></i>
          <span className="ms-2 d-none d-md-inline">Feed</span>
        </Link>
        <Link
          to="/groups"
          className={`list-group-item list-group-item-action ${
            active === "groups" ? "active" : ""
          }`}
        >
          <i className="bi bi-people"></i>
          <span className="ms-2 d-none d-md-inline">Groups</span>
        </Link>
        <Link
          to="/search"
          className={`list-group-item list-group-item-action ${
            active === "search" ? "active" : ""
          }`}
        >
          <i className="bi bi-search"></i>
          <span className="ms-2 d-none d-md-inline">Search Recipes</span>
        </Link>
        <Link
          to="/bookmarks"
          className={`list-group-item list-group-item-action ${
            active === "bookmarks" ? "active" : ""
          }`}
        >
          <i className="bi bi-bookmarks"></i>
          <span className="ms-2 d-none d-md-inline">Bookmarks</span>
        </Link>
        <Link
          to="/profile"
          className={`list-group-item list-group-item-action ${
            active === "profile" ? "active" : ""
          }`}
        >
          <i className="bi bi-person"></i>
          <span className="ms-2 d-none d-md-inline">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationSidebar;
