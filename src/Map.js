import mapboxgl from "mapbox-gl";
import React, { Component } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export default class Map extends Component {
  componentDidMount() {
    console.log("map mount");
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9"
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh"
        }}
        ref={el => (this.mapContainer = el)}
      />
    );
  }
}
