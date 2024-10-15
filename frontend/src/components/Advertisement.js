import React from "react";
import "../styles/Advertisement.css";
import {useState} from "react";
import Application from "./Application";
import choice from '../resources/choice.png'

function Advertisement(props) {

  const [showDescription, setShowDescription] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleShowDescription = () => {
    setShowDescription(!showDescription);
    setIsActive(true);
  }
  
  const toggleElements = () => {
    setShowDescription(!showDescription);
    setShowApplication(!showApplication)
  }

  const closeEverything = () => {
    setShowDescription(false);
    setShowApplication(false);
    setIsActive(false);
  }

  return (
    <div className = "paperBackground">
      <div className="advertisement">
        <h2>
          {props.contract} {props.contract.length > 8 ? "" : "offer"}
        </h2>
        {/* {isActive && <div className = "image-container"><img src={choice} alt="This one marker" /></div>} */}
        <span>Company in {props.location} called {props.companyName} is
        looking for <b className={isActive? "title" : ""}>{props.title}</b>.</span>

        <div style={{ flexGrow: 1 }} />

        <div className="button-container">{showDescription || showApplication? <button onClick = {closeEverything}>Close</button> : <button onClick = {toggleShowDescription}>Learn More</button>}</div>
        {showDescription && (<div className="description"><p>{props.description}</p><button onClick={toggleElements}>Apply</button></div>)}
        {showApplication && (<div className = "description"><Application userData = {props.userData} adID = {props.adID}/><button onClick={toggleElements}>Return</button></div>)}
      </div>
    </div>
  );
}
export default Advertisement;
