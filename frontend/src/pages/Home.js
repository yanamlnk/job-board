import React from "react";
import Advertisement from "../components/advertisement";
import "../styles/Home.css";
import Header from "../components/Header";

function Home() {
  return (
    <div className={"home"}>
      <div className={"container_advertisements"}>
        <Header />
        <Advertisement />
        <Advertisement />
        <Advertisement />
      </div>
    </div>
  );
}
export default Home;
