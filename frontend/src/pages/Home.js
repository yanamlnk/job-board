import React, { useEffect, useState } from "react";
import Advertisement from "../components/Advertisement";
import "../styles/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [adsData, setAdsData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/advertisement")
      .then((response) => response.json())
      .then((data) => setAdsData(data))
      .catch((error) => console.error("Erreur:", error));

    const token = localStorage.getItem('userToken');
    if (token) {
      fetch("http://localhost:3001/api/client/Client", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Erreur:", error)); 
    }  
  }, []);

  const ads = adsData.map((data, i) => {
    return (
      <Advertisement
        key={i}
        adID={data.id}
        companyName={data.companyName}
        title={data.title}
        contract={data.contract}
        location={data.location}
        description={data.description}
        salary={data.salary}
        date={data.postDate}
        userData={userData}
      />
    );
  });
  return (
    <div className="home">
      <Header/>
      <div className="container_advertisements">{ads}</div>
      <Footer />
    </div>
  );
}
export default Home;
