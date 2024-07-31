<script>
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore"; 
import "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

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
        async submit() {
            this.format();
            const db = useFirestore();
            // Add a new document in collection
            await setDoc(doc(db, "plants", this.name), {
                name: this.name,
                scientific_name: this.scientific_name,
                folk_names: this.folk_name,
                planet: this.planet,
                element: this.element,
                deities: this.deities,
                properties: this.properties
            });
            this.reset();
        },
        reset() {
            this.name = "";
            this.scientific_name = "";
            this.folk_name = [];
            this.folkStr = "";
            this.planet = "";
            this.element = "";
            this.deities = [];
            this.deitiesStr = ""
            this.properties = [];
            this.propertiesStr = "";
        },
        format() {
            this.folk_name = this.folkStr.split(", ");
            this.deities = this.deitiesStr.split(", ");
            this.properties = this.propertiesStr.split(", ");
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
</style>