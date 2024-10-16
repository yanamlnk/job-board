import React, { useEffect, useState } from "react";

function AdminClient() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    location: "",
    password: "",
  });
  const [editFormData, setEditFormData] = useState(null); // Stocker les données à modifier

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    fetch("http://localhost:3001/api/client")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des clients");
        }
        return response.json();
      })
      .then((data) => {
        setClients(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des clients:", error)
      );
  };

  // Gestion des changements pour le formulaire de création
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    const clientData = {
      ...formData,
      password: "jobboard", // Mot de passe par défaut
    };
    fetch("http://localhost:3001/api/client/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'ajout du client");
        }
        return response.json();
      })
      .then(() => {
        fetchClients(); // Récupérer la liste des clients après ajout
        setFormData({
          name: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          birthDate: "",
          location: "",
        });
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout du client:", error)
      );
  };

  const handleEditClient = (client) => {
    const formattedBirthDate = client.birthDate
      ? client.birthDate.split("T")[0]
      : "";

    setEditFormData({
      id: client.id,
      name: client.name,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber,
      birthDate: formattedBirthDate,
      location: client.location,
    });
  };

  const handleUpdateClient = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/client/${editFormData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du client");
        }
        return response.json();
      })
      .then(() => {
        fetchClients();
        setEditFormData(null);
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour du client:", error)
      );
  };

  const handleDeleteClient = (id) => {
    fetch(`http://localhost:3001/api/client/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchClients();
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression du client:", error)
      );
  };

  return (
    <>
      <h2>Liste des clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <div style={{ fontWeight: "bold" }}>
              {client.name} {client.lastName} - {client.email}
            </div>
            <button onClick={() => handleEditClient(client)}>Modifier</button>
            <button onClick={() => handleDeleteClient(client.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* Formulaire de modification d'un client */}
      {editFormData && (
        <div>
          <h2>
            Modifier les informations du client : {editFormData.name}{" "}
            {editFormData.lastName}
          </h2>
          <form onSubmit={handleUpdateClient}>
            <input
              name="name"
              placeholder="Nom"
              value={editFormData.name}
              onChange={handleEditChange}
              required
            />
            <input
              name="lastName"
              placeholder="Prénom"
              value={editFormData.lastName}
              onChange={handleEditChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={editFormData.email}
              onChange={handleEditChange}
              required
            />
            <input
              name="phoneNumber"
              placeholder="Numéro de téléphone"
              value={editFormData.phoneNumber}
              onChange={handleEditChange}
              required
            />
            <input
              name="birthDate"
              type="date"
              value={editFormData.birthDate}
              onChange={handleEditChange}
              required
            />
            <input
              name="location"
              placeholder="Localisation"
              value={editFormData.location}
              onChange={handleEditChange}
              required
            />
            <button type="submit">Mettre à jour</button>
          </form>
        </div>
      )}
      {/* Formulaire de création d'un client */}
      <h2>Ajouter un nouveau client</h2>
      <form onSubmit={handleCreateClient}>
        <input
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleCreateChange}
          required
        />
        <input
          name="lastName"
          placeholder="Prénom"
          value={formData.lastName}
          onChange={handleCreateChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleCreateChange}
          required
        />
        <input
          name="phoneNumber"
          placeholder="Numéro de téléphone"
          value={formData.phoneNumber}
          onChange={handleCreateChange}
          required
        />
        <input
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleCreateChange}
          required
        />
        <input
          name="location"
          placeholder="Localisation"
          value={formData.location}
          onChange={handleCreateChange}
          required
        />
        <button type="submit">Ajouter Client</button>
      </form>
    </>
  );
}

export default AdminClient;
