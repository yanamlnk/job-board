import React from "react";
import SignUpForm from "../components/SignUp";
import SignInForm from "../components/SignIn";
import ClientEdit from "../components/ClientEdit";
import "../styles/Login.css";

function Login() {
  return (
    <div className="Container">
      <div className="SignForm">
        <SignUpForm />
        <SignInForm />
      </div>
      <div className="SignForm">
        <div>
          <p></p>
        </div>
        <ClientEdit />
      </div>
    </div>
  );
}

export default Login;
