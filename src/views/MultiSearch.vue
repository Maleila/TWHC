<script>
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore"; 
import { query, where } from "firebase/firestore";

//TODO: add select search for each input field
export default {
    data() {
        return {
            results: [],
            name: "",
            scientific_name: "",
            folk_name: "",
            planet: "",
            element: "",
            deities: "",
            properties: "",
        }
    },
    methods: {
        async search() {
            this.process();
            this.results = [];
            //idea from this stackoverflow post
            //https://stackoverflow.com/questions/69875064/firebase-version-9-using-multiple-conditional-where-clauses
            const db = useFirestore();
            const plantRef = collection(db, "plants");
            let q = query(plantRef);
            if(this.name) {
                q = query(q, where("name", "==", this.name));
            }
            if(this.scientific_name) {
                q = query(q, where("scientific_name", "==", this.scientific_name));
            }
            if(this.folk_name) {
                q = query(q, where("folk_name", "array-contains", this.folk_name.name));
            }
            if(this.planet) {
                q = query(q, where("planet", "==", this.planet));
            }
            if(this.element) {
                q = query(q, where("element", "==", this.element));
            }
            if(this.deities) {
                q = query(q, where("deities", "array-contains", this.deities));
            }
            if(this.properties) {
                q = query(q, where("properties", "array-contains", this.properties));
            }
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(`${doc.id}: ${doc.data().name}, ${doc.data().scientific_name}`);
            this.results.push(`${doc.data().name}`);
            });
            this.reset();
        },
        process() {
            this.name = this.name.toLowerCase();
            this.scientific_name = this.scientific_name.toLowerCase();
            this.folk_name = this.folk_name.toLowerCase();
            this.planet = this.planet.toLowerCase();
            this.element = this.element.toLowerCase();
            this.deities = this.deities.toLowerCase();
            this.properties = this.properties.toLowerCase();
        },
        reset() {
            this.name = "";
            this.scientific_name = "";
            this.folk_name = "";
            this.planet = "";
            this.element = "";
            this.deities = "";
            this.properties = "";
        },
        toInfo(param) {
            const plant = param;
            this.$router.push({ name: "Info", query: { plant } });
        }
    }
}
</script>

<template>
<h2>
    Advanced Search
</h2>
<br>
Name: <input v-model="name" placeholder="name">
<br>
Scientific Name: <input v-model="scientific_name" placeholder="scientific name">
<br>
Folk Name: <input v-model="folkStr" placeholder="folk names">
<br>
Planet: <input v-model="planet" placeholder="planet">
<br>
Element: <input v-model="element" placeholder="element">
<br>
Deities: <input v-model="deitiesStr" placeholder="deities">
<br>
Properties: <input v-model="propertiesStr" placeholder="properties">
<br>
<br>
<button @click="search">
    Search
</button>
<br>
<div class="button">
    <li v-for="item in results">
        <router-link to="/info" custom v-slot="{ navigate }">
            <button @click="navigate, toInfo(item)" role="link">{{ item }}</button>
        </router-link>
    </li>
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
</style>