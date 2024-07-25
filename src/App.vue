<script setup>
import Home from './views/Home.vue';
</script>

<template>
  <br />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
