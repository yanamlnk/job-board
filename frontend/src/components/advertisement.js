import React from "react";
import "../styles/Advertisement_Module.css";

function Advertisement(props) {
  const handleLearnMoreClick = () => {
    fetch("http://localhost:3001/api/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion au backend:", error);
      });
  };

  return (
    <>
      <div className={"advertisement"}>
        <p>{props.companyName}</p>
        <div className={"container_title_button"}>
          <h1>{props.title}</h1>
          <button onClick={handleLearnMoreClick}>Learn More</button>
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
