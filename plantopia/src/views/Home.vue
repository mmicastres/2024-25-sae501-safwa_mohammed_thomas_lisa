<template>
  <ion-page>
    <ion-content fullscreen>
      <!-- Instructions pour l'utilisateur -->
      <div id="instructions">Cliquez sur l'écran pour placer le duck</div>

      <iframe src="../../aframe-ar.html" frameborder="0" style="width: 100%; height: 100%; border: none;"
        allow="camera; fullscreen">
      </iframe>


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
