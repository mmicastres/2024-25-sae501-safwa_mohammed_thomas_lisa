<template>
  <ion-page>
    <ion-content fullscreen>
      <!-- Instructions for the User -->
      <div class="Scan">
        <img src="../../resources/Group1.svg" alt="Scan icon" width="80"/>
        <div id="instructions">Scannez l'environnement</div>
      </div>

      <!-- Fullscreen iframe for AR content -->
      <iframe src="../../aframe-ar.html" frameborder="0"
        style="border: none; width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1;"
        allow="camera; fullscreen"></iframe>
 
      <!-- Menu Buttons -->
      <div class="menu-buttons">
        <ion-button class="menu-btn top-right" href="settings" shape="round">
          <ion-icon slot="icon-only" :icon="settings" />
        </ion-button>

        <ion-button class="menu-btn bottom-left" href="shop" shape="round">
          <ion-icon slot="icon-only" :icon="storefront" />
        </ion-button>

        <ion-button class="menu-btn bottom-right" href="leaderboard" shape="round">
          <ion-icon slot="icon-only" :icon="trophy"></ion-icon>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonPage, IonContent } from '@ionic/vue';
import { settings, storefront, trophy } from 'ionicons/icons';
</script>

<style scoped>
body,
html,
ion-page,
ion-content {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

/* Styling for Instructions Container */
#instructions {
  margin-top: 10px;
  text-align: center;
  color: white;
  font-family: Arial, sans-serif;
  text-shadow: 0 0 5px black;
  z-index: 10;
}

/* .Scan Container Styling */
.Scan {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

/* Menu Buttons Container */
.menu-buttons {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Button Positioning */
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

/* Button Padding */
ion-button {
  --padding-top: 10px;
  --padding-bottom: 10px;
}

/* Fullscreen iframe styling */
iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
