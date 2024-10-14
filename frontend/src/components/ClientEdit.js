import React, { useState } from "react";
import "../styles/ClientEdit.css";

function ClientEdit() {
  const [editData, setEditData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilPicture: "",
    birthDate: "",
    location: "",
    password: "",
  });

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

    fetch("http://localhost:3001/api/edit", {
      methode: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.succes) {
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
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={editData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={editData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={editData.password}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={editData.phoneNumber}
        onChange={handleChange}
        required
      />
      {/* <input
        type="text"
        name="profilPicture"
        placeholder="Profile Picture URL"
        value={signUpData.profilPicture}
        onChange={handleChange}
      /> */}
      <input
        type="date"
        name="birthDate"
        placeholder="Birth Date"
        value={editData.birthDate}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={editData.location}
        onChange={handleChange}
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default ClientEdit;
