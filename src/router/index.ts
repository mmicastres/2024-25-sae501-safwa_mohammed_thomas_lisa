import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import IntroSlider from '../views/IntroSlider.vue';
import Splash from '../views/Splash.vue';
import Login from '../views/Login.vue';
import { Preferences } from '@capacitor/preferences';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Splash },
  { path: '/intro', component: IntroSlider },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (['/login', '/', '/intro'].includes(to.path)) {
    return next();
  }
  const { value: token } = await Preferences.get({ key: 'access_token' });
  if (!token) {
    return next('/login');
  }
  next();
});

export default router;
