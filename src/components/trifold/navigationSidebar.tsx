import React from "react";
import {Link} from "react-router-dom";

const NavigationSidebar = ({active = 'feed'}) => {
  return (
    <div className="list-group mb-1">
      <Link 
        to="/feed" 
        className={`list-group-item ${active === 'feed' ? 'active' : ''}`}>
        <i className="bi bi-newspaper"></i> Feed
      </Link>
      <Link 
        to="/groups" 
        className={`list-group-item ${active === 'groups' ? 'active' : ''}`}>
        <i className="bi bi-people"></i> Groups
      </Link>
      <Link 
        to="/search" 
        className={`list-group-item ${active === 'search' ? 'active' : ''}`}>
        <i className="bi bi-search"></i> Search Recipes
      </Link>
      <Link 
        to="/bookmarks" 
        className={`list-group-item ${active === 'bookmarks' ? 'active' : ''}`}>
        <i className="bi bi-bookmarks"></i> Bookmarks
      </Link>
      <Link 
        to="/profile" 
        className={`list-group-item ${active === 'profile' ? 'active' : ''}`}>
        <i className="bi bi-person"></i> Profile
      </Link>
    </div>
  );
};

export default NavigationSidebar;
