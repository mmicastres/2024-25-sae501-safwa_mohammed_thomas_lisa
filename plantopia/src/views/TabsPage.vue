<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="inventory">
          <ion-icon aria-hidden="true" :icon="library" />
          <ion-label>Inventory</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="shop">
          <ion-icon aria-hidden="true" :icon="storefront" />
          <ion-label>Shop</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { library, storefront } from 'ionicons/icons';
</script>
