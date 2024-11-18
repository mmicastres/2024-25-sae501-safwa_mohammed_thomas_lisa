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

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { IonButton, IonInput, IonLabel, IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import router from '../router';
import { saveToken } from '../../capacitorPrefer';

const isLogin = ref(true);
const form = ref({
    username: '',
    password: ''
});
const errorMessage = ref('');

// Function to toggle between Login and Register forms
function toggleAuthMode() {
    isLogin.value = !isLogin.value;
    clearForm();
    errorMessage.value = '';
}

// Function to clear the form fields
function clearForm() {
    form.value.username = '';
    form.value.password = '';
}

// Function to handle form submission (Login/Register)
async function handleSubmit() {
    const apiUrl = isLogin.value ? 'https://test.nanodata.cloud/signin' : 'https://test.nanodata.cloud/register';

    try {
        const response = await axios.post(apiUrl, form.value);
        if (response.data.access_token) {
            // Sauvegarder le token
            await saveToken(response.data.access_token);
            // Rediriger vers la page d'accueil
            router.push('/home');
        }
    } catch (error) {
        // Gérer l'affichage de l'erreur
        if (error.response && error.response.data) {
            // Afficher le message d'erreur du serveur
            errorMessage.value = error.response.data.error || 'Une erreur inconnue s\'est produite';
        } else {
            errorMessage.value = 'Erreur de connexion au serveur';
        }
        console.log('Error:', error);
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
