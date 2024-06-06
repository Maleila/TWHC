<script>
// import { ref, get, child, onValue } from "firebase/database";
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore"; 
import { query, where } from "firebase/firestore";

// Required for side-effects
import "firebase/firestore";

export default {
    data() {
        return {
            searchTerm: "",
            results: []
        }
    },
    async mounted() {
        const db = useFirestore();

//         const querySnapshot = await getDocs(collection(db, "plants"));
//         querySnapshot.forEach((doc) => {
//         console.log(`${doc.id}: ${doc.data().name}, ${doc.data().planet}`);
// });
    },
    methods: {
        async search() {
            this.reset();
            //TODO: figure out how to deal w capitalization... may have set that up poorly

            // Create a reference to the cities collection
            const db = useFirestore();
            const plantRef = collection(db, "plants");

            let q;
            if(this.parameter == "folk_names" || this.parameter == "properties" || 
            this.parameter == "deities") {
                // Create a query against the collection
            q = query(plantRef, where(this.parameter, "array-contains", this.searchTerm));
            } else {
                // Create a query against the collection
            q = query(plantRef, where(this.parameter, "==", this.searchTerm));
            }
        
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(`${doc.id}: ${doc.data().name}, ${doc.data().scientific_name}`);
            this.results.push(`${doc.data().name}`);
            });
        },
        reset() {
            this.results = [];
        }
    },
    props: {
        parameter: {
            type: String,
            required: true,
        },
    },
};
</script>

<template>
<div class="spacer"></div>
<h2>
    search by {{ parameter }}:
</h2>
<input v-model="searchTerm"/>
<!-- really I think I want this to be a dropdown so you can only choose stuff pulled from the db -->
<!-- but I'll do that later -->
<br>
{{ searchTerm }}
<br>
<button @click="search">
Search
</button>
<br>
<br>
<li v-for="item in results">
 {{ item }}
</li>

</template>

<!-- should pull this out into a universal style -->
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