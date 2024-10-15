import React, { useEffect, useState } from "react";

function AdminAdvertisement() {
  const [advertisements, setAdvertisements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    contract: "",
    salary: "",
    postDate: "",
  });
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    fetchAdvertisements();
    fetchCompanies();
  }, []);

  const fetchAdvertisements = () => {
    fetch("http://localhost:3001/api/advertisement")
      .then((response) => response.json())
      .then((data) => {
        setAdvertisements(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des annonces:", error)
      );
  };

  const fetchCompanies = () => {
    fetch("http://localhost:3001/api/company")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      })
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

  const handleCreateAdvertisement = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/advertisement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchAdvertisements();
        setFormData({
          title: "",
          description: "",
          company: "",
          location: "",
          contract: "",
          salary: "",
          postDate: "",
        });
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout de l'annonce:", error)
      );
  };

  const handleEditAdvertisement = (advertisement) => {
    const formattedPostDate = advertisement.postDate
      ? advertisement.postDate.split("T")[0]
      : "";
    setEditFormData({
      id: advertisement.id,
      title: advertisement.title,
      description: advertisement.description,
      company: advertisement.company,
      location: advertisement.location,
      contract: advertisement.contract,
      salary: advertisement.salary,
      postDate: formattedPostDate,
    });
  };

  const handleUpdateAdvertisement = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/advertisement/${editFormData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchAdvertisements(); // Récupérer la liste des annonces après mise à jour
        setEditFormData(null); // Réinitialiser le formulaire de modification
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de l'annonce:", error)
      );
  };

  const handleDeleteAdvertisement = (id) => {
    fetch(`http://localhost:3001/api/advertisement/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchAdvertisements()) // Récupérer la liste des annonces après suppression
      .catch((error) =>
        console.error("Erreur lors de la suppression de l'annonce:", error)
      );
  };

  return (
    <div>
      <h1>Gérer les annonces</h1>
      <h2>Liste des annonces</h2>
      <ul>
        {advertisements.map((ad) => (
          <li key={ad.id}>
            <div>
              <strong>{ad.title}</strong> ({ad.companyName}) - {ad.location}
            </div>
            <button onClick={() => handleEditAdvertisement(ad)}>
              Modifier
            </button>
            <button onClick={() => handleDeleteAdvertisement(ad.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* Formulaire de modification d'une annonce */}
      {editFormData && (
        <div>
          <h2>Modifier l'annonce : {editFormData.title}</h2>
          <form onSubmit={handleUpdateAdvertisement}>
            <input
              name="title"
              placeholder="Titre"
              value={editFormData.title}
              onChange={handleEditChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={editFormData.description}
              onChange={handleEditChange}
              required
            />
            <select
              name="company"
              value={editFormData.company}
              onChange={handleEditChange}
              required
            >
              <option value="">Sélectionnez une entreprise</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <input
              name="location"
              placeholder="Localisation"
              value={editFormData.location}
              onChange={handleEditChange}
              required
            />
            <input
              name="contract"
              placeholder="Type de contrat"
              value={editFormData.contract}
              onChange={handleEditChange}
              required
            />
            <input
              name="salary"
              type="number"
              placeholder="Salaire"
              value={editFormData.salary}
              onChange={handleEditChange}
              required
            />
            <input
              name="postDate"
              type="date"
              value={editFormData.postDate}
              onChange={handleEditChange}
              required
            />
            <button type="submit">Mettre à jour</button>
          </form>
        </div>
      )}
      {/* Formulaire de création d'une annonce */}
      <h2>Ajouter une nouvelle annonce</h2>
      <form onSubmit={handleCreateAdvertisement}>
        <input
          name="title"
          placeholder="Titre"
          value={formData.title}
          onChange={handleCreateChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleCreateChange}
          required
        />
        <select
          name="company"
          value={formData.company}
          onChange={handleCreateChange}
          required
        >
          <option value="">Sélectionnez une entreprise</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <input
          name="location"
          placeholder="Localisation"
          value={formData.location}
          onChange={handleCreateChange}
          required
        />
        <input
          name="contract"
          placeholder="Type de contrat"
          value={formData.contract}
          onChange={handleCreateChange}
          required
        />
        <input
          name="salary"
          type="number"
          placeholder="Salaire"
          value={formData.salary}
          onChange={handleCreateChange}
          required
        />
        <input
          name="postDate"
          type="date"
          value={formData.postDate}
          onChange={handleCreateChange}
          required
        />
        <button type="submit">Ajouter Annonce</button>
      </form>
    </div>
  );
}

export default AdminAdvertisement;
