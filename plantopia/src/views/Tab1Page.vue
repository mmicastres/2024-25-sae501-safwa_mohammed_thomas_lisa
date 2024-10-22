<template>
 <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Bouton retour -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button> <!-- Redirige vers la page d'accueil -->
        </ion-buttons>
        <ion-title>Inventory</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Your Items</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="item in inventoryItems" :key="item.id">
          <ion-label>
            <h2>{{ item.name }}</h2>
            <p>Quantity: {{ item.quantity }}</p>
          </ion-label>
          <ion-button slot="end" color="primary">Use</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage,IonButtons,IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';

// Example inventory items
const inventoryItems = ref([
  { id: 1, name: 'Health Potion', quantity: 5 },
  { id: 2, name: 'Mana Potion', quantity: 3 },
  { id: 3, name: 'Sword', quantity: 1 },
  { id: 4, name: 'Shield', quantity: 1 }
]);
</script>

<style scoped>
/* Ajoute des styles personnalisés si nécessaire */
</style>
