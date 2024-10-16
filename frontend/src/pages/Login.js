import React from "react";
import SignUpForm from "../components/SignUp";
import SignInForm from "../components/SignIn";
import "../styles/Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Header />
      <div className="Container">
        <div className="SignForm">
          <SignUpForm />
          <SignInForm />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
