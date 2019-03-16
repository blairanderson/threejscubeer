import React, { Component } from "react";
import { render } from "react-dom";
import Scene from "./scene";
import Map from "./Map";

const styles = {
  width: "100vw",
  height: "100vh"
};

function App() {
  return (
    <div style={styles}>
      {<Scene onZoomEnd={function() {}} />}
      <div
        style={{
          zIndex: 1,
          position: "absolute"
        }}
      />
    </div>
  );
}

render(<App />, document.getElementById("root"));
