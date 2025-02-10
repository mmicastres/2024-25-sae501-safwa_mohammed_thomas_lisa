<template>
    <ion-page>
        <ion-content fullscreen>
            <div class="swipe-area" ref="swipeArea">
                <ion-grid>
                    <ion-row class="ion-justify-content-center ion-align-items-center">
                        <ion-col size="auto">
                            <ion-img src="/Plantopia/resources/seed-newplant.png" />
                            <div class="animation">
                                <ion-text>Swipe up to begin</ion-text>
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
    /* Full height for swipe area */
}

.swipe-area {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}


.animation {
    position: fixed;
    bottom: 50px;
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-animation: mover 1s infinite alternate;
    animation: mover 1s infinite alternate;
}

.animation {
    -webkit-animation: mover 1s infinite alternate;
    animation: mover 1s infinite alternate;
}

@-webkit-keyframes mover {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-30px);
    }
}

@keyframes mover {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-30px);
    }
}
</style>
