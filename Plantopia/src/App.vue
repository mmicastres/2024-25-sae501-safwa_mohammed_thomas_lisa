<script>
import ARScene from './components/ARScene.vue';

export default {
  components: {
    ARScene,
  },
};
</script>

<template>
  <div id="app">
    <ARScene />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
