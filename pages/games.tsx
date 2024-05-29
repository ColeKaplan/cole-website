import React from "react";
import Header from "../components/Header";

export default function Games() {
  return(
    <>
        <Header />
        <div>Games</div>
        <iframe
          src="/games/FishOnLand/index.html"
          width="960"
          height="600"
          allowFullScreen
          title="Fish On Land Game"
        ></iframe>
    </>
    ); 
}

