<template>
  <ion-page>
    <ion-content fullscreen>
      <div class="menu-buttons">
        <ion-button class="menu-btn top-left" href="/tabs/tab1" shape="round">
          <ion-icon slot="icon-only" :icon="archive" />
        </ion-button>

        <ion-button class="menu-btn top-right" href="/tabs/tab2" shape="round">
          <ion-icon slot="icon-only" :icon="basket" />
        </ion-button>

        <!-- Bouton en bas à droite -->
        <ion-button class="menu-btn bottom-right" href="/tabs/tab3" shape="round">
          <ion-icon slot="icon-only" :icon="podiumSharp"></ion-icon>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonPage, IonContent } from '@ionic/vue';
import { archive, basket, podiumSharp, heart } from 'ionicons/icons';
</script>

<style scoped>
.menu-buttons {
  position: relative;
  height: 100%;
}

.menu-btn {
  position: absolute;
}

.top-left {
  top: 20px;
  left: 20px;
}

.top-right {
  top: 20px;
  right: 20px;
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
</style>