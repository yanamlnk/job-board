import React, { useState, useEffect }  from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../resources/Icon.png'
import '../styles/Header.css'

const Header = () => {

  //default value is false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //uncomment this instead of simulation
  // useEffect(() => {
  //   const token = localStorage.getItem('userToken');
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  const navigate = useNavigate();

  //Just to simulate togling of token - UNCOMMENT IT AFTERWARDS!!!!
  const handleLogin = () => {
    setIsLoggedIn(true); // Simulate a user logging in
    // navigate('/login');
  };

  const handleLogout = () => {
    //localStorage.removeItem('userToken');
    setIsLoggedIn(false); // Simulate a user logging out
    window.location.reload();
  };

  return (
    <header>
      <img src={Logo} alt='Logo'></img>
      <nav className="navigation-buttons">
      {isLoggedIn ? (
          <>
            <button>My Cabinet</button>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={handleLogin}>Log In</button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header