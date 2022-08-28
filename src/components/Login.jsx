import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvier";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";

const Login = () => {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => alert(err.messaage));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          alt=""
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
        />
        <div className="login__text">
          <h1>Sign In to App</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
};

export default Login;
