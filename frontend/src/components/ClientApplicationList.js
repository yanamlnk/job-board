import React, { useEffect, useState } from "react";

function ClientApplicationList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      fetch("http://localhost:3001/api/application/clientApplications", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setApplications(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des candidatures :", error);
        });
    }
  }, []);

  return (
    <div>
      <h1>Mes Candidatures</h1>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            <h2>{application.title}</h2>
            <p>Entreprise: {application.companyName}</p>
            <p>Localisation: {application.location}</p>
            <p>Motivation: {application.motivation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientApplicationList;
