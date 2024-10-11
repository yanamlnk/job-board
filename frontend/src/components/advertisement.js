import React from "react";
import "../styles/Advertisement_Module.css";

function Advertisement(props) {
  return (
    <>
      <div className={"advertisement"}>
        <p>{props.companyName}</p>
        <div className={"container_title_button"}>
          <h1>{props.title}</h1>
          <button>Learn More</button>
        </div>
        <div className={"container_contract_location"}>
          <p>{props.contract}</p>
          <p>{props.location}</p>
        </div>
      </div>
    </>
  );
}
export default Advertisement;
