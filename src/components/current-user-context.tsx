import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileThunk } from "../services/auth-thunks";
function CurrentUserContext({ children }) {
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(profileThunk());
  }, []);
  return children;
}

export default CurrentUserContext;