import React, {useEffect, useState} from "react";
import {createFollow, unfollow} from "../../services/follows-services";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({authenticated, isFollowing, user}) => {
    const isSelf = authenticated && user && authenticated._id === user._id;
    const navigate = useNavigate();

  const [isFollowingThisUser, setIsFollowingThisUser] = useState(isFollowing);

    const handleFollow = async () => {
        try {
            await createFollow(authenticated._id, user._id);
            navigate(`/profile/${user._id}`);
            setIsFollowingThisUser(true);
        } catch (e) {
            alert(e);
        }
    };

    const handleUnfollow = async () => {
      try {
        const deletedFollow = await unfollow(authenticated._id, user._id);
        navigate(`/profile/${user._id}`);
        setIsFollowingThisUser(false);
      } catch (e) {
        alert(e);
      }
    }

  useEffect(() => {
    setIsFollowingThisUser(isFollowing);
  }, isFollowing);

    return (
        <div className="row">
          <div className="col-6 row float-start">
            <img
                className="rounded-circle col-4 float-start"
                src={user.avatar}
                alt={user.avatar}
                key={user.avatar}
            />
            <h1 className="col-8 display-4 text-success"> {user && user.username} </h1>
          </div>
          <div className="col-6">
            {!isSelf && authenticated && !isFollowingThisUser &&
                <button type="button"
                        className="btn btn-sm btn-primary float-end"
                        onClick={() => handleFollow()}>
                  Follow </button>}

            {!isSelf && authenticated && isFollowingThisUser &&
                <button type="button"
                        className="btn btn-sm btn-secondary float-end"
                        onClick={() => handleUnfollow()}> Unfollow </button>}
          </div>
        </div>
    );
};

export default ProfileHeader;
