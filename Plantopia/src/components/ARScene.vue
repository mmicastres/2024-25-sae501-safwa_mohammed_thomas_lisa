<template>
  <div>
    <div id="instructions">Cliquez sur l'écran pour placer le Magnemite</div>
    <button id="getLocation" style="position: absolute; top: 10px; left: 10px; z-index: 999;">Obtenir ma position</button>
    <div id="locationDisplay" style="position: absolute; top: 50px; left: 10px; background-color: white; padding: 10px; border: 1px solid black; z-index: 999;">
      <p>Latitude: <span id="latitude">N/A</span></p>
      <p>Longitude: <span id="longitude">N/A</span></p>
    </div>

    <a-scene
      vr-mode-ui="enabled: false"
      embedded
      arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
    >
      <a-camera gps-camera rotation-reader></a-camera>
    </a-scene>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initializeAR();
    this.setupGeolocation();
  },
  methods: {
    initializeAR() {
      AFRAME.registerComponent('rotation-reader', {
        tick: function () {
          // Logique de mise à jour si nécessaire
        },
      });

      const scene = document.querySelector('a-scene');
      let modelEntity = null; // Variable pour stocker l'entité du modèle

      // Événement pour placer le modèle lorsque l'on clique sur la scène
      scene.addEventListener('click', () => {
        if (!modelEntity) { // Vérifie si le modèle n'est pas déjà placé
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Crée une entité pour le modèle
              modelEntity = document.createElement('a-entity');

              // Définit les coordonnées GPS pour l'entité
              modelEntity.setAttribute(
                'gps-entity-place',
                `latitude: ${latitude}; longitude: ${longitude};`
              );

              // Modèle 3D du Magnemite
              modelEntity.setAttribute(
                'gltf-model',
                './assets/magnemite/scene.gltf' // Remplacez par l'URL de votre modèle
              );

              // Échelle du modèle
              modelEntity.setAttribute('scale', '0.5 0.5 0.5');

              // Ajoute le modèle à la scène
              scene.appendChild(modelEntity);

              // Masque les instructions
              const instructions = document.getElementById('instructions');
              if (instructions) {
                instructions.style.display = 'none';
              }

              // Met à jour les coordonnées affichées
              this.updateLocationDisplay(latitude, longitude);
            },
            (error) => {
              console.error('Erreur lors de la récupération de la position', error);
              alert('Erreur lors de la récupération de la position');
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 27000,
            }
          );
        } else {
          alert("Le Magnemite est déjà placé !");
        }
      });
    },
    setupGeolocation() {
      const latText = document.getElementById("latitude");
      const longText = document.getElementById("longitude");
      const button = document.getElementById("getLocation");

      button.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            latText.innerText = lat.toFixed(2);
            longText.innerText = long.toFixed(2);
          }, (error) => {
            console.error('Erreur de géolocalisation:', error);
          });
        } else {
          console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
        }
      });
    },
    updateLocationDisplay(latitude, longitude) {
      document.getElementById("latitude").innerText = latitude.toFixed(2);
      document.getElementById("longitude").innerText = longitude.toFixed(2);
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
#locationDisplay {
  position: absolute;
  top: 50px;
  left: 10px;
  background-color: white;
  padding: 10px;
  border: 1px solid black;
  z-index: 999;
}
</style>
