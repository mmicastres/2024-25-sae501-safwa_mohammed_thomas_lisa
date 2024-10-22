<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Accueil</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content fullscreen>
        <!-- Contenu de la page d'accueil -->
        <div class="menu-buttons">
          <!-- Bouton en haut à gauche -->
          <ion-button class="menu-btn top-left" @click="handleClick('left')">
            Menu Haut Gauche
          </ion-button>
  
          <!-- Bouton en haut à droite -->
          <ion-button class="menu-btn top-right" @click="handleClick('right')">
            Menu Haut Droite
          </ion-button>
  
          <!-- Bouton en bas à droite -->
          <ion-button class="menu-btn bottom-right" @click="handleClick('bottom')">
            Menu Bas Droite
          </ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  export default {
    name: 'Home',
    methods: {
      handleClick(position) {
        alert(`Menu ${position} cliqué !`);
      },
    },
  };
  </script>
  
  <style scoped>
  .menu-buttons {
    position: relative;
    height: 100%;
  }
  
  .menu-btn {
    position: absolute;
  }
  
  .top-left {
    top: 20px;
    left: 20px;
  }
  
  .top-right {
    top: 20px;
    right: 20px;
  }
  
  .bottom-right {
    bottom: 20px;
    right: 20px;
  }
  </style>
  