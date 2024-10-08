import React from "react";
import Article from "../components/Article";
import "../styles/Home.css";
function Home() {
  return (
    <div className={"home"}>
      <div className={"container_articles"}>
        <Article />
        <Article />
        <Article />
      </div>
    </div>
  );
}
export default Home;
