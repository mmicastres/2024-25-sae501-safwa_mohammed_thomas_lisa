<template>
  <ion-page>
    <ion-content fullscreen>
       <!-- Fullscreen iframe pour contenu AR -->
      <iframe src="../../aframe-ar.html" frameborder="0"
        style="border: none; width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1;"
        allow="camera; fullscreen"></iframe>

      <!-- Boutons du menu -->
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
import { ref } from 'vue';
import { IonButton, IonIcon, IonPage, IonContent } from '@ionic/vue';
import { settings, storefront, trophy } from 'ionicons/icons';

const isMarkerFound = ref(false);

// Fonction appelée lorsqu'un marqueur est trouvé
function onMarkerFound() {
  isMarkerFound.value = true;
  console.log("Marqueur AR détecté !");
  // Enlève la classe blink si le marqueur est trouvé
  const scanElement = document.querySelector('.scan');
  if (scanElement) {
    scanElement.classList.remove('blink');
  }
}
</script>

<style scoped>
/* 1. Styles généraux */
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

/* 3. Menu Buttons */
.menu-buttons {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 4. Position des boutons */
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

/* 5. Padding des boutons */
ion-button {
  --padding-top: 10px;
  --padding-bottom: 10px;
}

/* 6. Styles de l'iframe */
iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
