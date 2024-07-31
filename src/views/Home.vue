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
        <button @click="navigate, setSearch('folk_names')" role="link">Folk Name</button>
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
        <button @click="navigate, setSearch('deities')" role="link">Deity</button>
    </router-link>
    <br>
    <router-link to="/search" custom v-slot="{ navigate }">
        <button @click="navigate, setSearch('properties')" role="link">Property</button>
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
<!-- <h2>
    Or add some plants: 
</h2>
<div class="button">
    <router-link to="/add" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Add</button>
    </router-link>
</div> -->

</template>

<style>
</style>