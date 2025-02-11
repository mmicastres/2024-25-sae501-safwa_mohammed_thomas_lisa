<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Utilisation correcte des images (si elles sont dans public/)
const slides = [
    { text: "Bienvenue sur l'app!", image: "/undraw_augmented-reality_3ie0.png" },
    { text: "Découvrez nos fonctionnalités.", image: "/undraw_camera_jfaj.png" },
    { text: "Prêt à commencer ?", image: "/undraw_taking-photo_s23u.png" },
];
</script>

<template>
    <swiper :modules="[Pagination, Navigation]" :pagination="{ clickable: true }" :navigation="true">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
            <img :src="slide.image" alt="Slide image" />
            <p>{{ slide.text }}</p>
        </swiper-slide>
    </swiper>
</template>

<style scoped>
swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

img {
    width: 200px; /* Ajuste la taille si nécessaire */
    height: auto;
    margin-bottom: 10px;
}
</style>
