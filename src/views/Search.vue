<script>
// import { ref, get, child, onValue } from "firebase/database";
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore"; 
import { query, where } from "firebase/firestore";
//import Dropdown from 'vue-simple-search-dropdown';

// Required for side-effects
import "firebase/firestore";

export default {
    // components: {
    //     Dropdown,
    // },
    data() {
        return {
            searchTerm: "",
            results: [],
            test: ["test1", "test2"]
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
            this.searchTerm = this.searchTerm.toLowerCase();

            // Create a reference to the plant collection
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
        },
        toInfo(param) {
            const plant = param;
            this.$router.push({ name: "Info", query: { plant } });
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
<input v-model="searchTerm" @keydown.enter="search"/>
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
<div class="button">
    <li v-for="item in results">
        <router-link to="/info" custom v-slot="{ navigate }">
            <button @click="navigate, toInfo(item)" role="link">{{ item }}</button>
        </router-link>
    </li>
</div>

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
</style>