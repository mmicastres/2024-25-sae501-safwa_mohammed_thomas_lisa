<template>
  <ion-page>
    <ion-content fullscreen>

      <iframe :src="iframeSrc" frameborder="0"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: auto;"
        allow="camera; fullscreen">
      </iframe>
      <ion-button id="open-profile" class="profile-button" @click="openProfileModal">
        <ion-icon :icon="personCircle" />
      </ion-button>

      <ion-button id="open-info" @click="isInfoOpen = true">
        <ion-icon :icon="informationCircle" color="dark" />
      </ion-button>

      <ion-modal :is-open="isModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button strong @click="confirm">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
              v-model="userName"
              label="Enter your name"
              label-placement="stacked"
              type="text"
              placeholder="Your name"
            ></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>

      <ion-modal :is-open="isInfoOpen">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="fermer">Fermer</ion-button>
            </ion-buttons>
            <ion-title>Informations</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="ion-padding">
            <h2 class="Titleplant">{{ plantName }}</h2>
            <img :src="plantImage" alt="Plant" class="photoplant" />
            <p>{{ plantDesc }}</p>
          </div>
        </ion-content>
      </ion-modal>

      <ion-modal :is-open="isProfileModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="closeProfileModal">Close</ion-button>
            </ion-buttons>
            <ion-title>Profile</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="profile-modal">
            <ion-avatar>
              <img :src="profileAvatar" alt="Avatar" />
            </ion-avatar>
            <h2>{{ profileName }}</h2>
            <p>Points: {{ profilePoints }}</p>
          </div>
          <ion-list>
            <ion-list-header>
              <ion-label>Leaderboard</ion-label>
            </ion-list-header>
            <ion-item v-for="user in leaderboard" :key="user.id">
              <ion-label>
                <h2>{{ user.username }}</h2>
                <p>Points: {{ user.points }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonIcon,
  IonPage,
  IonList,
  IonListHeader,
  IonLabel,
  IonAvatar,
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { informationCircle, personCircle } from 'ionicons/icons';
import axios from 'axios';
import { Preferences } from '@capacitor/preferences';
import { useRouter } from 'vue-router';

const router = useRouter();

const iframeSrc = ref("../../aframe-ar.html?model=./model/banana_plant_with_pot.glb");


const plantData = ref(JSON.parse(localStorage.getItem('model')));

const plantName = ref('Default Plant')
const plantDesc = ref('Default description')
const plantImage = ref('/assets/default.jpg')

const isModalOpen = ref(false);
const isInfoOpen = ref(false);
const isProfileModalOpen = ref(false);
const userName = ref('');

const profileName = ref('');
const profilePoints = ref(0);
const profileAvatar = ref('https://api.dicebear.com/9.x/icons/svg?seed=Default');
const leaderboard = ref([]);

const cancel = () => {
  isModalOpen.value = false;
};

const confirm = () => {
  message.value = `Hello, ${userName.value}!`;
  isModalOpen.value = false;
};

const fermer = () => {
  isInfoOpen.value = false;
};

const openProfileModal = () => {
  isProfileModalOpen.value = true;
};

const closeProfileModal = () => {
  isProfileModalOpen.value = false;
};

function updatePlantData() {
  console.log('Updating plant data...');
  const storedPlantData = localStorage.getItem('model');
  if (storedPlantData) {
    try {
      const parsed = JSON.parse(storedPlantData);
      plantName.value = parsed.name || plantName.value;
      plantDesc.value = parsed.description || plantDesc.value;
      plantImage.value = parsed.imageSrc || plantImage.value;
    } catch (error) {
      console.error('Error parsing plant data from localStorage:', error);
    }
  }
}


onMounted(async () => {
  const { value: token } = await Preferences.get({ key: 'access_token' });
  console.log('Token:', token);
  setInterval(updatePlantData, 500)
  if (!token || token.toLowerCase() == "secondconnexion") {
    router.replace('/login');
    return;
  }

  try {
    const response = await axios.get('https://test.nanodata.cloud/test', {
      headers: { Authorization: `Bearer ${token}` },
    });
    profileName.value = response.data.username;
    profilePoints.value = response.data.points;
    profileAvatar.value = `https://api.dicebear.com/9.x/icons/svg?seed=${response.data.username}`;
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }

  try {
    const response = await axios.get('https://test.nanodata.cloud/test-users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    leaderboard.value = response.data.users.sort((a, b) => b.points - a.points);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
});
</script>

<style scoped>
body,
html,
ion-page,
ion-content {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.profile-button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  --border-radius: 50px;
  --padding-start: 16px;
  --padding-end: 16px;
  --font-weight: bold;
  --background: transparent;
  --color: rgb(0, 0, 0);
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  border: 2px solid transparent;
}

#open-modal,
#open-info {
  --border-radius: 50px;
  --padding-start: 16px;
  --padding-end: 16px;
  --font-weight: bold;
  --background: transparent;
  --color: rgb(0, 0, 0);
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  outline: none;
  border: 2px solid transparent;
}

#open-modal:hover,
#open-info:hover,
.profile-button:hover {
  transform: scale(1.05);
  --background: transparent;
  --box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

#open-modal:focus,
#open-info:focus,
.profile-button:focus {
  transform: scale(1.05);
  --background: transparent !important;
  --box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  outline: none;
  border-color: transparent;
}

#open-modal:active,
#open-info:active,
.profile-button:active {
  --background: transparent !important;
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1);
}

#open-modal {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

#open-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.profile-modal {
  text-align: center;
  margin-bottom: 16px;
}

.profile-modal ion-avatar {
  margin: 0 auto;
  width: 100px;
  height: 100px;
}

.Titleplant {
  text-align: center;
}
</style>
