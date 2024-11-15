<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Shop</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="shop-content">
      <!-- Shop Items List -->
      <ion-list class="shop-list">
        <ion-item v-for="item in shopItems" :key="item.id" class="shop-item">
          <ion-avatar slot="start">
            <!-- <ion-img :src="item.icon" class="item-icon" /> -->
          </ion-avatar>
          <ion-label class="item-details">
            <!-- <span class="item-number">{{ item.number }}</span> -->
            <span class="item-name">{{ item.item_name }}</span>
            <p>{{ item.item_type }}</p>
          </ion-label>
          <ion-button color="success" class="purchase-button">
            {{ item.price }}
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {
  IonPage,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButton,
} from '@ionic/vue';

interface ShopItem {
  id: number;
  item_name: string;
  item_type: string;
  price: number;
}

const shopItems = ref<ShopItem[]>([]);

onMounted(async () => {
  const bearer = localStorage.getItem('accessToken');
  const options = {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  };

  try {
    const response = await axios.get('https://test.nanodata.cloud/test-shop', options);
    console.log(response.data)
    shopItems.value = response.data.shop_items;
  } catch (error) {
    console.error('Error fetching shop items:', error);
  }
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
