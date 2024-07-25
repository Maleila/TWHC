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
            results: [],
            dropdown_list: [],
            name: [],
            scientific_name: [],
            folk_names: [],
            planet: ["earth", "mars", "moon", "saturn", "venus", "uranus", "sun", "pluto", "jupiter"], //missing some?? idk
            element: ["earth", "air", "fire", "water"],
            deities: [],
            properties: []
        }
    },
    async mounted() {
        const db = useFirestore();
        this.loadList();

        if(this.parameter == "name") {
            this.dropdown_list = this.name;
        } else if(this.parameter == "scientific_name") {
            this.dropdown_list = this.scientific_name;
        } else if(this.parameter == "planet") {
            this.dropdown_list = this.planet;
        } else if(this.parameter == "element") {
            this.dropdown_list = this.element;
        } else if(this.parameter == "folk_names") {
            this.dropdown_list = this.folk_names;
        } else if(this.parameter == "deities") {
            this.dropdown_list = this.deities;
        } else if(this.parameter == "properties") {
            this.dropdown_list = this.properties;
        }
    }, 
    methods: {
        async loadList() {
            const db = useFirestore();

            const querySnapshot = await getDocs(collection(db, "plants"));
            querySnapshot.forEach((doc) => {
                this.name.push(`${doc.data().name}`);
                this.scientific_name.push(`${doc.data().scientific_name}`);

                doc.data().folk_names.forEach((item) => {
                    if(!this.folk_names.includes(item) && item.toLowerCase() != "na"){
                        this.folk_names.push(item);
                    }   
                });
                doc.data().deities.forEach((item) => {
                    if(!this.deities.includes(item) && item.toLowerCase() != "na"){
                        this.deities.push(item);
                    }   
                });
                doc.data().properties.forEach((item) => {
                    if(!this.properties.includes(item) && item.toLowerCase() != "na"){
                        this.properties.push(item);
                    }   
                });
            });
        },
        async select(item) {
            this.reset();
            this.searchTerm = item;

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
<div class="dropdown">
    <vue3-simple-typeahead
            id="typeahead"
            placeholder="Search here..."
            :items="dropdown_list" 
            :minInputLength="1"
            :itemProjection="itemProjectionFunction"
            @selectItem="select"
            @onInput="onInputEventHandler"
            @onFocus="onFocusEventHandler"
            @onBlur="onBlurEventHandler"
        >
            <!-- > ^^not sure what all these methods are... -->
        </vue3-simple-typeahead>
</div>
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

.dropdown {
    max-width: fit-content;
    margin: auto;
}
</style>