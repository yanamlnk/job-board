import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import SignUpForm from "../components/SignUp";
import SignInForm from "../components/SignIn";
import "../styles/Login.css";

function Login() {
  const location = useLocation();
  const [logInActive, setLogInActive] = useState(false);

  useEffect(() => {
    const mode = location.state?.mode;
    if (mode === 'login') {
      setLogInActive(true);
    } else if (mode === 'signup') {
      setLogInActive(false);
    }
  }, [location]);

  const handleLogInActive = (value) => {
    setLogInActive(value);
  }

  return (
    <div className="container">
      <button onClick={() => handleLogInActive(true)}>Log In</button>
      <button onClick={() => handleLogInActive(false)}>Sign Up</button>
      {logInActive ? <SignInForm handleLogInActive={handleLogInActive}/> : <SignUpForm handleLogInActive={handleLogInActive}/>}
    </div>
  );
}

export default Login;
