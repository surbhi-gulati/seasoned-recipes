import React from "react";
import groups from "../../data/groups/groupsData"
import GroupType from "../../modules/groupType";
import GroupCard from "./groupCard";

const GroupsList = () => {
  return (
      <div className="card-deck row mx-5">
        {
          groups.map((group : GroupType) => {
            return (
              <GroupCard key={group._id} {...group}></GroupCard>                
            );
          })
        }
      </div>
  );
};

export default GroupsList;