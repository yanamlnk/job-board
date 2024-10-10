import React, { useState } from "react";
import "../styles/SignUp.css";
import "../styles/Advertisement_Module.css";
function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilPicture: "", // Tu pourrais gérer l'upload du fichier séparément
    birthDate: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Succès:", data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <form className={"Form"} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="First Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      {/* <input
        type="text"
        name="profilPicture"
        placeholder="Profile Picture URL"
        value={formData.profilPicture}
        onChange={handleChange}
      /> */}
      <input
        type="date"
        name="birthDate"
        placeholder="Birth Date"
        value={formData.birthDate}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
