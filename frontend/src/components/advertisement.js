import React from "react";
import "../styles/Advertisement.css";

function Advertisement(props) {
  return (
    <>
      <div className={"advertisement"}>
      <h2>{props.contract} {props.contract.length > 8 ? "" : "offer"}</h2><br />
      Company in <b>{props.location}</b> called <b>{props.companyName}</b> is looking for {props.title}
      <button>Learn More</button>
      </div>
    </>
  );
}
export default Advertisement;
