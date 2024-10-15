import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate pour la redirection
import "../styles/SignIn.css";

function SignInForm() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialiser useNavigate pour la redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si l'utilisateur est un admin
    fetch("http://localhost:3001/api/admin/SignIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            return handleClientSignIn(); // Passer à la vérification client
          }
          throw new Error("Erreur lors de la connexion admin");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("userToken", data.token);
          console.log("Admin connecté avec succès:", data);

          // Rediriger l'utilisateur vers la page Admin.js après la connexion réussie
          navigate("/admin");
        } else {
          console.error("Erreur : Aucune donnée ou token n'a été renvoyé");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
      });
  };

  // Fonction pour gérer la connexion client si l'admin n'est pas trouvé
  const handleClientSignIn = () => {
    fetch("http://localhost:3001/api/client/SignIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la connexion client");
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          console.log("Client connecté avec succès:", data);

          // Si tu veux faire quelque chose après la connexion client, ajoute ici
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion client:", error);
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
