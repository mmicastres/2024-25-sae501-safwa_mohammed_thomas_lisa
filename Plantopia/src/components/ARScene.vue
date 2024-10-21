<template>
    <div>
      <div id="instructions">Cliquez sur l'écran pour placer le canard</div>
  
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
      >
        <a-camera gps-new-camera="gpsMinDistance: 5" look-controls="enabled: false" rotation-reader></a-camera>
      </a-scene>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.initializeAR();
    },
    methods: {
      initializeAR() {
        // Enregistre un composant pour lire la rotation
        AFRAME.registerComponent('rotation-reader', {
          tick: function () {
            // Logique pour la rotation, si nécessaire
          },
        });
  
        const scene = document.querySelector('a-scene');
        let canardEntity = null; // Variable pour stocker l'entité canard
  
        scene.addEventListener('click', () => {
          if (!canardEntity) { // Vérifie si le canard n'est pas déjà placé
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
  
                // Crée une entité pour le canard
                canardEntity = document.createElement('a-entity');
  
                // Définit les coordonnées GPS pour l'entité
                canardEntity.setAttribute(
                  'gps-new-entity-place',
                  `latitude: ${latitude}; longitude: ${longitude};`
                );
  
                // Modèle 3D du canard
                canardEntity.setAttribute(
                  'gltf-model',
                  'https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf'
                );
  
                // Échelle du canard
                canardEntity.setAttribute('scale', '0.5 0.5 0.5');
                canardEntity.setAttribute('position', '0 0 0');
  
                // Ajoute le canard à la scène
                scene.appendChild(canardEntity);
  
                // Masque les instructions
                const instructions = document.getElementById('instructions');
                if (instructions) {
                  instructions.style.display = 'none';
                }
              },
              (error) => {
                console.error('Error getting position', error);
                alert('Erreur lors de la récupération de la position');
              },
              {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 27000,
              }
            );
          } else {
            alert("Le canard est déjà placé!");
          }
        });
      },
    },
  };
  </script>
  
  <style>
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  #instructions {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    text-align: center;
    color: white;
    font-family: Arial, sans-serif;
    z-index: 1;
    text-shadow: 0 0 5px black;
  }
  </style>
  