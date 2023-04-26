import React from "react";
import { useNavigate } from "react-router";

const LoginPrompt = ({promptText}) => {

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  }

    return (
      <div>
        <h2> {promptText} </h2>
        <button onClick={() => handleLoginRedirect()} className="btn btn-lg btn-primary rounded">Login</button>
      </div>
    );
};

export default LoginPrompt;
