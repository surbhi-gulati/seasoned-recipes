import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, registerThunk } from "../services/auth-thunks";
import { current, isAsyncThunkAction, isRejected } from "@reduxjs/toolkit";
function LoginPage() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
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
      if(payload) {
        navigate("/profile");
      } else {
        alert(`Incorrect password for username: ${loginUsername}`);
      }
    } catch (e) {
      alert(e);
    }
  };

  // HANDLES REGISTERING NEW USERS
  const handleRegister = async () => {
    try {
      const {payload} = await dispatch(registerThunk({ 
        username: registerUsername, 
        password: registerPassword 
      }));
      if(payload) {
        navigate("/profile");
      } else {
        alert(`Username: ${registerUsername} already exists`);
      }
    } catch (e) {
      alert (e);
    }
  }

  return (
    <div className={"container"}>
      
      {/* FORM FOR REGISTERING USERS */}
      <h1>Register Screen</h1>
      <div>
        <label>Username</label>
        <input className="form-control"
        type="text" value={registerUsername}
        onChange={(event) => setRegisterUsername(event.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input className="form-control"
          type="password" value={registerPassword}
          onChange={(event) => setRegisterPassword(event.target.value)}
        />
      </div>
      <button onClick={handleRegister}>
        Register
      </button>
      <br/>

      {/* FORM FOR LOGGING IN USERS */}
      <h1>Login Screen</h1>
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
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
export default LoginPage;