<script>
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore"; 
import "firebase/firestore";

export default {
    data() {
        return {
            name: "",
            scientific_name: "",
            folk_name: [],
            planet: "",
            element: "",
            deities: [],
            properties: [],
            folkStr: "",
            deitiesStr: "",
            propertiesStr: ""
        }
    },
    methods: {
        submit() {
            this.format();
        },
        reset() {
            this.name = "";
            this.scientific_name = "";
            this.folk_name = [];
            this.planet = "";
            this.element = "";
            this.deities = [];
            this.properties = [];
        },
        format() {
            this.folk_name = this.folkStr.split(",");
            this.deities = this.deitiesStr.split(",");
            this.properties = this.propertiesStr.split(",");
        }
    }
}
</script>

<template>
<h2>
    add a plant to the database
</h2>
<input v-model="name" placeholder="name">
<br>
<input v-model="scientific_name" placeholder="scientific name">
<br>
<input v-model="folkStr" placeholder="folk names">
<br>
<input v-model="planet" placeholder="planet">
<br>
<input v-model="element" placeholder="element">
<br>
<input v-model="deitiesStr" placeholder="deities">
<br>
<input v-model="propertiesStr" placeholder="properties">
<br>
<br>
<button @click="submit">
    Add
</button>
<br>
<li v-for="item in folk_name">
 {{ item }}
</li>
<li v-for="item in deities">
 {{ item }}
</li>
<li v-for="item in properties">
 {{ item }}
</li>

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