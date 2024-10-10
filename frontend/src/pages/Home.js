import React, { useEffect, useState } from "react";
import Advertisement from "../components/Advertisement";
import "../styles/Home.css";
import Header from "../components/Header";

function Home() {
  const [adsData, setAdsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/advertisements")
      .then((response) => response.json())
      .then((data) => setAdsData(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  const ads = adsData.map((data) => {
    return (
      <Advertisement
        companyName={data.companyName}
        title={data.title}
        contract={data.contract}
        location={data.location}
      />
    );
  });
  return (
    <div className={"home"}>
      <div className={"container_advertisements"}>
        <Header />
        {ads}
      </div>
    </div>
  );
}
export default Home;
