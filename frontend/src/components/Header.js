import React from 'react'
import Logo from '../resources/Icon.png'
import '../styles/Header_module.css'

const Header = () => {
  return (
    <header>
      <img src={Logo} alt='Logo'></img>
      <div className="navigation-buttons">
        <button><span className="material-symbols-outlined">person</span></button>
        <button><span className="material-symbols-outlined">logout</span></button>
      </div>
    </header>
  )
}

export default Header