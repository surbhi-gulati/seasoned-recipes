import React from "react";
import GroupSuggestionsItem from "../../groups/groupSuggestionsItem";
import GroupType from "../../../modules/groupType";
import {getGroupsByUserId} from "../../../services/group-members-services";

const FollowingGroups = ({user}) => {

  const [results, setResults] = React.useState<any>([]);
  React.useEffect(() => {
    const fetchResults = async () => {
      if (user) {
        const allGroupID = await getGroupsByUserId(user && user._id);
        setResults(allGroupID);
      }
    }
    fetchResults();
  });

    return (
        user ?
        <>
            <h2> Groups {user && user.username} follows </h2>
            <div className="list-group mb-1">
                {
                  results.map((group : GroupType) => {
                    return (
                        <GroupSuggestionsItem key={group._id} {...group} />                
                    );
                })}
            </div>
        </> : <p>User not logged in</p>
    );
};

export default FollowingGroups;
