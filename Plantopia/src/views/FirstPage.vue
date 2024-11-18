<template>
    <ion-page>
        <ion-content fullscreen>
            <div class="swipe-area" ref="swipeArea">
                <ion-grid>
                    <ion-row class="ion-justify-content-center ion-align-items-center">
                        <ion-col size="auto">
                            <ion-img src="/Plantopia/resources/seed-newplant.png" />
                            <div class="swipe-up-area">
                                <ion-text>Swipe Up to Begin</ion-text>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonPage, IonContent, IonImg, IonGrid, IonRow, IonCol, IonText } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { createGesture } from '@ionic/core';
import { Preferences } from '@capacitor/preferences';

const router = useRouter();
const swipeArea = ref(null);
const bearer = ref<string | null>(null);

onMounted(async () => {
    const { value } = await Preferences.get({ key: 'token' });
    bearer.value = value;

    const gesture = createGesture({
        el: swipeArea.value!,
        gestureName: 'swipe-up',
        direction: 'y',
        onEnd: (ev) => {
            const isSwipeUp = ev.deltaY < -100 && Math.abs(ev.velocityY) > 0.3;
            if (isSwipeUp) {
                if (bearer.value) {
                    router.push('/home');
                } else {
                    router.push('/login');
                }
            }
        },
    });

    gesture.enable();

    onUnmounted(() => {
        gesture.destroy();
    });
});
</script>


<style scoped>
.full-height {
    height: 100vh;
}

.swipe-area {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.swipe-up-area {
    position: fixed;
    bottom: 65px;
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-animation: mover 1s infinite alternate;
    animation: mover 1s infinite alternate;
}



@-webkit-keyframes mover {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-20px);
    }
}

@keyframes mover {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-20px);
    }
}

.ion-text {
    font-size: 1.2rem;
    font-weight: bold;
    color: #4caf50;
    animation: swipeInPlace 1s ease-in-out infinite;
}
</style>
