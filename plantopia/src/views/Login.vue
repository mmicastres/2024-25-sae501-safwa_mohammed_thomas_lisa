<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col>
                        <div class="auth-form">
                            <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>

                            <form @submit.prevent="handleSubmit">
                                <div class="form-group">
                                    <IonLabel for="username">Username</IonLabel>
                                    <IonInput type="text" id="username" v-model="form.username" required
                                        placeholder="Enter your username" />
                                </div>

                                <div class="form-group">
                                    <IonLabel for="password">Password</IonLabel>
                                    <IonInput type="password" id="password" v-model="form.password" required
                                        placeholder="Enter your password" />
                                </div>

                                <IonButton color="success" type="submit">{{ isLogin ? 'Login' : 'Register' }}
                                </IonButton>
                            </form>

                            <p>
                                {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                                <IonButton color="success" @click="toggleAuthMode">{{ isLogin ? 'Register' : 'Login' }}
                                </IonButton>
                            </p>

                            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { IonButton, IonInput, IonLabel, IonPage, IonContent, IonGrid, IonRow, IonCol, toastController } from '@ionic/vue';
import router from '../router';
import { saveToken } from '../../capacitorPrefer';
import api from '../api'; 
import { Preferences } from '@capacitor/preferences';


const isLogin = ref(true);
const form = ref({
    username: '',
    password: ''
});
const errorMessage = ref('');

function toggleAuthMode() {
    isLogin.value = !isLogin.value;
    clearForm();
    errorMessage.value = '';
}

function clearForm() {
    form.value.username = '';
    form.value.password = '';
}

async function presentToast(message: string, position = 'middle') {
    const toast = await toastController.create({
        message,
        duration: 1500,
    });
    toast.present();
}

async function handleSubmit() {
    const apiUrl = isLogin.value ? 'https://test.nanodata.cloud/signin' : 'https://test.nanodata.cloud/register';

    try {
        const response = await api.post(apiUrl, form.value);
        const { access_token, refresh_token } = response.data;
        if (response.data.access_token) {
            console.log('Access token received:', access_token);  // Log token for debugging
            await Preferences.set({ key: 'access_token', value: access_token });
            await Preferences.set({ key: 'refresh_token', value: refresh_token });
            router.replace('/home');
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            console.log('Error during submission:', error);  // Log full error for debugging
            errorMessage.value = error.response.data.error || 'Une erreur inconnue s\'est produite';
            await presentToast(errorMessage.value, 'middle');
        } else if (error.response && error.response.status === 401) {
            errorMessage.value = 'Wrong Credentials';
            await presentToast('Wrong Credentials', 'middle');
        }
    }
}
</script>

<style scoped>
.auth-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 1rem;
}

.error-message {
    color: red;
    margin-top: 1rem;
}
</style>
