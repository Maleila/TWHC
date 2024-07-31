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

h1 {
    font-family: "Trattatello";
    text-align: center;
    font-size: 6em;
    line-height: 0.75em;
    margin: 0.4em;
}

h2 {
    font-family: inherit;
    font-weight: 100;
    text-align: center;
}

.spacer {
  height: 4em;
}

.button button {
  color: #434343;
  font-family: inherit;
  font-size: 1em;
  font-weight: 100;
  margin-bottom: 1em;
  border: none;
  background: none;
  /* letter-spacing: 0.2em; */
  transition: 0.3s;
}

.button button:hover {
  text-decoration: underline;
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}

.dropdown {
    max-width: fit-content;
    margin: auto;
}
</style>
