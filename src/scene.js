import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";

class Scene extends Component {
  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh"
        }}
        ref={el => (this.container = el)}
      />
    );
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: 0xfffff,
      wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 1000;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = true;
    controls.maxDistance = 1500;
    controls.minDistance = 0;

    const globe = new THREE.Mesh(geometry, material);

    const light_p = new THREE.PointLight(0xffffff);
    light_p.position.set(10, 10, 10);
    scene.add(light_p);

    // const light_a = new THREE.AmbientLight(0x333333);
    // scene.add(light_a);
    let isMapView = false;
    const animate = () => {
      requestAnimationFrame(animate);
      const zoom = controls.object.position.distanceTo(controls.target);
      if (zoom <= 2 && !isMapView) {
        // when we reach a specified zoom level, switch to map view
        this.props.onZoomEnd();
        isMapView = true;
      }
      renderer.render(scene, camera);
    };
    this.container.appendChild(renderer.domElement);

    animate();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.color !== nextProps.color) {
      this.globe.material.color.setHex(nextProps.color);
    }
  }
}

export default Scene;
