import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationSidebar = ({ active }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      // Redirect to the Feed page when the component mounts and the path is "/"
      window.location.href = "/feed";
    }
  }, [location.pathname]);

  return (
    <div className="list-group mb-1">
      <Link
        to="/feed"
        className={`list-group-item ${active === "feed" ? "active" : ""}`}
      >
        Feed
      </Link>
      <Link
        to="/groups"
        className={`list-group-item ${active === "groups" ? "active" : ""}`}
      >
        Groups
      </Link>
      <Link
        to="/search"
        className={`list-group-item ${active === "search" ? "active" : ""}`}
      >
        Search Recipes
      </Link>
      <Link
        to="/bookmarks"
        className={`list-group-item ${
          active === "bookmarks" ? "active" : ""
        }`}
      >
        Bookmarks
      </Link>
      <Link
        to="/profile"
        className={`list-group-item ${active === "profile" ? "active" : ""}`}
      >
        Profile
      </Link>
    </div>
  );
};

export default NavigationSidebar;
