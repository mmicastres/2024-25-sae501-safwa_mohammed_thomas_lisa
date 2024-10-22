<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Bouton retour vers la page d'accueil -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button> <!-- Redirection vers la page d'accueil -->
        </ion-buttons>
        <ion-title>Shop</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Liste des items disponibles à l'achat -->
      <ion-list>
        <ion-item v-for="item in shopItems" :key="item.id">
          <ion-label>
            <h2>{{ item.name }}</h2> <!-- Nom de l'item -->
            <p>Price: {{ item.price }} coins</p> <!-- Prix de l'item -->
          </ion-label>
          <ion-button slot="end" color="success">Buy</ion-button> <!-- Bouton d'achat -->
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonButtons, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';

// Données exemple pour les items du magasin
const shopItems = ref([
  { id: 1, name: 'Health Potion', price: 10 }, // Potion de santé
  { id: 2, name: 'Mana Potion', price: 20 },  // Potion de mana
  { id: 3, name: 'Sword', price: 5 },        // Épée
  { id: 4, name: 'Shield', price: 15 }        // Bouclier
]);
</script>

<style scoped>
/* Ajoute des styles personnalisés si nécessaire */
</style>
