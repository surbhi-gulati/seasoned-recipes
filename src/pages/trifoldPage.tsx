import React from "react";
import {useParams} from "react-router";
import { Outlet } from "react-router";
import NavigationSidebar from "../components/trifold/navigationSidebar";
import GroupSuggestionsSidebar from "../components/trifold/groupSuggestionsSidebar";

function TrifoldPage() {
    const { path } = useParams();
    return (
        <div className="row mt-2">
            <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                <NavigationSidebar active={ path || 'find' }/>
            </div>
            <div className="col-10 col-md-10 col-lg-7 col-xl-6"
                style={{"position": "relative"}}>
                <Outlet />
            </div>
            <div className="d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
                <GroupSuggestionsSidebar/>
            </div>
        </div>
  );
}

export default TrifoldPage;
