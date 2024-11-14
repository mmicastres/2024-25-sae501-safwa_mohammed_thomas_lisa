<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
       <!-- Bouton retour vers la page d'accueil -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button> <!-- Redirection vers la page d'accueil -->
        </ion-buttons>
        <ion-title>Inventory</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Liste des items de l'inventaire -->
      <ion-list>
        <ion-item v-for="item in inventoryItems" :key="item.id">
          <ion-label>
            <h2>{{ item.name }}</h2> <!-- Nom de l'item -->
            <p>Quantity: {{ item.quantity }}</p> <!-- Quantité de l'item -->
          </ion-label>
          <ion-button slot="end" color="primary">Use</ion-button> <!-- Bouton pour "utiliser" l'item -->
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonButtons, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';

// Exemple de données pour les items de l'inventaire
const inventoryItems = ref([
  { id: 1, name: 'Health Potion', quantity: 5 }, // Potion de santé
  { id: 2, name: 'Mana Potion', quantity: 3 },  // Potion de mana
  { id: 3, name: 'Sword', quantity: 1 },        // Épée
  { id: 4, name: 'Shield', quantity: 1 }        // Bouclier
]);
</script>

<style scoped>
/* Ajoute des styles personnalisés si nécessaire */
</style>