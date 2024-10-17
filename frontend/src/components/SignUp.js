import React, { useState } from "react";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUpForm({handleLogInActive}) {
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

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSuccess = () => {
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/client/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          handleSuccess();
        } else {
          console.error("Erreur :", data.error);
          if (data.error === "Cet email est déjà utilisé.") {
            setError("Email is already used.");
          } else {
            setError("Something went wrong. Please try again later.");
          }
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  const errorMessage = (message) => {
    if (message === "Email is already used.") {
      return <p>{message} Please <a href="#" onClick={() => handleLogInActive(true)}>log in.</a></p>
    } else {
      return <p>{message}</p>
    }
  }

  return (
    <div className = "signup-form">
      <form className={"signUpForm"} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="name"
          value={signUpData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="name">(Name)</label>
        <input
          type="text"
          name="lastName"
          value={signUpData.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">(Surname)</label>
        <input
          type="email"
          name="email"
          value={signUpData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">(Email)</label>
        <input
          type="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">(Password)</label>
        <input
          type="tel"
          name="phoneNumber"
          value={signUpData.phoneNumber}
          onChange={handleChange}
          required
        />
        <label htmlFor="phoneNumber">(Phone)</label>
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
          value={signUpData.birthDate}
          onChange={handleChange}
          required
        />
        <label htmlFor="birthDate">(Date of Birth)</label>
        <input
          type="text"
          name="location"
          value={signUpData.location}
          onChange={handleChange}
          required
        />
        <label htmlFor="location">(City)</label>
        <div className = "signup-submit-container"><button type="submit">Sign Up</button></div>
        {error && errorMessage(error)}
      </form>
    </div>
  );
}

export default SignUpForm;
