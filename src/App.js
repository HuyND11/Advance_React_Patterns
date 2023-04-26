import React from "react";
import "./assets/__index.scss";
import { MediumClap, MediumClapCustomHook } from "./patterns";

const App = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <MediumClap />
        <MediumClapCustomHook />
      </div>
    </div>
  );
};

export default App;
