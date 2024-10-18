import React, { useEffect, useState } from "react";

function AdminCompany() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    fetch("http://localhost:3001/api/company")
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des entreprises:", error)
      );
  };

  // Gestion des changements pour le formulaire de création
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion des changements pour le formulaire de modification
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCreateCompany = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchCompanies();
        setFormData({
          name: "",
          location: "",
        });
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout de l'entreprise:", error)
      );
  };

  const handleEditCompany = (company) => {
    setEditFormData({
      id: company.id,
      name: company.name,
      location: company.location,
    });
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/company/${editFormData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchCompanies();
        setEditFormData(null);
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de l'entreprise:", error)
      );
  };

  const handleDeleteCompany = (id) => {
    fetch(`http://localhost:3001/api/advertisement/byCompany/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        return fetch(`http://localhost:3001/api/company/${id}`, {
          method: "DELETE",
        });
      })
      .then(() => fetchCompanies())
      .catch((error) =>
        console.error(
          "Erreur lors de la suppression des annonces ou de l'entreprise:",
          error
        )
      );
  };

  return (
    <div>
      <h1>Gérer les entreprises</h1>

      <h2>Liste des entreprises</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <div>
              <strong>{company.name}</strong> - {company.location}
            </div>
            <button onClick={() => handleEditCompany(company)}>Modifier</button>
            <button onClick={() => handleDeleteCompany(company.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* Formulaire de modification d'une entreprise */}
      {editFormData && (
        <div>
          <h2>Modifier l'entreprise : {editFormData.name}</h2>
          <form onSubmit={handleUpdateCompany}>
            <input
              name="name"
              placeholder="Nom"
              value={editFormData.name}
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
      {/* Formulaire de création d'une entreprise */}
      <h2>Ajouter une nouvelle entreprise</h2>
      <form onSubmit={handleCreateCompany}>
        <input
          name="name"
          placeholder="Nom"
          value={formData.name}
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
        <button type="submit">Ajouter Entreprise</button>
      </form>
    </div>
  );
}

export default AdminCompany;
