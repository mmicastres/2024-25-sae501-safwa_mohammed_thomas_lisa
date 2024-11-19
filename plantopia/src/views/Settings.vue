<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>User Space</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list :inset="true">
        <ion-item>
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange" justify="space-between">
            Dark Mode
          </ion-toggle>
        </ion-item>
      </ion-list>
      <!-- Profil utilisateur -->
      <ion-grid class="ion-padding">
        <ion-row class="ion-justify-content-center">
          <ion-avatar class="user-avatar">
            <!-- Avatar de l'utilisateur -->
            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="User Avatar" />
          </ion-avatar>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <h2 class="user-name">{{ userName }}</h2> <!-- Affichage du prénom -->
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <p class="user-bio">{{ userRole }}</p> <!-- Affichage du rôle dynamique -->
        </ion-row>
      </ion-grid>

      <!-- Affichage du score de l'utilisateur -->
      <ion-grid class="ion-padding">
        <ion-row class="ion-justify-content-center">
          <ion-label class="score-label">Score: {{ userScore }}</ion-label> <!-- Affichage du score -->
        </ion-row>
      </ion-grid>

      <!-- Historique des entretiens -->
      <ion-list :inset="true" class="history-list">
        <ion-list-header class="list-header">
          <ion-label>Historique des entretiens</ion-label>
        </ion-list-header>
        <ion-item v-for="(item, index) in history" :key="index">
          <ion-label>
            <h2>{{ item.date }}</h2>
            <p>{{ item.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Plantes favorites -->
      <ion-list :inset="true" class="favorites-list">
        <ion-list-header class="list-header">
          <ion-label>Plantes Favorites</ion-label>
        </ion-list-header>
        <ion-item v-for="(plant, index) in favoritePlants" :key="index">
          <ion-avatar slot="start">
            <!-- Image de la plante -->
            <img :src="plant.image" alt="Plant Image" />
          </ion-avatar>
          <ion-label>
            <h2>{{ plant.name }}</h2>
            <p class="plant-description">{{ plant.description }}</p> <!-- Ajout de la classe pour le texte -->
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ToggleCustomEvent } from '@ionic/vue';
import { IonPage, IonButtons, IonBackButton, IonRow, IonAvatar, IonCol, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonGrid, IonToggle } from '@ionic/vue';

const paletteToggle = ref(false);
const toggleDarkPalette = (shouldAdd: boolean) => {
  document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
};

// Données de l'utilisateur
const userName = ref("John Doe"); // Remplacer par le prénom réel de l'utilisateur
const userScore = ref(1500); // Remplacer par le score réel de l'utilisateur
const userRole = ref("Double Pousse (Grow Booster)"); // Rôle dynamique pour l'utilisateur

const initializeDarkPalette = (isDark: boolean) => {
  paletteToggle.value = isDark;
  toggleDarkPalette(isDark);
};

// Historique des entretiens
const history = ref([
  { date: "11/11/2024", description: "Gérer l'ensoleillement" },
  { date: "10/11/2024", description: "Arroser la plante" },
  { date: "09/11/2024", description: "Planter une graine" },
]);

// Plantes favorites
const favoritePlants = ref([
  { name: "Tulipe", description: "Plante printanière aux couleurs vives." },
  { name: "Cactus", description: "Plante robuste et peu exigeante, idéale pour les intérieurs ensoleillés." },
  { name: "Monstera", description: "Plante tropicale aux larges feuilles perforées, parfaite pour décorer les intérieurs." },
]);

const toggleChange = (ev: ToggleCustomEvent) => {
  const isChecked = ev.detail.checked;
  toggleDarkPalette(isChecked);
  // Save the user's preference in localStorage
  localStorage.setItem('isDarkMode', JSON.stringify(isChecked));
};

// Liste des rôles disponibles
const roles = [
  { name: 'Double Pousse (Grow Booster)', description: 'Double la vitesse de croissance des plantes lorsqu\'elles sont arrosées' },
  { name: 'Saboteur', description: 'Ralentit ou recule la croissance, pouvant causer la perte de feuilles' },
  { name: 'Protecteur (Guardian)', description: 'Protège une plante contre la mort ou les effets négatifs pendant 24 heures' },
  { name: 'Neutre (Neutral)', description: 'Arrosage normal sans effets visuels ni influence sur la croissance' },
];

// Attribuer un rôle aléatoire chaque jour
const assignRandomRole = () => {
  const today = new Date().toDateString(); // Utilisation de la date du jour pour générer un rôle unique chaque jour
  const randomIndex = Math.abs(today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % roles.length);
  userRole.value = `${roles[randomIndex].name}`; // Assigner le rôle aléatoire
};

onMounted(() => {
  // Get the user's dark mode preference from localStorage
  const isDark = JSON.parse(localStorage.getItem('isDarkMode') || 'false');
  initializeDarkPalette(isDark);
  assignRandomRole(); // Attribue un rôle aléatoire lorsque la page est montée
});
</script>

<style scoped>
.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: solid 3px #135d54;
  background-color: white;
}

.user-name {
  font-weight: bold;
  font-size: 1.8rem;
  color: #135d54;
  text-align: center;
}

.user-bio {
  color: #555;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-style: italic;
}

.score-label {
  font-weight: bold;
  color: #135d54;
  font-size: 1.2rem;
  text-align: center;
}

.history-list ion-item,
.favorites-list ion-item {
  --background: transparent;
  color: #135d54;
}

.list-header ion-label {
  font-size: 1.2rem;
  color: #135d54;
  font-weight: bold;
}

ion-item p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

.plant-description {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #333;
  padding-top: 10px;
  /* Ajout d'un espace pour libérer le texte sous la barre de navigation */
}

ion-content {
  padding-top: 50em;
  /* Espace ajouté avant la barre de navigation pour le contenu */
}
</style>