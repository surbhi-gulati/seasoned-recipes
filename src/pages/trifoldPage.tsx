import React from "react";
import { useParams } from "react-router";
import { Outlet } from "react-router";
import NavigationSidebar from "../components/trifold/navigationSidebar";
import GroupSuggestionsSidebar from "../components/trifold/groupSuggestionsSidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function TrifoldPage() {
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const { path } = useParams();

  return (
    <>
      {!currentUser && <Link to="/login">Login</Link>}
      <div className="row mt-2">
        <div className="col-sm-12 col-md-4 col-lg-3 col-xl-2 mb-3 mb-md-0">
          <NavigationSidebar active={path || "find"} />
        </div>
        <div className="col-sm-12 col-md-8 col-lg-6 col-xl-6">
          <Outlet />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-3 col-xl-4">
          <GroupSuggestionsSidebar />
        </div>
      </div>
    </>
  );
}

export default TrifoldPage;
