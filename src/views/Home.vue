<template>
  <ion-page>
    <ion-content fullscreen>
      <iframe :src="iframeSrc" frameborder="0"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: auto;"
        allow="camera; fullscreen">
      </iframe>


      <div class="overlay-container">
        <div class="menu-buttons">
          <ion-button id="open-modal" expand="block">Open</ion-button>
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
        </div>
      </div>

      <!-- <ion-button class="menu-btn top-right" @click="changeModel('./resources/banana_plant_with_pot.glb')"
          shape="round">
          Plante 1
        </ion-button>

        <ion-button class="menu-btn top-left" @click="changeModel('./resources/ducktoise.glb')" shape="round">
          Plante 2
        </ion-button>

        <ion-button class="menu-btn bottom-left" @click="changeModel('./resources/plants.glb')" shape="round">
          Plante 3
        </ion-button> -->

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
} from '@ionic/vue';
// import { OverlayEventDetail } from '@ionic/core/components';
import { ref } from 'vue';

const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

const modal = ref();
const input = ref();

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = input.value.$el.value;
  modal.value.$el.dismiss(name, 'confirm');
};

const onWillDismiss = (event) => {
  if (event.detail.role === 'confirm') {
    message.value = `Hello, ${event.detail.data}!`;
  }
}

const iframeSrc = ref("../../aframe-ar.html?model=./resources/banana_plant_with_pot.glb");

function changeModel(modelPath) {
  iframeSrc.value = `../../aframe-ar.html?model=${modelPath}`;
}
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

.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}

.menu-buttons {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.menu-btn {
  position: absolute;
  pointer-events: auto;
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

ion-button {
  --padding-top: 10px;
  --padding-bottom: 10px;
}
</style>