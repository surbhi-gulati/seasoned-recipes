import React from "react";

const PersonalInfo = ({user}) => {    
    return (
        <>
            <h2> Personal Details </h2>
            <div className="d-flex ">
                <i className="bi bi-lock me-2"></i>
                <p>This section is only visible to you.</p>
            </div>
            <p> Name: {user.name} </p>
            <p> Email: {user.email} </p>
            <p> Phone: {user.phone} </p>
        </>
    );
};

export default PersonalInfo;
