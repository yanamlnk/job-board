import React, { useState, useEffect } from "react";
import "../styles/ClientEdit.css";

function ClientEdit() {
  const [editData, setEditData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken"); // Suppose qu'on récupère le token stocké
    if (token) {
      // Fetch pour récupérer les données actuelles du client
      fetch("http://localhost:3001/api/client/Client", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          data.password = "";
          data.birthDate = "";
          setEditData(data); // Charger les données actuelles dans le formulaire
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des données du client:",
            error
          )
        );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    // console.log(editData);
    fetch("http://localhost:3001/api/client/Edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          console.log("Mise à jour réussie !");
        } else {
          console.error(
            "Erreur lors de la mise à jour des données :",
            data.error
          );
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour du profil:", error)
      );
  };

  return (
    <form className={"EditForm"} onSubmit={handleEdit}>
      <label>Edit</label>
      <input
        type="text"
        name="name"
        placeholder="First Name"
        value={editData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={editData.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={editData.email}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={editData.phoneNumber}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={editData.location}
        onChange={handleChange}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default ClientEdit;
