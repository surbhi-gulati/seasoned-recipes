import React from "react";
import GroupType from "../../modules/groupType";
import { Link } from "react-router-dom";

const GroupCard = (props: GroupType) => {    
    return (
    <div className="card my-3">
      <div className="my-2"> 
        <img 
          className="card-img mt-2" 
          src={require(`../../data/groups/${props.image}`)} 
          alt={props.name} />
      </div>
      <div className="row">
        <div className="card-body col-9 float">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <div className="float-end col-2" >
          <Link to="#"className="btn btn-lg btn-primary mt-4 rounded-pill">Join</Link>
        </div>
      </div>
    </div>
    );
};


export default GroupCard;