<!-- Possible uses <ion-icon name="qr-code"></ion-icon> -->


<template>
  <ion-page>
    <ion-content fullscreen>
      <!-- Instructions pour l'utilisateur -->
      <div id="instructions">Cliquez sur l'écran pour placer le duck</div>

      <!-- Scène AR.js -->
      <a-scene vr-mode-ui="enabled: false" embedded
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;">
        <a-camera gps-new-camera="gpsMinDistance: 5" look-controls="enabled: false" rotation-reader></a-camera>
      </a-scene>

      <div class="menu-buttons">
        <ion-button class="menu-btn top-right" href="settings" shape="round">
          <ion-icon slot="icon-only" :icon="settings" />
        </ion-button>

        <ion-button class="menu-btn bottom-left" href="shop" shape="round">
          <ion-icon slot="icon-only" :icon="storefront"/>
        </ion-button>

        <!-- Bouton en bas à droite -->
        <ion-button class="menu-btn bottom-right" href="leaderboard" shape="round">
          <ion-icon slot="icon-only" :icon="trophy"></ion-icon>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonPage, IonContent} from '@ionic/vue';
import { settings, storefront, trophy } from 'ionicons/icons';


AFRAME.registerComponent('rotation-reader', {
  tick: function () {
    // Logique de rotation ici si nécessaire
  },
});

document.addEventListener('DOMContentLoaded', function () {
  var scene = document.querySelector('a-scene');

  if (scene.hasLoaded) {
    init();
  } else {
    scene.addEventListener('loaded', init);
  }

  function init() {
    scene.addEventListener('click', function () {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          var modelEntity = document.createElement('a-entity');

          modelEntity.setAttribute(
            'gps-new-entity-place',
            `latitude: ${latitude}; longitude: ${longitude};`
          );

          modelEntity.setAttribute(
            'gltf-model',
            'https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf'
          );

          modelEntity.setAttribute('scale', '0.5 0.5 0.5');
          modelEntity.setAttribute('position', '0 0 0');
          scene.appendChild(modelEntity);

          var instructions = document.getElementById('instructions');
          if (instructions) {
            instructions.style.display = 'none';
          }
        },
        function (error) {
          console.error('Error getting position', error);
          alert('err');
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 27000,
        }
      );
    });
  }
});
</script>

<style scoped>
body,
html {
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
  z-index: 10;
  text-shadow: 0 0 5px black;
}

.menu-buttons {
  position: absolute;
  height: 100%;
  width: 100%;
}

.menu-btn {
  position: absolute;
}

.top-right {
  top: 20px;
  right: 20px;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
}

ion-button {
  --background: #ffffff;
  --padding-top: 10px;
  --padding-bottom: 10px;
}

a-scene {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
