<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Leaderboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Top Players</ion-title>
        </ion-toolbar>
      </ion-header>

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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonList, IonAvatar } from '@ionic/vue';

// Exemple de données pour le leaderboard
const leaderboard = ref([
  { id: 1, name: 'Pokémon Yellow', score: 1500, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
  { id: 2, name: 'Mega Man X', score: 1400, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
  { id: 3, name: 'The Legend of Zelda', score: 1300, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
  { id: 4, name: 'Pac-Man', score: 1200, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
  { id: 5, name: 'Super Mario World', score: 1100, avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
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
  --background: transparent; /* Optionnel : pour un fond transparent sur les items */
}
</style>
