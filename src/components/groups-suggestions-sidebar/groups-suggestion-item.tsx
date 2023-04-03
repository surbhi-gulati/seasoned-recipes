import React from "react";

const GroupSuggestionItem = ({
    group = { groupName: 'Group', groupImage: 'group.png' }
}) => {
    return (
        <span>
            <img className="rounded-circle" height={48} 
                src={`/data/groups/images/${group.groupImage}`}
                alt={group.groupName}
            />
            <p> {group.groupName} </p>
        </span>
    );
};

export default GroupSuggestionItem;
