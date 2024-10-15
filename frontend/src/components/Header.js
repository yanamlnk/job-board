import React, { useState, useEffect }  from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../resources/Icon.png'
import '../styles/Header.css'

const Header = (props) => {

  //default value is false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <header>
      <div className="red-line"></div>
      <div className="logo_container"><img src={Logo} alt='Logo'></img></div>
      <nav className={`navigation-buttons ${isLoggedIn ? "logged-in" : "logged-out"}`}>
      {isLoggedIn ? (
          <>
            <span>Hello, {props.name}!</span>
            <div>
              <button>My Cabinet</button>
              <button onClick={handleLogout}>Log Out</button>
            </div>
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