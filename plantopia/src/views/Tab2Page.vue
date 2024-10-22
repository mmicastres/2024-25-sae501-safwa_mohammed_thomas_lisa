<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <!-- Bouton retour -->
          <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button> <!-- Redirige vers la page d'accueil -->
        </ion-buttons>
        <ion-title>Shop</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Available Items</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="item in shopItems" :key="item.id">
          <ion-label>
            <h2>{{ item.name }}</h2>
            <p>Price: {{ item.price }} coins</p>
          </ion-label>
          <ion-button slot="end" color="success">Buy</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage,IonButtons,IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';

// Example shop items
const shopItems = ref([
  { id: 1, name: 'Health Potion', price: 10 },
  { id: 2, name: 'Mana Potion', price: 15 },
  { id: 3, name: 'Sword', price: 100 },
  { id: 4, name: 'Shield', price: 75 }
]);
</script>

<style scoped>
/* Ajoute des styles personnalisés si nécessaire */
</style>
