import React, { useEffect } from "react";
import {createFollow, unfollow} from "../../services/follows-services";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({authenticated, isFollowing, user}) => {
    const isSelf = authenticated && user && authenticated._id === user._id;
    const navigate = useNavigate();

    const handleFollow = async () => {
        try {
            await createFollow(authenticated._id, user._id);
            navigate(`/profile/${user._id}`);
        } catch (e) {
            alert(e);
        }
    };

    const handleUnfollow = async () => {

      try {
        const deletedFollow = await unfollow(authenticated._id, user._id);
        console.log(deletedFollow);
        navigate(`/profile/${user._id}`);
      } catch (e) {
        alert(e);
      }
    }

    return (
        <div className="row">
          <div className="col-8 row float-start">
            <img
                className="rounded-circle col-4 float-start" height={60} width={60}
                src={user.avatar}
                alt={user.avatar}
                key={user.avatar}
            />
            <p className="col-8 display-4 text-success"> {user && user.username} </p>
          </div>
          <div className="col-4 float-end">
            {!isSelf && authenticated && !isFollowing &&
                <button type="button"
                        className="btn btn-sm btn-primary float-end"
                        onClick={() => handleFollow()}>
                  Follow </button>}

            {!isSelf && authenticated && isFollowing &&
                <button type="button"
                        className="btn btn-sm btn-secondary float-end"
                        onClick={() => handleUnfollow()}> Unfollow </button>}
          </div>
        </div>
    );
};

export default ProfileHeader;
