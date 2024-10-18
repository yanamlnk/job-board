import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminClient from "../components/AdminClient";
import AdminCompany from "../components/AdminCompany";
import AdminAdvertisement from "../components/AdminAdvertisement";
import AdminApplication from "../components/AdminApplication";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:3001/api/admin/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Token invalide ou non autorisé");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Vérification réussie, admin authentifié:", data);
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification:", error);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenue sur la page Admin</h1>
      <AdminApplication />
      <AdminCompany />
      <AdminAdvertisement />
      <AdminClient />
    </div>
  );
}

export default Admin;
