import React from "react";
import Advertisement from "../components/advertisement";
import "../styles/Home.css";
function Home() {
  return (
    <div className={"home"}>
      <div className={"container_advertisements"}>
        <Advertisement />
        <Advertisement />
        <Advertisement />
      </div>
    </div>
  );
}
export default Home;
