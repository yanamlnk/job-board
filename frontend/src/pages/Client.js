import React, { useState, useEffect } from "react";
import ClientEdit from "../components/ClientEdit";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ClientApplicationList from "../components/ClientApplicationList";
import "../styles/Client.css";

function Client() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken")

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    if (token) {

      fetch("http://localhost:3001/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
          if (response.ok) {
            navigate("/admin");
          }
      })
      .catch((error) => {
          console.error("Somethign went wrong:", error);
      });
    }

  }, [navigate]);
  
  return (
    <div>
      <Header />
      <div className = "client-page">
        <ClientEdit />
        <ClientApplicationList />
      </div>
      <Footer />
    </div>
  );
}

export default Client;
