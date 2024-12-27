import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const entity = document.querySelector('[gltf-model]'); // Trouve l'entité par son attribut
    if (entity) {
      console.log("URL du modèle :", entity.getAttribute('gltf-model')); // Affiche l'URL du modèle
      console.log("Échelle :", entity.getAttribute('scale')); // Affiche l'échelle
    }
  }, []);

  return (
    <div className="App">
      <h2>React AR JS</h2>
      <div>
        <a-scene xr-mode-ui="enabled: false">
          <a-marker preset="hiro">
            <a-entity
              gltf-model="url(/assets/aloe_plant.glb)"
              scale="0.5 0.5 0.5">
            </a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </div>
    </div>
  );
}
