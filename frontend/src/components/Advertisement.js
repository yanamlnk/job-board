import React from "react";
import "../styles/Advertisement.css";
import {useState} from "react";
import Application from "./Application";

function Advertisement(props) {

  const [showDescription, setShowDescription] = useState(false);
  const [showApplication, setShowApplication] = useState(false);

  const toggleShowDescription = () => {
    setShowDescription(!showDescription);
  }
  
  const toggleElements = () => {
    setShowDescription(!showDescription);
    setShowApplication(!showApplication)
  }

  const closeEverything = () => {
    setShowDescription(false);
    setShowApplication(false);
  }

  return (
    <>
      <div className={"advertisement"}>
        <h2>
          {props.contract} {props.contract.length > 8 ? "" : "offer"}
        </h2>
        <br />
        Company in <b>{props.location}</b> called <b>{props.companyName}</b> is
        looking for {props.title}
        <br />
        <div>{showDescription || showApplication? <button onClick = {closeEverything}>Close</button> : <button onClick = {toggleShowDescription}>Learn More</button>}</div>
        {showDescription && (<><p>{props.description}</p><button onClick={toggleElements}>Apply</button></>)}
        {showApplication && (<><Application userData = {props.userData}/><button onClick={toggleElements}>Return</button></>)}
      </div>
    </>
  );
}
export default Advertisement;
