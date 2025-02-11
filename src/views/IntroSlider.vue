<template>
    <IonPage>
        <IonContent color="light">
            <Swiper ref="swiperRef" :modules="[Pagination]" :pagination="{ clickable: true, type: 'bullets' }"
                @slideChange="onSlideChange" @swiper="setSwiperInstance">
                <SwiperSlide v-for="(slide, index) in slides" :key="index" class="slide">
                    <img :src="slide.image" class="image" />
                    <br />
                    <div class="text-container">
                        <IonText class="heading">{{ slide.title }}</IonText>
                        <br />
                        <IonText class="caption">{{ slide.caption }}</IonText>
                    </div>
                </SwiperSlide>
            </Swiper>
        </IonContent>

        <IonFooter class="ion-no-border">
            <IonToolbar color="light">
                <div class="ion-margin-horizontal" style="display: flex; justify-content: space-between;">
                    <IonButton @click="onSkip" color="success" fill="clear">Skip</IonButton>
                    <IonButton @click="onNextClick" color="success">Next</IonButton>
                </div>
            </IonToolbar>
        </IonFooter>
    </IonPage>
</template>

<script setup>
import { ref } from "vue";
import { useIonRouter } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { IonPage, IonContent, IonFooter, IonToolbar, IonText, IonButton } from "@ionic/vue";
import { Preferences } from '@capacitor/preferences';
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@/theme/intro.css";

const router = useIonRouter();
const swiper = ref(null); // ✅ Stocker l'instance Swiper
const currentSlide = ref(0);

const slides = [
    { title: "Activer la caméra", caption: "Autorisez l'accès à votre caméra pour scanner en AR.", image: "/undraw_camera_jfaj.svg" },
    { title: "Scanner un QR Code", caption: "Scannez le QR code fourni pour charger un modèle 3D.", image: "/undraw_taking-photo_s23u.svg" },
    { title: "Explorer en Réalité Virtuelle", caption: "Découvrez des modèles 3D immersifs.", image: "/undraw_augmented-reality_3ie0.svg" },
];

const setSwiperInstance = (swiperInstance) => {
    swiper.value = swiperInstance; // Stocke l'instance de Swiper
};

const onSlideChange = (swiperInstance) => {
    currentSlide.value = swiperInstance.activeIndex; // Met à jour l'index du slide actif
};

const onNextClick = () => {
    if (swiper.value && currentSlide.value < slides.length - 1) {
        swiper.value.slideTo(currentSlide.value + 1); // Passe au slide suivant
    } else {
        onSkip();
    }
};

const onSkip = async () => {
    await Preferences.set({ key: 'access_token', value: "secondConnexion" });
    router.push(`/home`);
};

</script>

<style scoped>
ion-content {
    background-color: white;
}

.image {
    width: 80%;
    margin: auto;
    display: block;
}

.text-container {
    text-align: center;
    padding: 10px;
}

.heading {
    font-size: 1.5rem;
    font-weight: bold;
}

.caption {
    font-size: 1rem;
    color: gray;
}
</style>
