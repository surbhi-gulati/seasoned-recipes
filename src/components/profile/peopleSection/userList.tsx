import React from "react";
import UserType from "../../../modules/userType";
import UserCard from "./userCard";

const UserList = ({users}) => {
  return (
      <div className="card-deck row mx-5">
        {
          users.map((group : UserType) => {
            return (
                <UserCard key={group._id} {...group}></UserCard>
            );
          })
        }
      </div>
  );
};

export default UserList;