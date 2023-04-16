import React from "react";
import GroupType from "../../modules/groupType";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

const GroupCard = (props: GroupType) => {
  const {currentUser} = useSelector((state: any) => state.auth);

    return (
    <div className="card my-3">
      <div className="my-2"> 
        <img 
          className="card-img mt-2" 
          src={`${props.image}`} 
          alt={props.name} />
      </div>
      <div className="row">
        <div className="card-body col-9">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <div className="float-end col-2" >
          { currentUser == null ? <Link to="#"className="btn btn-lg btn-primary mt-4 rounded-pill">Join</Link> : <p></p>}
        </div>
      </div>
    </div>
    );
};


export default GroupCard;