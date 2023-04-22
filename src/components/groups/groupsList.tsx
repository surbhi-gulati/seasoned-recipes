import React from "react";
import GroupType from "../../modules/groupType";
import GroupCard from "./groupCard";
import {getAllGroups} from "../../services/group-services";

const GroupsList = () => {
  const [groups, setGroups] = React.useState([]);
  React.useEffect(() => {
    const fetchGroups = async () => {
      const allGroups = await getAllGroups();
      setGroups(allGroups);
    }
    fetchGroups();
  }, []);
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