import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Leaderboard from './components/views/Leaderboard.vue'
import Shop from './components/views/Shop.vue'
import Inventory from './components/views/Inventory.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/leaderboard',
            name: 'Leaderboard',
            component: Leaderboard
        },
        {
            path: '/shop',
            name: 'Shop',
            component: Shop
        },
        {
            path: '/inventory',
            name: 'Inventory',
            component: Inventory
        },
    ]
})

createApp(App)
    .use(router)
    .mount('#app')