import React from "react";
import UserType from "../../../modules/userType";
import {Link} from "react-router-dom";

const UserCard = (user: UserType) => {
    return (
        <Link to={`/profile/${user._id}`} style={{color: 'black', textDecoration: 'none' }}>
        <div className="row">
            <div className="col-1">
                <img
                    className="rounded-circle" height={48} width={48}
                    src={`${user.avatar}`}
                    alt={user.username}
                    key={user.username}
                />
            </div>
            <div className="col-auto float-start">
                <div>{user.firstName}</div>
                <div className = "small">@{user.username}</div>
            </div>
        </div>
        </Link>
    );
};

export default UserCard;
