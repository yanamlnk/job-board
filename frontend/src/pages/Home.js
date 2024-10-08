import React from "react";
import Article from "../components/Article";
import "../styles/Home.css";
import Header from "../components/Header";

function Home() {
  return (
    <div className={"home"}>
      <div className={"container_articles"}>
        <Header />
        <Article />
        <Article />
        <Article />
      </div>
    </div>
  );
}
export default Home;
