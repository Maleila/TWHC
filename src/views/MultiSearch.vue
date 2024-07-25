<script>
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore"; 
import { query, where } from "firebase/firestore";

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
            nameList: [],
            scientific_name_list: [],
            folk_names_list: [],
            planetList: ["earth", "mars", "moon", "saturn", "venus", "uranus", "sun", "pluto", "jupiter"], //missing some?? idk
            elementList: ["earth", "air", "fire", "water"],
            deitiesList: [],
            propertiesList: []
        }
    },
    async mounted() {
        //const db = useFirestore(); //do I need this actually....
        this.loadList();
    },
    methods: {
        async selectName(item){
            this.name = item;
        },
        async selectScientificName(item) {
            this.scientific_name = item;
        },
        async selectFolkName(item) {
            this.folk_name = item;
        },
        async selectPlanet(item) {
            this.planet = item;
        },
        async selectElement(item) {
            this.element = item;
        },
        async selectDeity(item) {
            this.deities = item;
        },
        async selectProperty(item) {
            this.properties = item;
        },
        async loadList() {
            const db = useFirestore();

            const querySnapshot = await getDocs(collection(db, "plants"));
            querySnapshot.forEach((doc) => {
                this.nameList.push(`${doc.data().name}`);
                this.scientific_name_list.push(`${doc.data().scientific_name}`);

                doc.data().folk_names.forEach((item) => {
                    if(!this.folk_names_list.includes(item) && item.toLowerCase() != "na"){
                        this.folk_names_list.push(item);
                    }   
                });
                doc.data().deities.forEach((item) => {
                    if(!this.deitiesList.includes(item) && item.toLowerCase() != "na"){
                        this.deitiesList.push(item);
                    }   
                });
                doc.data().properties.forEach((item) => {
                    if(!this.propertiesList.includes(item) && item.toLowerCase() != "na"){
                        this.propertiesList.push(item);
                    }   
                });
            });
        },
        async search() {
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
                q = query(q, where("folk_names", "array-contains", this.folk_name));
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
        reset() {
            this.name = "";
            this.scientific_name = "";
            this.folk_name = "";
            this.planet = "";
            this.element = "";
            this.deities = "";
            this.properties = "";

            this.$refs.nameInput.clearInput();
            this.$refs.scientificNameInput.clearInput();
            this.$refs.folkNameInput.clearInput();
            this.$refs.elementInput.clearInput();
            this.$refs.planetInput.clearInput();
            this.$refs.detiiesInput.clearInput();
            this.$refs.propertiesInput.clearInput();
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
<br> <!--actually is there a way to use a v-model here instead of linking via refs and functions-->
Name: <div class="dropdown">
    <vue3-simple-typeahead
            ref="nameInput"
            placeholder="Name"
            :items="nameList" 
            :minInputLength="1"
            :itemProjection="itemProjectionFunction"
            @selectItem="selectName"
            @onInput="onInputEventHandler"
            @onFocus="onFocusEventHandler"
            @onBlur="onBlurEventHandler"
        >
        </vue3-simple-typeahead>
</div>
Scientific Name: <div class="dropdown">
    <vue3-simple-typeahead
            ref="scientificNameInput"
            placeholder="Scientific Name"
            :items="scientific_name_list" 
            :minInputLength="1"
            :itemProjection="itemProjectionFunction"
            @selectItem="selectScientificName"
            @onInput="onInputEventHandler"
            @onFocus="onFocusEventHandler"
            @onBlur="onBlurEventHandler"
        >
        </vue3-simple-typeahead>
    </div>
Folk Name: <div class="dropdown">
    <vue3-simple-typeahead
            ref="folkNameInput"
            placeholder="Folk name"
            :items="folk_names_list" 
            :minInputLength="1"
            :itemProjection="itemProjectionFunction"
            @selectItem="selectFolkName"
            @onInput="onInputEventHandler"
            @onFocus="onFocusEventHandler"
            @onBlur="onBlurEventHandler"
        >
        </vue3-simple-typeahead>
    </div>
Planet: <div class="dropdown">
    <vue3-simple-typeahead
            ref="planetInput"
            placeholder="Planet"
            :items="planetList" 
            :minInputLength="1"
            :itemProjection="itemProjectionFunction"
            @selectItem="selectPlanet"
            @onInput="onInputEventHandler"
            @onFocus="onFocusEventHandler"
            @onBlur="onBlurEventHandler"
        >
        </vue3-simple-typeahead>
    </div>
Element: <div class="dropdown">
    <vue3-simple-typeahead
            ref="elementInput"
            placeholder="Element"
            :items="elementList" 
            :minInputLength="1"
            :itemProjection="itemProjectionFunction"
            @selectItem="selectElement"
            @onInput="onInputEventHandler"
            @onFocus="onFocusEventHandler"
            @onBlur="onBlurEventHandler"
        >
        </vue3-simple-typeahead>
    </div>
Deities: <div class="dropdown">
    <vue3-simple-typeahead
            ref="detiiesInput"
            placeholder="Deity"
            :items="deitiesList" 
            :minInputLength="1"
            :itemProjection="itemProjectionFunction"
            @selectItem="selectDeity"
            @onInput="onInputEventHandler"
            @onFocus="onFocusEventHandler"
            @onBlur="onBlurEventHandler"
        >
        </vue3-simple-typeahead>
    </div>
Properties: <div class="dropdown">
    <vue3-simple-typeahead
            ref="propertiesInput"
            placeholder="Property"
            :items="propertiesList" 
            :minInputLength="1"
            :itemProjection="itemProjectionFunction"
            @selectItem="selectProperty"
            @onInput="onInputEventHandler"
            @onFocus="onFocusEventHandler"
            @onBlur="onBlurEventHandler"
        >
        </vue3-simple-typeahead>
    </div>
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