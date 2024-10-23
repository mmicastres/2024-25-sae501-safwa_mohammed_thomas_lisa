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
      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="item in shopItems" :key="item.id">
            <ion-card>
              <img alt="Item Image" :src="item.img" />
              <ion-card-header>
                <ion-card-title>{{ item.name }}</ion-card-title>
                <ion-card-subtitle>{{item.description}}</ion-card-subtitle>
              </ion-card-header>
              <div style="display: flex; justify-content:right; align-items: right; padding: 16px;">
                <ion-button color="new">                 
                  {{ item.price }}
                  <ion-icon slot="end" :icon="leaf"></ion-icon>
                </ion-button>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonButtons, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/vue';
import { heart,leaf } from 'ionicons/icons';

// Données exemple pour les items du magasin
const shopItems = ref([
  { id: 1, name: 'Health Potion', price: 10, description:'healthy behavior or whatever',img:'/resources/seed-newplant.png' }, // Potion de santé
  { id: 2, name: 'Mana Potion', price: 20, description:'the stuff for your powers to work', img:'/resources/sun.png'},  // Potion de mana
  { id: 3, name: 'Sword', price: 5, description:'all the fighters need their swords', img:'/resources/water.png'} ,// Épée
  { id: 4, name: 'Shield', price: 15, description:'protect yourself so you wont die as fast', img:'/resources/croix.png'}    // Bouclier
]);
</script>

<style scoped>
/* Ajoute des styles personnalisés si nécessaire */
</style>
