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
      {error && errorMessage(error)}
    </>
  );
}

export default SignUpForm;
