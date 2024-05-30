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
    A searchable herb database of Cunningham's Encyclopedia of Magical Herbs
</h2>

<h2> Search by:</h2>

<router-link to="/search" custom v-slot="{ navigate }">
    <button @click="navigate, setSearch('name')" role="link">Name</button>
</router-link>
<br>
<router-link to="/search" custom v-slot="{ navigate }">
    <button @click="navigate, setSearch('scientific name')" role="link">Scientific Name</button>
</router-link>
<br>
<router-link to="/search" custom v-slot="{ navigate }">
    <button @click="navigate, setSearch('folk name')" role="link">Folk Name(s)</button>
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
<h2>
    Or browse collection:
</h2>
<router-link to="/browse" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">Browse</button>
</router-link>
<h2>
    Or add some plants:
</h2>
<router-link to="/add" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">Add</button>
</router-link>

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
</style>