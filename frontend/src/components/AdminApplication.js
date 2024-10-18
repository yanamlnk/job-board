import React, { useState, useEffect } from "react";

function AdminApplication() {
  const [applications, setApplications] = useState([]);
  const [clients, setClients] = useState([]); // Liste des clients pour le menu déroulant
  const [advertisements, setAdvertisements] = useState([]); // Liste des annonces pour le menu déroulant
  const [editApplication, setEditApplication] = useState(null);
  const [newApplication, setNewApplication] = useState({
    clientId: "",
    advertisementId: "",
    motivation: "",
  });

  useEffect(() => {
    // Fetch toutes les applications
    fetch("http://localhost:3001/api/application/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) =>
        console.error("Erreur lors du fetch des candidatures:", err)
      );

    // Fetch les emails des clients pour le menu déroulant
    fetch("http://localhost:3001/api/client/emails")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) =>
        console.error("Erreur lors du fetch des emails des clients:", err)
      );

    // Fetch les titres des annonces pour le menu déroulant
    fetch("http://localhost:3001/api/advertisement/titles")
      .then((res) => res.json())
      .then((data) => setAdvertisements(data))
      .catch((err) =>
        console.error("Erreur lors du fetch des titres des annonces:", err)
      );
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/application/applications/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setApplications(applications.filter((app) => app.id !== id));
      })
      .catch((err) => console.error("Erreur lors de la suppression:", err));
  };

  const handleSubmit = (e) => {
    fetch("http://localhost:3001/api/application/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        setApplications([...applications, data]);
        setNewApplication({
          clientId: "",
          advertisementId: "",
          motivation: "",
        });
      })
      .catch((err) => console.error("Erreur lors de la création:", err));
  };

  const handleEdit = (application) => {
    setEditApplication(application); // Remplit le formulaire avec les données de l'application sélectionnée pour modification
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Envoyer la mise à jour au backend
    fetch(
      `http://localhost:3001/api/application/applications/${editApplication.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editApplication),
      }
    )
      .then((res) => res.json())
      .then(() => {
        setApplications(
          applications.map((app) =>
            app.id === editApplication.id ? editApplication : app
          )
        );
        setEditApplication(null);
      })
      .catch((err) => console.error("Erreur lors de la mise à jour:", err));
  };

  return (
    <div>
      <h2>Gestion des Candidatures</h2>
      <ul>
        {applications.map((application, i) => (
          <li key={i}>
            {application.clientName} - {application.adTitle} -{" "}
            {application.motivation}
            <button onClick={() => handleDelete(application.id)}>
              Supprimer
            </button>
            <button onClick={() => handleEdit(application)}>
              Modifier la motivation
            </button>
          </li>
        ))}
      </ul>

      {editApplication && (
        <form onSubmit={handleUpdate}>
          <h3>Modifier la candidature</h3>
          <div>
            <label>Client ID: {editApplication.clientId}</label>
          </div>
          <div>
            <label>Advertisement ID: {editApplication.advertisementId}</label>
          </div>
          <div>
            <label>Motivation:</label>
            <textarea
              value={editApplication.motivation}
              onChange={(e) =>
                setEditApplication({
                  ...editApplication,
                  motivation: e.target.value,
                })
              }
            />
          </div>
          <button type="submit">Sauvegarder les modifications</button>
        </form>
      )}

      <h3>Ajouter une nouvelle candidature</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client Email:</label>
          <select
            value={newApplication.clientId}
            onChange={(e) =>
              setNewApplication({ ...newApplication, clientId: e.target.value })
            }
          >
            <option value="">Sélectionner un client</option>
            {clients.map((client, i) => (
              <option key={i} value={client.id}>
                {client.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Annonce Titre:</label>
          <select
            value={newApplication.advertisementId}
            onChange={(e) =>
              setNewApplication({
                ...newApplication,
                advertisementId: e.target.value,
              })
            }
          >
            <option value="">Sélectionner une annonce</option>
            {advertisements.map((ad) => (
              <option key={ad.id} value={ad.id}>
                {ad.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Motivation:</label>
          <textarea
            value={newApplication.motivation}
            onChange={(e) =>
              setNewApplication({
                ...newApplication,
                motivation: e.target.value,
              })
            }
            rows="5"
            required
          />
        </div>

        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default AdminApplication;
