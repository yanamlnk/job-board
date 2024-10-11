import React from "react";
import SignUpForm from "../components/SignUp";
import SignInForm from "../components/SignIn";
import "../styles/Login.css";
function Login() {
  return (
    <div className="Container">
      <SignUpForm />
      <SignInForm />
    </div>
  );
}

export default Login;
