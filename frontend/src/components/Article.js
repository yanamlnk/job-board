import React from "react";
import "../styles/Article_Module.css";

function Article() {
  // Fonction pour gérer le clic et tester la connexion avec le backend
  const handleLearnMoreClick = () => {
    fetch("http://localhost:3001/api/test") // Remplace l'URL par celle de ton backend
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }
        return response.json(); // Convertir la réponse en JSON
      })
      .then((data) => {
        console.log(data.message); // Afficher le message du backend
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion au backend:", error);
      });
  };

  return (
    <>
      <div className={"article"}>
        <p>company</p>
        <div className={"container_title_button"}>
          <h1>Title</h1>
          <button onClick={handleLearnMoreClick}>Learn More</button>
        </div>
        <div className={"container_contract_location"}>
          <p>contract</p>
          <p>location</p>
        </div>
      </div>
    </>
  );
}
export default Article;
