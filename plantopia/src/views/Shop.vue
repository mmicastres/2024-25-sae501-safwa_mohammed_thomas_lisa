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

    <!-- Content -->
    <ion-content fullscreen>
      <!-- Produits -->
      <div class="products-section">
        <div class="product-list">
          <ion-card v-for="product in shopItems" :key="product.id" class="product-card">
            <img :src="product.image || 'https://via.placeholder.com/150'" alt="Product image" />
            <ion-card-content>
              <h3>{{ product.item_name }}</h3> <!-- Product Name -->
              <p>{{ product.item_type }}</p>  <!-- Product Type -->
              <p>Price: {{ product.price}} pts</p> <!-- Product Price -->
              <ion-button color="success" class="purchase-button">
           Buy
          </ion-button>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
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
  IonCardContent,
  IonIcon,
  IonCard,
  IonButton,
} from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';
import api from '../api';

interface ShopItem {
  id: number;
  item_name: string;
  item_type: string;
  price: number;
  image: string;  
}

const shopItems = ref<ShopItem[]>([]);

onMounted(async () => {
  const { value: bearer } = await Preferences.get({ key: 'token' });
  const options = {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  };

  try {
    const response = await api.get('https://test.nanodata.cloud/test-shop', options);
    shopItems.value = response.data.shop_items.map((item: any) => ({
      ...item,
      image: item.image || 'https://via.placeholder.com/150' 
    }));
  } catch (error) {
    console.error('Error fetching shop items:', error);
  }
});
</script>

<style scoped>
/* Global reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Section Produits populaires */
.products-section {
  padding: 10px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.product-card {
  flex: 1 1 calc(50% - 10px);
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.product-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.product-card ion-card-content {
  padding: 10px;
}

.product-card ion-button {
  margin-top: 10px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
