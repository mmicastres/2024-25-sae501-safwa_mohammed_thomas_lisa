<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Bouton retour -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" /> <!-- Redirige vers la page d'accueil -->
        </ion-buttons>
        <ion-title>Leaderboard</ion-title>
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
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';

const leaderboard = ref<{ id: number, username: string, points: number }[]>([]);
const currentUserRank = ref<number | null>(null);
const currentUser = ref<{ id: number; username: string; points: number }>({ id: 0, username: "", points: 0 });

const options = {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzMxNjc4OTc5LCJqdGkiOiI2ODIzZjhkNS04NjI4LTQ3ZWQtYjFkMy1mNTJlZGZhYWFkMmQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxOCwibmJmIjoxNzMxNjc4OTc5LCJjc3JmIjoiMjEyMTI4ZWUtYzJiNC00MWQ4LWE3NjQtZDMzMDQ1NWRhYzFmIiwiZXhwIjoxNzM0MjcwOTc5fQ.49G0BDAWA6KYSdocMBzZs1V7_arPC0lrJTmSH2XsDsE"
  }
};

onMounted(() => {
  axios

    .get('https://test.nanodata.cloud/test', options)
    .then((response) => {
      // Récupérer les données de l'utilisateur connecté
      const userData = response.data;
      currentUser.value = {
        id: userData.id,
        username: userData.username,  // Nom de l'utilisateur
        points: userData.points || 0  // Points de l'utilisateur (s'il y en a)
      };

      return axios.get('https://test.nanodata.cloud/test-users', options);
    })
    .then((response) => {
      // Extraire et trier les utilisateurs par points décroissants
      leaderboard.value = response.data.users
        .map((user: any) => ({
          username: user.username,  // Nom d'utilisateur
          points: user.points || 0  // Points de l'utilisateur (par défaut 0)
        }))
        .sort((a: any, b: any) => b.points - a.points);  // Trier par points décroissants

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
  --background: linear-gradient(217deg, #2CD58F, #0FD3AC 70.71%, #006F7F);
}

.rank-badge {
  display: inline-block;
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #ffffff;
  border: 2px solid rgb(189, 189, 189);
  border-radius: 20px; 
  font-weight: bold;
  font-size: 18px;
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
  background-color: #FAFAFA;
  border-radius: 20px 20px 0 0px;
}

ion-list {
  background-color: #FAFAFA;
}

ion-item {
  --inner-border-width: 0px;
  --padding-start: 16px;
  --padding-end: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ion-label {
  font-size: 16px;
  font-weight: normal;
}

/* Style pour la section des points des utilisateurs */
.user-points {
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.user-points h3 {
  font-size: 18px;
  color: #42e94d;
  margin-bottom: 15px;
  text-align: center;
}

.points-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.points-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.points-item:hover {
  background-color: #f0f0f0;
}

.username {
  font-weight: bold;
}

.points {
  font-size: 18px;
  color: #42e94d;
}
</style>
