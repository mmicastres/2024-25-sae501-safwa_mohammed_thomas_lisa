<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Bouton retour -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" /> <!-- Redirige vers la page d'accueil -->
        </ion-buttons>
        <ion-title>Leaderboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- User Profile at the bottom in an absolute position -->
      <div class="header">
        <h2>Leaderboard</h2>
        <div class="space-between">
          <div class="followings">
            <h3>Rank</h3>
            <p>2</p>
          </div>
          <div class="followings">
            <h3>Points</h3>
            <p>143</p>
          </div>
        </div>
      </div>
      <!-- Liste des personnes les mieux classés -->
      <ion-grid>
        <ion-list :inset="true">
          <ion-item lines="none">
            <ion-label>Pokémon Yellow</ion-label>
            <ion-note>Default Note</ion-note>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Mega Man X</ion-label>
            <ion-note>Default Note</ion-note>
          </ion-item>
          <ion-item lines="none">
            <ion-label>The Legend of Zelda</ion-label>
            <ion-note>Default Note</ion-note>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Pac-Man</ion-label>
            <ion-note>Default Note</ion-note>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Super Mario World</ion-label>
            <ion-note>Default Note</ion-note>
          </ion-item>
        </ion-list>
      </ion-grid>
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

const leaderboard = ref([]);

const option = {
  headers: {
    Authorization: ' '
  }
};

onMounted(() => {
  axios
    .get('https://test.nanodata.cloud/test-users', option)
    .then((response) => {
      leaderboard.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('https://test.nanodata.cloud/signin', {
      username: username,
      password: password
    });

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Stockage du token
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    console.log('Connexion réussie ! Token obtenu:', accessToken);
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
  }
};

login('testuser', 'securepassword123');
</script>

<style scoped>
ion-content {
  --background: white;
}

.header {
  height: 180px;
  background: linear-gradient(to bottom right, #c5e6c6, #42e94d);
  width: 100%;
  padding-top: 1px;
  box-shadow: 0px -5px 20px rgb(0, 0, 0);
  border-bottom: 2px solid #42e94d;
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

ion-item {
  --inner-border-width: 0px; /* Supprimer le trait sous chaque item */
  --background: #f9f9f9;
  --padding-start: 16px;
  --padding-end: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ion-item:hover {
  background-color: #f0f0f0;
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
