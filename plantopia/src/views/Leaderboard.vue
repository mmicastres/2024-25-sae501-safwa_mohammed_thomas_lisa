<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="transparent-toolbar">
        <!-- Bouton retour sans texte, avec une flèche -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" text="" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Section avec rang et points de l'utilisateur actuel -->
      <div class="header">
        <h2>Leaderboard</h2>
        <div class="space-between">
          <div class="followings">
            <h3>Rank</h3>
            <p>{{ currentUserRank || "N/A" }}</p> <!-- Affiche le rang -->
          </div>
          <div class="followings">
            <h3>Points</h3>
            <p>{{ currentUser.points }}</p> <!-- Affiche les points -->
          </div>
        </div>
      </div>

      <!-- Liste des joueurs classés -->
      <section>
        <ion-grid>
          <ion-list :inset="true">
            <ion-item :class="{ 'current-user': user.id === currentUser.id }"
              v-for="(user, index) in leaderboard.slice(0, 10)" :key="index" lines="none">
              <ion-label>
                <span class="rank-badge">{{ index + 1 }}</span>
                {{ user.username }}
              </ion-label>
              <ion-note slot="end">{{ user.points }} pts</ion-note>
            </ion-item>
          </ion-list>
        </ion-grid>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import {
  IonPage,
  IonNote,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';

// Déclarations des variables réactives
const leaderboard = ref<{ id: number, username: string, points: number }[]>([]);
const currentUserRank = ref<number | null>(null);
const currentUser = ref<{ id: number; username: string; points: number }>({ id: 0, username: "", points: 0 });

onMounted(() => {
  const bearer = localStorage.getItem('token');

  const options = {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  };

  // Récupérer les données de l'utilisateur actuel
  axios
    .get('https://test.nanodata.cloud/test', options)
    .then((response) => {
      const userData = response.data;
      currentUser.value = {
        id: userData.id,
        username: userData.username,
        points: userData.points || 0
      };

      // Ensuite, récupérer la liste des utilisateurs
      return axios.get('https://test.nanodata.cloud/test-users', options);
    })
    .then((response) => {
      // Trier les utilisateurs par points décroissants
      leaderboard.value = response.data.users
        .map((user: any) => ({
          username: user.username,
          points: user.points || 0
        }))
        .sort((a: any, b: any) => b.points - a.points);

      // Trouver le classement de l'utilisateur actuel
      currentUserRank.value = leaderboard.value.findIndex(user => user.username === currentUser.value.username) + 1;
    })
    .catch((error) => {
      console.error('Erreur lors du chargement des données:', error);
      alert('Impossible de charger le classement. Veuillez réessayer plus tard.');
    });
});
</script>


<style scoped>
ion-content {
  --background: url('../../resources/backgroundLead.png') no-repeat center center / cover;
}


.transparent-toolbar {
  --background: transparent;
  /* --box-shadow: none; */
}

ion-back-button {
  --color: white;
  --border-radius: 50%;
}

.rank-badge {
  display: inline-block;
  padding: 5px 8px;
  margin-right: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  font-weight: bold;
  font-size: 12px;
  color: black;
  text-align: center;
}

.header {
  height: 30%;
  width: 100%;
  padding-top: 1px;
}

.header h2 {
  color: white;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
}

.space-between {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.followings {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.followings h3 {
  color: white;
  font-size: 18px;
  margin: 0;
}

.followings p {
  color: white;
  margin: 5px 0 0 0;
  font-size: 24px;
  font-weight: bold;
}

ion-list {
  margin-top: 20px;
}

section {
  z-index: 5;
  background-color: #F1F5E7;
  border-radius: 20px 20px 0 0px;
}

ion-list {
  background-color: #F1F5E7;
}

ion-item {
  --inner-border-width: 0px;
  --padding-start: 16px;
  --padding-end: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ion-label {
  font-size: 16px;
  font-weight: normal;
}
</style>
