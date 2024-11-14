<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Shop</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="shop-content">
      <!-- Shop Items List -->
      <ion-list class="shop-list">
        <ion-item v-for="item in shopItems" :key="item.id" class="shop-item">
          <ion-avatar slot="start">
            <ion-img :src="item.icon" class="item-icon" />
          </ion-avatar>
          <ion-label class="item-details">
            <span class="item-number">{{ item.number }}</span>
            <span class="item-name">{{ item.name }}</span>
            <p>{{ item.description }}</p>
          </ion-label>
          <ion-button color="success" class="purchase-button">
            {{ item.priceText }}
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonImg, IonButtons, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonButton } from '@ionic/vue';
import axios from 'axios';

const shopItems = ref([
  { id: 1, number: 20, name: 'Seed', description: 'description', priceText: 'WATCH', icon: '/resources/seed-newplant.png' },
  { id: 2, number: 20, name: 'Sun', description: 'description', priceText: '$2.99', icon: '/resources/sun.png' },
  { id: 3, number: 20, name: 'Water', description: 'description', priceText: '$7.99', icon: '/resources/water.png' },
  { id: 4, number: 20, name: 'Seed', description: 'description', priceText: '$14.99', icon: '/resources/seed-newplant.png' },
  { id: 5, number: 20, name: 'Sun', description: 'description', priceText: '$30.99', icon: '/resources/sun.png' }
]);


const options = {
  headers: {
    'Authorization': 'Bearer your_token_here'
  }
};

axios.get('https://test.nanodata.cloud/', options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



</script>

<style scoped>
.shop-item {
  display: flex;
  align-items: center;
}



.item-number,
.item-name {
  margin-right: 10px;
}
</style>
