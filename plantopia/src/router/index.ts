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
    path: '/home',
    component: Home,
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
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '', 
        redirect: 'shop'
      },
      {
        path: '/inventory',
        component: () => import('../views/Inventory.vue')
      },
      {
        path: '/shop',
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
