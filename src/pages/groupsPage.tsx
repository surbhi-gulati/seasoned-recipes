import React from "react";

import groups from "../data/groups/groups";
import Group from "../modules/groupType";
import GroupPage from "./groupPage";

const GroupsPage = () => {
    return (
        <div className="card-deck row mx-5">
            {
              groups.map((group : Group) => {
                return (
                <GroupPage {...group}></GroupPage>                
                );
              })
            }
        </div>
    );
};

export default GroupsPage;