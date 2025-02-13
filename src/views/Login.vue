<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>{{ header }}</ion-title>
          <ion-buttons slot="end" v-if="native">
            <ion-button @click="PresentServerModal" color="success">
              <ion-icon :icon="cogOutline" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen class="ion-padding login-content">
        <div class="login-container">
          <ion-avatar class="logo-avatar">
            <img src="/logo.png" alt="Logo" />
          </ion-avatar>
          <ion-card class="login-card">
            <ion-card-header>
              <ion-card-title>Login / Register</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-list lines="full">
                <ion-item>
                  <ion-label position="stacked">Username</ion-label>
                  <ion-input
                    required
                    type="text"
                    placeholder="Enter your username"
                    v-model="username"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="stacked">Password</ion-label>
                  <ion-input
                    required
                    type="password"
                    placeholder="Enter your password"
                    v-model="password"
                  ></ion-input>
                </ion-item>
              </ion-list>
              <div class="action-buttons">
                <ion-button
                  expand="block"
                  color="success"
                  @click="submitForm('login')"
                  v-if="!showRegister"
                >
                  Login
                </ion-button>
                <ion-button
                  expand="block"
                  color="success"
                  @click="submitForm('register')"
                  v-if="showRegister"
                >
                  Register
                </ion-button>
              </div>
              <div class="link-container">
                <a href="#" @click.prevent="toggleForm">
                  {{ showRegister ? 'Already have an account?' : "Don't have an account?" }}
                </a>
                <a href="#" @click.prevent="openResetPasswordModal">
                  Forgot your password?
                </a>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        <ion-toast
          :is-open="toast.isOpen"
          :message="toast.message"
          :duration="toast.duration"
          @did-dismiss="dismissToast"
        ></ion-toast>
      </ion-content>
  
      <ion-modal :is-open="isServerModalOpen" @did-dismiss="closeServerModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Servers</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeServerModal" color="success">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Server IP/Address</ion-label>
            <ion-input placeholder="Enter server IP" v-model="serverAddress"></ion-input>
          </ion-item>
          <ion-list>
            <ion-item
              v-for="server in servers"
              :key="server.id"
              @click="handlServerClick(server)"
            >
              {{ server.name }}
              <ion-avatar slot="end">
                <img :src="getLanguageIconUrl(server.type)" class="lang-icon" />
              </ion-avatar>
            </ion-item>
          </ion-list>
        </ion-content>
        <ion-footer>
          <ion-toolbar>
            <ion-button @click="handleServerSetting" expand="block" color="success">
              Set Server
            </ion-button>
            <ion-button
              @click="handleServerDefault"
              color="danger"
              expand="block"
            >
              Set Default
            </ion-button>
          </ion-toolbar>
        </ion-footer>
      </ion-modal>
  
      <ion-modal :is-open="isResetPasswordModalOpen" @did-dismiss="closeResetPasswordModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Reset Password</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeResetPasswordModal" color="success">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">User Secret</ion-label>
            <ion-input placeholder="Enter your user secret" v-model="userSecret"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">New Password</ion-label>
            <ion-input
              type="password"
              placeholder="Enter your new password"
              v-model="newPassword"
            ></ion-input>
          </ion-item>
        </ion-content>
        <ion-footer>
          <ion-toolbar>
            <ion-button expand="block" color="success" @click="resetPassword">
              Reset Password
            </ion-button>
          </ion-toolbar>
        </ion-footer>
      </ion-modal>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAvatar,
    IonToast,
    IonFooter,
    IonHeader,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonModal,
  } from '@ionic/vue';
  import axios from 'axios';
  import { Preferences } from '@capacitor/preferences';
  import router from '../router';
  import { cogOutline } from 'ionicons/icons';
  import { Capacitor } from '@capacitor/core';
  
  const username = ref('');
  const password = ref('');
  const isServerModalOpen = ref(false);
  const isResetPasswordModalOpen = ref(false);
  const userSecret = ref('');
  const newPassword = ref('');
  const serverAddress = ref('');
  const servers = ref([]);
  const showRegister = ref(false);
  const header = ref('Plantopia'); 
  const native = Capacitor.getPlatform() !== 'web';
  const base_url = "https://test.nanodata.cloud";
  const toast = ref({
    isOpen: false,
    message: '',
    duration: 2000,
  });
  
  const setDefault = async () => {
    let userPrefs = await Preferences.get({ key: 'user' });
    if (!userPrefs.value) {
      await Preferences.set({
        key: 'user',
        value: JSON.stringify({ url: base_url }),
      });
    }
  };
  
  const checkuserurl = async () => {
    let userPrefs = await Preferences.get({ key: 'user' });
    if (!userPrefs.value) {
      setDefault();
    }
  };
  
  const presentToast = (message: string, duration = 2000) => {
    toast.value = { isOpen: true, message, duration };
  };
  
  const dismissToast = () => {
    toast.value.isOpen = false;
  };
  
  const PresentServerModal = () => {
    isServerModalOpen.value = true;
  };
  
  const closeServerModal = () => {
    isServerModalOpen.value = false;
  };
  
  const openResetPasswordModal = () => {
    isResetPasswordModalOpen.value = true;
  };
  
  const closeResetPasswordModal = () => {
    isResetPasswordModalOpen.value = false;
  };
  
  const toggleForm = () => {
    showRegister.value = !showRegister.value;
  };
  
  const submitForm = async (action: 'login' | 'register') => {
    try {
      const url = `${base_url}/${action === 'login' ? 'signin' : 'register'}`;
      const response = await axios.post(url, {
        username: username.value,
        password: password.value,
      });
      if (response.data.error) {
        presentToast(response.data.error);
      } else {
        await Preferences.set({
          key: 'user',
          value: JSON.stringify({
            username: username.value,
            secret_key: response.data.secret_key,
            url: base_url,
          }),
        });
        await Preferences.set({
          key: 'private_key',
          value: JSON.stringify({
            private_key: response.data.private_key,
            refresh_key: response.data.refresh_key,
          }),
        });
        presentToast(`${action.charAt(0).toUpperCase() + action.slice(1)} successful!`);
        if (action === 'login') {
          await Preferences.set({
            key: 'access_token',
            value: response.data.access_token,
          });
          router.push('/home');
        }
      }
    } catch (error) {
      console.log(error);
      presentToast(error.response.data.error);
    }
  };
  
  const handleServerSetting = async () => {
    checkuserurl();
    const trimmed = serverAddress.value.trim();
    if (trimmed) {
      try {
        let userPrefs = await Preferences.get({ key: 'user' });
        if (userPrefs.value) {
          let userDetails = JSON.parse(userPrefs.value);
          userDetails.url = trimmed;
          await Preferences.set({
            key: 'user',
            value: JSON.stringify(userDetails),
          });
        }
        closeServerModal();
        presentToast('Server address updated successfully!');
      } catch (error) {
        presentToast('Failed to update server address.');
      }
    }
  };
  
  const handlServerClick = async (server) => {
    checkuserurl();
    try {
      let userPrefs = await Preferences.get({ key: 'user' });
      if (userPrefs.value) {
        let userDetails = JSON.parse(userPrefs.value);
        userDetails.url = server.IP;
        await Preferences.set({
          key: 'user',
          value: JSON.stringify(userDetails),
        });
        closeServerModal();
        presentToast('Server address updated successfully!');
      } else {
        presentToast('No user preferences found to update.');
      }
    } catch (error) {
      presentToast('Failed to update server address.');
    }
  };
  
  const handleServerDefault = async () => {
    try {
      const userPrefs = await Preferences.get({ key: 'user' });
      if (userPrefs.value) {
        let userDetails = JSON.parse(userPrefs.value);
        delete userDetails.url;
        await Preferences.set({
          key: 'user',
          value: JSON.stringify(userDetails),
        });
        presentToast('Default server restored, URL removed from settings.');
      } else {
        presentToast('No user preferences found to update.');
      }
    } catch (error) {
      presentToast('Failed to restore default server settings.');
    }
    closeServerModal();
  };
  
  const fetchServers = async () => {
    try {
      const response = await axios.get(`${base_url}/api/servers`);
      servers.value = await Promise.all(
        response.data.map(async (server) => {
          server.countryCode = await fetchCountryByIP(server.IP);
          return server;
        })
      );
    } catch (error) {
      presentToast('Failed to fetch servers.');
      servers.value = [];
    }
  };
  
  const getLanguageIconUrl = (type) => {
    const languageIcons = {
      js: 'https://logodix.com/logo/374972.png',
      python:
        'https://images.vexels.com/media/users/3/166477/isolated/preview/9bb722f0e85ddbc1ce0f064534fd2311-python-programming-language-icon-by-vexels.png',
      php: 'https://th.bing.com/th/id/OIP.nvfKaVnMJXORODrOUlK1iwHaHw',
      ruby: 'https://cdn-icons-png.flaticon.com/512/919/919842.png',
      java:
        'https://assets-us-01.kc-usercontent.com/0c347726-a638-0036-3d8e-afe5618e1f63/5c1477d9-8e59-4409-b7ea-d792e8ce8d64/java.png?w=1200&q=75&lossless=true&auto=format',
      haskell: 'https://cdn-icons-png.flaticon.com/512/919/919850.png',
      rust: 'https://user-images.githubusercontent.com/68482946/201523093-e398ba2f-62c1-4700-a412-191dcd1bd3f9.png',
      csharp: 'https://cdn-icons-png.flaticon.com/512/6132/6132221.png',
      cpp: 'https://cdn-icons-png.flaticon.com/512/6132/6132222.png',
      c: 'https://cms-informatic.com/wp-content/uploads/2020/01/logo-langage-C.png',
      kotlin:
        'https://download.logo.wine/logo/Kotlin_(programming_language)/Kotlin_(programming_language)-Logo.wine.png',
      swift:
        'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/swift-programming-language-icon.png',
      ocaml:
        'https://assets.coingecko.com/coins/images/19549/large/abic.png?1635400194',
      erlang:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/79/87/6f/79876fa7-176c-ae28-6984-eb79e7382be7/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
      go: 'https://th.bing.com/th/id/OIP.Kk5RnkS_FvIpkXUSiYENwAHaFJ?rs=1&pid=ImgDetMain',
      cobol:
        'https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/24/49/c2/2449c21d-ec34-805f-fd72-46a81fdda632/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png',
      vbnet:
        'https://static.wixstatic.com/media/7018c8_3df26ad924404619bd5128d92ff92173~mv2.jpg/v1/fit/w_173,h_173,q_90/7018c8_3df26ad924404619bd5128d92ff92173~mv2.jpg',
      elixir: 'https://replicate.com/static/docs/icons/elixir.ac7393b9ac6c.png',
      lua: 'https://th.bing.com/th/id/R.1bff29b4194ba16f43e513ed41ddb26b?rik=jI4UnF8tP0FkQA&riu=http%3a%2f%2fi1.wp.com%2fprogrammingzen.com%2fwp-content%2fuploads%2f2007%2f09%2flua_logo.png%3fw%3d1060&ehk=iQspLjmW790%2bUVU9ZfDVpytAhMqkG71FRNFQp1ckzpg%3d&risl=&pid=ImgRaw&r=0',
      scala: 'https://th.bing.com/th/id/OIP.vAn2drovYoz84ueKLo3HKAHaFG?rs=1&pid=ImgDetMain',
    };
  
    return languageIcons[type] || '/icons/default.png';
  };
  
  const fetchCountryByIP = async (ip) => {
    return 'BR';
  };
  
  const resetPassword = async () => {
    try {
      const response = await axios.post(`${base_url}/api/reset-password`, {
        user_secret: userSecret.value,
        new_password: newPassword.value,
      });
      if (response.data.error) {
        presentToast(response.data.error);
      } else {
        presentToast(response.data.success);
        closeResetPasswordModal();
      }
    } catch (error) {
      presentToast('Failed to reset password.');
    }
  };
  
  const SSO = async () => {
    let PK;
    try {
      const user_private = await Preferences.get({ key: 'private_key' });
      const private_key = JSON.parse(user_private.value).private_key;
      PK = private_key;
    } catch (e) {
      console.log("No private key found");
      return;
    }
    const response = await axios.post(`${base_url}/api/quick-login`, {
      private_key: PK,
    });
    if (response.data.error) {
      presentToast(response.data.error);
    } else {
      await Preferences.set({
        key: 'user',
        value: JSON.stringify({
          username: response.data.username,
          secret_key: response.data.secret_key,
          url: base_url,
        }),
      });
      presentToast(`Quick login successful!`);
      router.push('/home');
    }
  };
  
  onMounted(async () => {
    fetchServers();
    setDefault();
    SSO();
  });
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    background: #fff;
  }
  
  .logo-avatar {
    --border-radius: 50%;
    width: 100px;
    height: 100px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  
  .login-card {
    width: 100%;
    max-width: 380px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  ion-card-title {
    text-align: center;
    color: #333;
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
  }
  
  .link-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
  
  .link-container a {
    text-decoration: none;
    color: #28a745; 
    margin-top: 8px;
  }
  
  ion-button {
    margin-top: 8px;
  }
 
  :root {
    --ion-color-primary: #28a745;
    --ion-color-primary-rgb: 40, 167, 69;
    --ion-color-primary-contrast: #fff;
    --ion-color-primary-contrast-rgb: 255, 255, 255;
    --ion-color-primary-shade: #218838;
    --ion-color-primary-tint: #5cd65c;
  }
  </style>
  