import React from "react";
import UserType from "../../../modules/userType";
import {Link} from "react-router-dom";

const UserCard = (user: UserType) => {
    return (
        <Link to={`/profile/${user._id}`} style={{color: 'black', textDecoration: 'none' }}>
        <span className={"list-group-item"}>
            <img 
                className="rounded-circle" height={48} width={48}
                src={`${user.avatar}`}
                alt={user.username}
                key={user.username}
            />
            <span> {user.username} </span>
        </span>
        </Link>
    );
};

export default UserCard;
