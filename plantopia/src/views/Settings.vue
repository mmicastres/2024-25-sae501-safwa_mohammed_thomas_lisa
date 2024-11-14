<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
       <!-- Bouton retour vers la page d'accueil -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button> <!-- Redirection vers la page d'accueil -->
        </ion-buttons>
        <ion-title>Inventory</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list-header>Appearance</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" justify="space-between">Dark
            Mode</ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonButtons, IonListHeader, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';
import type { ToggleCustomEvent } from '@ionic/vue';
import { personCircle, personCircleOutline, sunnyOutline, sunny } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    IonPage,
    IonTitle,
    IonListHeader,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonToolbar,
  },
  setup() {
    const paletteToggle = ref(false);

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Add or remove the "ion-palette-dark" class on the html element
    const toggleDarkPalette = (shouldAdd: boolean | undefined) => {
      document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    };

    // Check/uncheck the toggle and update the palette based on isDark
    const initializeDarkPalette = (isDark: boolean ) => {
      paletteToggle.value = isDark;
      toggleDarkPalette(isDark);
    };

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));

    // Listen for the toggle check/uncheck to toggle the dark palette
    const toggleChange = (ev: ToggleCustomEvent) => {
      toggleDarkPalette(ev.detail.checked);
    };

    return {
      personCircle,
      personCircleOutline,
      sunnyOutline,
      sunny,
      initializeDarkPalette,
      toggleChange,
      toggleDarkPalette,
      paletteToggle,
    };
  },
});
</script>

<style>
/* (Optional) This is added to prevent the flashing that happens when toggling between palettes */
ion-item {
  --transition: none;
}
</style>