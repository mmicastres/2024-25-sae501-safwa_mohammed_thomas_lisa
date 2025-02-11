import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import IntroSlider from '../views/IntroSlider.vue';
import Splash from '../views/Splash.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/intro',
    component: IntroSlider,
  },
  {
    path: '/',
    component: Splash,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
