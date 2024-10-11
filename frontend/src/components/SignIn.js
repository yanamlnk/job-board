import React, { useState } from "react";
import "../styles/SignIn.css";

function SignInForm() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signInData);
    fetch("http://localhost:3001/api/SignIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Succès connexion:", data);
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
      <form className={"loginForm"} onSubmit={handleSubmit}>
        <label>Sign In</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signInData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signInData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}

export default SignInForm;
