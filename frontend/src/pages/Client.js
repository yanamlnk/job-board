import React, { useEffect } from "react";
import ClientEdit from "../components/ClientEdit";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ClientApplicationList from "../components/ClientApplicationList";
import "../styles/Client.css";

function Client() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/");
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
