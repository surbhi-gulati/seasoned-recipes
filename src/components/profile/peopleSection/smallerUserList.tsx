import React from "react";
import UserType from "../../../modules/userType";
import SmallerUserCard from "./smallerUserCard";

const SmallerUserList = ({users}) => {
  return (
      <div className="card-deck row">
        {
          users.map((group : UserType) => {
            return (
                <SmallerUserCard key={group._id} {...group}></SmallerUserCard>
            );
          })
        }
      </div>
  );
};

export default SmallerUserList;