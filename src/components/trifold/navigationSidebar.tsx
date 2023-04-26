import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

const NavigationSidebar = ({ active = "feed" }) => {
  const {currentUser} = useSelector((state: any) => state.auth);
  return (
    <div className="list-group mb-1 d-flex flex-wrap">
      <h4 className="bi bi-egg"><span className="ms-2">Seasoned Recipes</span></h4>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <Link
          to="/feed"
          className={`list-group-item list-group-item-action ${
            active === "feed" ? "active" : ""
          }`}
        >
          <i className="bi bi-newspaper"></i>
          <span className="ms-2">Feed</span>
        </Link>
        <Link
          to="/groups"
          className={`list-group-item list-group-item-action ${
            active === "groups" ? "active" : ""
          }`}
        >
          <i className="bi bi-people"></i>
          <span className="ms-2">Groups</span>
        </Link>
        <Link
          to="/search"
          className={`list-group-item list-group-item-action ${
            active === "search" ? "active" : ""
          }`}
        >
          <i className="bi bi-search"></i>
          <span className="ms-2">Search Recipes</span>
        </Link>
        <Link
          to="/bookmarks"
          className={`list-group-item list-group-item-action ${
            active === "bookmarks" ? "active" : ""
          }`}
        >
          <i className="bi bi-bookmarks"></i>
          <span className="ms-2">Bookmarks</span>
        </Link>
        <Link
          to="/profile"
          className={`list-group-item list-group-item-action ${
            active === "profile" ? "active" : ""
          }`}
        >
          <i className="bi bi-person"></i>
          <span className="ms-2">Profile</span>
        </Link>
      </div>
      {!currentUser && <Link to="/login">Login</Link>}
      <style>
        {`
          @media (max-width: 576px) {
            .list-group-item {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              text-align: center;
              width: 20%;
              padding: 8px 0;
            }
            .list-group-item i {
              margin-right: 5px;
              margin-bottom: 0;
            }
            .list-group-item span {
              display: none;
            }
            .d-flex.flex-row.flex-wrap.justify-content-between {
              flex-direction: row;
            }
          }
        `}
      </style>
    </div>
  );
};

export default NavigationSidebar;
