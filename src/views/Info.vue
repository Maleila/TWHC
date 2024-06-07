<script>
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore"; 
import { query, where } from "firebase/firestore";
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
            // folkStr: "",
            // deitiesStr: "",
            // propertiesStr: ""
        }
    },
    mounted() {
        this.fetchInfo();
    },
    methods: {
        async fetchInfo() {
            const db = useFirestore();
            const plantRef = collection(db, "plants");

            const q = query(plantRef, where("name", "==", this.plant));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.name = `${doc.data().name}`;
                this.scientific_name = `${doc.data().scientific_name}`;
                this.folk_name = `${doc.data().folk_name}`;
                this.element = `${doc.data().element}`;
                this.planet = `${doc.data().planet}`;
                this.deities = `${doc.data().deities}`;
                this.properties = `${doc.data().properties}`
            });
        }
    },
    props: {
        plant: {
            type: String,
            required: true,
        },
    },
}
</script>

<template>
<h2> Info about {{ plant }}</h2>
<br>
<h2>
    {{ name }}
    <br>
    {{ scientific_name }}
    <br>
    {{ folk_name }}
    <br>
    {{ element }}
    <br>
    {{ planet }}
    <br>
    {{ deities }}
    <br>
    {{ properties }}
</h2>
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