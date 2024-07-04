<script>
export default {
    data() {
        return {
            test: ""
        }
    },
    methods: {
        setSearch(param) {
            const parameter = param;
            this.$router.push({ name: "Search", query: { parameter } });
        }
    },
};
</script>

<template>
    <div class="spacer"></div>
<h1>
    Technowiccan Herbal Companion
</h1>
<h2>
    A searchable herb database of <i>Cunningham's Encyclopedia of Magical Herbs</i>
</h2>

<h2> Search by:</h2>
<div class="button">
    <router-link to="/search" custom v-slot="{ navigate }">
        <button @click="navigate, setSearch('name')" role="link">Name</button>
    </router-link>
    <br>
    <router-link to="/search" custom v-slot="{ navigate }">
        <button @click="navigate, setSearch('scientific_name')" role="link">Scientific Name</button>
    </router-link>
    <br>
    <router-link to="/search" custom v-slot="{ navigate }">
        <button @click="navigate, setSearch('folk_names')" role="link">Folk Name(s)</button>
    </router-link>
    <br>
    <router-link to="/search" custom v-slot="{ navigate }">
        <button @click="navigate, setSearch('planet')" role="link">Planet</button>
    </router-link>
    <br>
    <router-link to="/search" custom v-slot="{ navigate }">
        <button @click="navigate, setSearch('element')" role="link">Element</button>
    </router-link>
    <br>
    <router-link to="/search" custom v-slot="{ navigate }">
        <button @click="navigate, setSearch('deities')" role="link">Deities</button>
    </router-link>
    <br>
    <router-link to="/search" custom v-slot="{ navigate }">
        <button @click="navigate, setSearch('properties')" role="link">Properties</button>
    </router-link>
    <br>
    <router-link to="/multisearch" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Advanced Search</button>
    </router-link>
</div>
<br>
<h2>
    Or browse collection:
</h2>
<div class="button">
    <router-link to="/browse" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Browse</button>
    </router-link>
</div>
<h2>
    Or add some plants: 
</h2>
<div class="button">
    <router-link to="/add" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Add</button>
    </router-link>
</div>

</template>

<style>
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
  font-size: 1.5em;
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
</style>