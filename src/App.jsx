import React, { useState, useEffect } from "react";

export default function App() {
  // Liste des modèles disponibles avec leurs noms et URLs
  const models = [
    {
      name: "Aloe Plant",
      model: "/assets/aloe_plant.glb",
    },
    {
      name: "Bonsai Tree",
      model: "/assets/bonsai_tree.glb",
    },
    {
      name: "Flower",
      model: "/assets/banana_plant_with_pot.glb",
    },
    {
      name: "Succulent",
      model: "/assets/hoya_australis.glb",
    },
  ];

  const [modelUrl, setModelUrl] = useState("/assets/aloe_plant.glb"); // Modèle initial
  const [scale, setScale] = useState("0.5 0.5 0.5"); // Échelle par défaut

  // Fonction pour changer le modèle
  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setModelUrl(selectedModel); // Met à jour l'URL du modèle
  };

  // Fonction pour changer l'échelle
  const handleScaleChange = (event) => {
    setScale(event.target.value); // Met à jour l'échelle
  };

  return (
    <div className="App">
      <h2>React AR JS</h2>

      {/* Menu déroulant pour changer de modèle */}
      <select style={{ position: "absolute", zIndex: 50 }} onChange={handleModelChange}>
        {models.map((model) => (
          <option key={model.name} value={model.model}>
            {model.name}
          </option>
        ))}
      </select>

      {/* Menu déroulant pour changer l'échelle */}
      <select style={{ position: "absolute", zIndex: 50, top: "40px" }} onChange={handleScaleChange}>
        <option value="0.5 0.5 0.5">Échelle 1/2</option>
        <option value="1 1 1">Échelle 1x</option>
        <option value="2 2 2">Échelle 2x</option>
      </select>

      {/* Scène A-Frame */}
      <div>
        <a-scene xr-mode-ui="enabled: false">
          <a-marker preset="hiro">
            {/* Entité dynamique avec le modèle sélectionné sans "url()" */}
            <a-entity
              gltf-model={modelUrl} // Utilise directement l'URL sans "url()"
              scale={scale} // Applique l'échelle dynamique
            ></a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </div>
    </div>
  );
}
