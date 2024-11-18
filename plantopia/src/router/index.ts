import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import Home from '../views/Home.vue';
import Leaderboard from '../views/Leaderboard.vue';
import Settings from '../views/Settings.vue';
import FirstPage from '../views/FirstPage.vue';
import Login from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
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
    path: '/',
    component: FirstPage,
  },
  {
    path: '/shop',
    component: TabsPage,
    children: [
      {
        path: '', 
        component: () => import('../views/Shop.vue') 
      },
      {
        path: '/inventory', 
        component: () => import('../views/Inventory.vue')
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
