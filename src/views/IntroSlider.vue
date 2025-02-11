<template>
    <IonPage>
        <IonContent color="light">
            <Swiper ref="swiper" :modules="[Pagination]" :pagination="{ clickable: true, type: 'bullets' }"
                @slideChange="onSlideChange">
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
import { IonPage, IonContent, IonFooter, IonToolbar, IonText, IonButton } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/intro.css";

const router = useIonRouter();
const swiper = ref(null);
const currentSlide = ref(0);

const slides = [
    { title: "Activer la caméra", caption: "Pour démarrer, autorisez l'accès à votre caméra afin de scanner les marqueurs en réalité augmentée.", image: "../../public/undraw_camera_jfaj.png" },
    { title: "Scanner un QR Code", caption: "Scannez le QR code fourni pour charger un modèle 3D ou un contenu interactif.", image: "../../public/undraw_taking-photo_s23u.png" },
    { title: "Explorer en Réalité Virtuelle", caption: "Plongez dans l'expérience de réalité virtuelle et découvrez des modèles 3D immersifs.", image: "../../public/undraw_augmented-reality_3ie0.png" },
];

const onSlideChange = (event) => {
    currentSlide.value = event.activeIndex;
};

const onNextClick = () => {
    if (currentSlide.value < slides.length - 1) {
        swiper.value.swiper.slideNext();
    } else {
        onSkip();
    }
};

const onSkip = () => {
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