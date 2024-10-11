import React, { useState } from "react";
import "../styles/SignUp.css";
function SignUpForm() {
  const [signUpData, setSignUpData] = useState({
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
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Succès inscription:", data);
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          console.log("Token enregistré:", data.token);
        } else {
          console.error("Erreur :", data.error);
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <>
      <form className={"signUpForm"} onSubmit={handleSubmit}>
        <label>Sign Up</label>
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={signUpData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={signUpData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signUpData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signUpData.password}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={signUpData.phoneNumber}
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
          value={signUpData.birthDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={signUpData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignUpForm;
