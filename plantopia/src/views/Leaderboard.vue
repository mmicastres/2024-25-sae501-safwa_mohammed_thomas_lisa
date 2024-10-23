<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Bouton retour -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button> <!-- Redirige vers la page d'accueil -->
        </ion-buttons>
        <ion-title>Leaderboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
       <!-- Liste des personnes les mieux classés -->
      <ion-grid>
        <ion-row>
          <ion-col size="4">Rank</ion-col>
          <ion-col size="8">Player</ion-col>
        </ion-row>
      </ion-grid>

      <ion-list>
        <ion-item v-for="(player, index) in leaderboard" :key="player.id">
          <ion-avatar aria-hidden="true" slot="start">
            <img :src="player.avatar" alt="Player Avatar" />
          </ion-avatar>
          <ion-label>
            <h2>{{ index + 1 }}. {{ player.name }}</h2>
            <p>Score: {{ player.score }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonButtons, IonBackButton, IonRow, IonAvatar, IonCol, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';

// Exemple de données pour le leaderboard avec des noms réalistes
const leaderboard = ref([
  { id: 1, name: 'John Doe', score: 1500, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
  { id: 2, name: 'Jane Smith', score: 1400, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
  { id: 3, name: 'Carlos Santana', score: 1300, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
  { id: 4, name: 'Anna Lee', score: 1200, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
  { id: 5, name: 'Mark Spencer', score: 1100, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
]);
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
  /* Optionnel : pour un fond transparent sur les items */
}
</style>
