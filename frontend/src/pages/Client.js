import React, { useEffect } from "react";
import ClientEdit from "../components/ClientEdit";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ClientApplicationList from "../components/ClientApplicationList";

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
      <ClientEdit />
      <ClientApplicationList />
      <Footer />
    </div>
  );
}

export default Client;
