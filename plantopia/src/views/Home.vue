<template>
  <ion-page>
    <ion-content fullscreen>
       <!-- Fullscreen iframe pour contenu AR avec modèle dynamique -->
      <iframe :src="iframeSrc" frameborder="0"
        style="border: none; width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1;"
        allow="camera; fullscreen"></iframe>

      <!-- Boutons du menu pour changer les modèles -->
      <div class="menu-buttons">
        <ion-button class="menu-btn top-right" @click="changeModel('./resources/banana_plant_with_pot.glb')" shape="round">
          Plante 1
        </ion-button>

        <ion-button class="menu-btn top-left" @click="changeModel('./resources/ducktoise.glb')" shape="round">
          Plante 2
        </ion-button>

        <ion-button class="menu-btn bottom-left" @click="changeModel('./resources/plants.glb')" shape="round">
          Plante 3
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonIcon, IonPage, IonContent } from '@ionic/vue';
import { settings, storefront, trophy } from 'ionicons/icons';

// Définir une ref pour l'URL de l'iframe
const iframeSrc = ref("../../aframe-ar.html?model=./resources/banana_plant_with_pot.glb");

// Fonction pour changer le modèle dans l'iframe
function changeModel(modelPath: string) {
  // Mise à jour du src de l'iframe avec le modèle sélectionné
  iframeSrc.value = `../../aframe-ar.html?model=${modelPath}`;
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
  z-index: 10;
}

/* 4. Position des boutons */
.menu-btn {
  position: absolute;
}

.top-right {
  top: 20px;
  right: 20px;
}

.top-left {
  top: 20px;
  left: 20px;
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
