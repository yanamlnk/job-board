import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminClient from "../components/AdminClient";
import AdminCompany from "../components/AdminCompany";
import AdminAdvertisement from "../components/AdminAdvertisement";
import Header from "../components/Header";
import "../styles/Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [companiesActive, setCompaniesActive] = useState(true);
  const [clientsActive, setClientsActive] = useState(false);
  const [advertisementsActive, setAdvertisementsActive] = useState(false);
  const [applicationsActive, setApplicationsActive] = useState(false);

  const handleCompaniesActive = () => {
    setCompaniesActive(true);
    setClientsActive(false);
    setAdvertisementsActive(false);
    setApplicationsActive(false);
  }

  const handleClientsActive = () => {
    setCompaniesActive(false);
    setClientsActive(true);
    setAdvertisementsActive(false);
    setApplicationsActive(false);
  }

  const handleAdvertisementsActive = () => {
    setCompaniesActive(false);
    setClientsActive(false);
    setAdvertisementsActive(true);
    setApplicationsActive(false);
  }

  const handleApplicationsActive = () => {
    setCompaniesActive(false);
    setClientsActive(false);
    setAdvertisementsActive(false);
    setApplicationsActive(true);
  }

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
      <Header/>
      <div className = "admin-buttons-navigation">
        <button onClick={handleCompaniesActive}>Companies</button>
        <button onClick={handleClientsActive}>Clients</button>
        <button onClick={handleAdvertisementsActive}>Advertisements</button>
        <button onClick={handleApplicationsActive}>Applications</button>
      </div>
      {companiesActive && <AdminCompany />}
      {advertisementsActive && <AdminAdvertisement />}
      {clientsActive && <AdminClient />}
      {applicationsActive && <p>Working on Applications</p>}
    </div>
  );
}

export default Admin;
