import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';
import FirstPage from '../views/FirstPage.vue';
import IntroSlider from '../views/IntroSlider.vue';
import Login from '../views/Login.vue';
import Splash from '../views/Splash.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/home',
    component: Home,
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
