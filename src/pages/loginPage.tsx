import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, registerThunk } from "../services/auth-thunks";
import { Link } from "react-router-dom";

function LoginPage() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {error} = useSelector((state: any) => state.auth);

  // HANDLES LOGGING IN FOR USERS THAT ALREADY EXIST
  const handleLogin = async () => {
    try {
      const {payload} = await dispatch(loginThunk({ 
        username: loginUsername, 
        password: loginPassword 
      }));
      console.log(payload);
      if(payload) {
        navigate("/profile");
      } else {
        alert(`Incorrect password for username: ${loginUsername}`);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={"container"}>
      {/* FORM FOR LOGGING IN USERS */}
      <h1>Login to Seasoned Recipes</h1>
      <div>
        <Link to="/register">
          Don't have an account? Register here.
        </Link>
      </div> 
      <br/>
      <div>
        <label>Username</label>
        <input className="form-control"
        type="text" value={loginUsername}
        onChange={(event) => setLoginUsername(event.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input className="form-control"
          type="password" value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        />
      </div>
      <button className={"btn btn-primary my-2 rounded"} onClick={handleLogin}>
        Login
      </button> 
      <br/>
      <br/>
      <div>
        <Link to="/feed">Or, Continue as Guest</Link>
      </div>
    </div>
  );
}
export default LoginPage;