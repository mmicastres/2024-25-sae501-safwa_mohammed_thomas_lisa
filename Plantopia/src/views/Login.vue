<template>
    <ion-page>
        <ion-content>
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

                    <IonButton type="submit">{{ isLogin ? 'Login' : 'Register' }}</IonButton>
                </form>

                <p>
                    {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                    <IonButton @click="toggleAuthMode">{{ isLogin ? 'Register' : 'Login' }}</IonButton>
                </p>

                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { IonButton, IonInput, IonLabel,IonPage,IonContent } from '@ionic/vue'; 
import { navigate } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import router from '../router';
const isLogin = ref(true);
const form = ref({
    username: '',
    email: '',
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
    form.value.email = '';
    form.value.password = '';
}

// Function to handle form submission (Login/Register)
async function handleSubmit() {
    const apiUrl = isLogin.value ? 'https://test.nanodata.cloud/signin' : 'https://test.nanodata.cloud/register';

    try {
        const response = await axios.post(apiUrl, form.value);
        console.log('Response:', response.data);

        if (response.data.token) {
            localStorage.setItem('token', response.data.token); 
            router.push('/home');
        }
    } catch (error) {
        console.log(error)
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
