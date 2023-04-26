import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";

const NavigationSidebar = ({ active }) => {

  const {currentUser} = useSelector((state: any) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      // Redirect to the Feed page when the component mounts and the path is "/"
      window.location.href = "/feed";
    }
  }, [location.pathname]);

  return (
      <div>
        <h4 className="bi bi-egg"><span className="ms-2">Seasoned Recipes</span></h4>
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
        {!currentUser && <Link to="/login" className="float-end">Login</Link>}
      </div>
  );
};

export default NavigationSidebar;
