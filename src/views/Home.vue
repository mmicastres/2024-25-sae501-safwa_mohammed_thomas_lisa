<template>
  <ion-page>
    <ion-content fullscreen>

      <!-- <iframe :src="iframeSrc" frameborder="0"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: auto;"
        allow="camera; fullscreen">
      </iframe> -->

      <!-- Button pour ouvrir la modal des model 3D -->
      <ion-button id="open-modal" expand="block">Open</ion-button>
      <ion-button id="open-info">
        <ion-icon :icon="informationCircle" color="dark"></ion-icon>
      </ion-button>

      <!-- Modal pour les models 3D -->
      <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input label="Enter your name" label-placement="stacked" ref="input" type="text"
              placeholder="Your name"></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>

      <!-- Modal pour les informations de la plante -->
      <ion-modal ref="modal" trigger="open-info">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="fermer()">Fermer</ion-button>
            </ion-buttons>
            <ion-title>Informations</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="ion-padding">
            <h2 class="Titleplant">{{ plantName }}</h2>
            <img src="/plant.jpg" alt="" class="photoplant">
            <p>{{ message }}</p>
            <ul>
              <li>temperature: {{ temperature }}</li>
              <li>temperature: {{ temperature }}</li>
              <li>temperature: {{ temperature }}</li>
            </ul>
          </div>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonIcon,
  IonPage
} from '@ionic/vue';
import { ref } from 'vue';
import { informationCircle } from 'ionicons/icons';

const iframeSrc = ref("../../aframe-ar.html?model=./model/banana_plant_with_pot.glb");

const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');
const plantName = ref('Ougabouga');
const temperature = ref('Ougabouga');

const modal = ref();
const input = ref();

const cancel = () => modal.value.$el.dismiss(null, 'cancel');
const fermer = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = input.value.$el.value;
  modal.value.$el.dismiss(name, 'confirm');
};

const onWillDismiss = (event) => {
  if (event.detail.role === 'confirm') {
    message.value = `Hello, ${event.detail.data}!`;
  }
};

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

.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 10px;
}

.flex-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: auto;
  border: none;
}

.ion-padding {
  padding: 10px 30px;
}

.Titleplant {
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 24px;
  font-weight: 900;
  padding: 12px 0;
}

.photoplant {
  border-radius: 3%;
}

/* Style global des boutons */
#open-modal,
#open-info {
  --border-radius: 50px;
  /* Boutons arrondis */
  --padding-start: 16px;
  --padding-end: 16px;
  --font-weight: bold;
  --background: transparent;
  /* Fond transparent */
  --color: rgb(0, 0, 0);
  /* Couleur du texte */
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Ombre douce */
  transition: all 0.3s ease-in-out;
  /* Animation au survol */
  outline: none;
  /* Retirer la bordure de focus par défaut */
  border: 2px solid transparent;
  /* Pas de bordure visible */
}

/* Effet au survol */
#open-modal:hover,
#open-info:hover {
  transform: scale(1.05);
  /* Légère augmentation de la taille */
  --background: transparent;
  /* Changer la couleur de fond au survol */
  --box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  /* Ombre plus forte */
}

/* Désactivation des styles par défaut d'Ionic sur les boutons */
#open-modal,
#open-info {
  --background-activated: transparent !important;
  --background-focused: transparent !important;
  --background-hover: transparent !important;
  --background-activated-opacity: 1 !important;
  --background-focused-opacity: 1 !important;
  --background-hover-opacity: 1 !important;
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

/* Empêcher la couleur bleue au focus et personnaliser l'apparence */
#open-modal:focus,
#open-info:focus {
  transform: scale(1.05);
  /* Légère augmentation de la taille */
  --background: transparent !important;
  /* Fond transparent lors du focus */
  --box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  /* Ombre plus forte */
  outline: none;
  /* Enlever le contour bleu */
  border-color: transparent;
  /* Pas de bordure visible au focus */
}

/* Effet au survol */
#open-modal:hover,
#open-info:hover {
  transform: scale(1.05);
  /* Légère augmentation de la taille */
  --background: transparent !important;
  /* Changer la couleur de fond au survol */
  --box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  /* Ombre plus forte */
}

/* Gestion de l'état "active" pour éviter la couleur bleue au clic */
#open-modal:active,
#open-info:active {
  --background: transparent !important;
  /* Garder le fond transparent au clic */
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Ombre douce pour l'état actif */
  transform: scale(1);
  /* Annuler la légère augmentation de taille lors du clic */
}


/* Positionner les boutons au bas de la page */
#open-modal {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

#open-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
