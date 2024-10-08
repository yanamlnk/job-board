import React from 'react'
import Logo from '../resources/Icon.png'
import '../styles/Header_module.css'
import Person from '../resources/personal_space.png'
import Logout from '../resources/logout.png'

const Header = () => {
  return (
    <header>
      <img src={Logo} alt='Logo'></img>
      <button><img src = {Person} alt = "person icon"></img></button>
      <button><img src = {Logout} alt = "logout icon"></img></button>
    </header>
  )
}

export default Header