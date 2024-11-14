import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import Home from '../views/Home.vue'; 
import Leaderboard from '../views/Leaderboard.vue';
import Settings from '../views/Settings.vue';
import Login from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Login, 
  },
  {
    path: '/leaderboard',
    component: Leaderboard, 
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
    path: '/home',
    component: TabsPage,
    children: [
      {
        path: '', // Si aucun chemin n'est spécifié, redirige vers 'shop'
        redirect: '/shop'
      },
      {
        path: 'inventory', // Chemin en minuscules
        component: () => import('../views/Inventory.vue')
      },
      {
        path: 'shop', // Chemin en minuscules
        component: () => import('../views/Shop.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
