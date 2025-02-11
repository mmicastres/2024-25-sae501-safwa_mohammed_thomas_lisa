<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Preferences } from '@capacitor/preferences';

const router = useRouter();

onMounted(async () => {
    setTimeout(async () => {
        try {
            const { value: token } = await Preferences.get({ key: 'access_token' });
            if (token) {
                router.replace('/home'); // Redirection vers Home
            } else {
                router.replace('/intro'); // Redirection vers Intro
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du token :', error);
            router.replace('/intro');
        }
    }, 1000);
});
</script>

<template>
    <div class="splash-screen">
        <img src="/logo.png" alt="Logo" class="logo" />
    </div>
</template>

<style scoped>
.splash-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff;
}

.logo {
    width: 200px;
    height: 200px;
}
</style>
