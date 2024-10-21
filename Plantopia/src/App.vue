<!-- <script>
import ARScene from './components/ARScene.vue';

export default {
  components: {
    ARScene,
  },
};
</script> -->

<template>
  <h1>Hello App!</h1>
  <main>
    <RouterLink to="/Inventory">Inventory</RouterLink>
    <RouterLink to="/Shop">Shop</RouterLink>
    <RouterLink to="/Leaderboard">Leaderboard</RouterLink>
    <RouterView></RouterView>
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
</style>
