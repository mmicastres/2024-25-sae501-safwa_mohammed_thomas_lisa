<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button> <!-- Redirects to the homepage -->
        </ion-buttons>
        <ion-title>User Space</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list :inset="true">
        <ion-item>
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" justify="space-between">
            Dark Mode
          </ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ToggleCustomEvent } from '@ionic/vue';
import { IonPage, IonButtons, IonBackButton, IonRow, IonAvatar, IonCol, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonGrid, IonToggle } from '@ionic/vue';
const paletteToggle = ref(false);

// Add or remove the "ion-palette-dark" class on the html element
const toggleDarkPalette = (shouldAdd: boolean) => {
  document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
};

// Check/uncheck the toggle and update the palette based on isDark
const initializeDarkPalette = (isDark: boolean) => {
  paletteToggle.value = isDark;
  toggleDarkPalette(isDark);
};

// Listen for the toggle check/uncheck to toggle the dark palette
const toggleChange = (ev: ToggleCustomEvent) => {
  const isChecked = ev.detail.checked;
  toggleDarkPalette(isChecked);
  // Save the user's preference in localStorage
  localStorage.setItem('isDarkMode', JSON.stringify(isChecked));
};

// On mount, check localStorage for the user's theme preference
onMounted(() => {
  const isDark = JSON.parse(localStorage.getItem('isDarkMode') || 'false');
  initializeDarkPalette(isDark);
});
</script>

<style scoped>
ion-col {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}

ion-item {
  --background: transparent;
}
</style>
