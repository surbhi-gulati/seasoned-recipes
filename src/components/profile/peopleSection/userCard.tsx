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


// <li className="list-group-item">
//     <div className="row">
//         <div className="col-2">
//             <img className="rounded-circle" height={48} src={`/images/${who.avatarIcon}`}/>
//         </div>
//         <div className="col-8">
//             <div className="fw-bold wd-bold-text small">{who.userName}<i
//                 className="fa fa-check-circle"></i></div>
//             <div className = "small">@{who.handle}</div>
//         </div>
//         <div className="col-2">
//             <button className="btn btn-primary rounded-pill float-end">Follow</button>
//         </div>
//     </div>
// </li>