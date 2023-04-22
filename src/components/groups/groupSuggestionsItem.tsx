import React from "react";
import GroupType from "../../modules/groupType";
import {Link} from "react-router-dom";

const GroupSuggestionsItem = (group: GroupType) => {
    return (
        <Link to={`/group/${group._id}`} style={{color: 'black', textDecoration: 'none' }}>
            <span className={"list-group-item"}>
              <img
                  className="rounded-circle" height={48} width={48}
                  src={`${group.image}`}
                  alt={group.name}
                  key={group.name}
              />
            <span> {group.name} </span>
        </span>
        </Link>

    );
};

export default GroupSuggestionsItem;
