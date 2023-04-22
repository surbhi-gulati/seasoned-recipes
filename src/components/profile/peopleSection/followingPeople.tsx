import React from "react";
import UserType from "../../../modules/userType";
import UserCard from "./userCard";
import users from "../../../data/users/usersData";

const FollowingPeople = ({ user }) => {  
    return (
        <>
            <h2> Who {user.username} follows </h2>
            <div className="d-flex ">
                <i className="bi bi-lock me-2"></i>
                <p>This section is only visible to you.</p>
            </div>
            {
                users.map((user : UserType) => {
                return (
                <UserCard key={user._id} {...user} />
                );
            })}
        </>
    );
};

export default FollowingPeople;
