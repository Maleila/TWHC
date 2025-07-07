<script>
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
            name: "",
            scientific_name: "",
            folk_name: "",
            planet: "",
            element: "",
            deities: "",
            properties: "",
            dropdown_list: [],
            nameList: [],
            scientific_name_list: [],
            folk_names_list: [],
            planetList: ["earth", "mars", "moon", "saturn", "venus", "uranus", "sun", "jupiter", "mercury"], //missing some?? idk
            elementList: ["earth", "air", "fire", "water"],
            deitiesList: [],
            propertiesList: [],
            noResults: false,
            multi: false
        }
    },
    async mounted() {
        const db = useFirestore();
        this.loadList();

        if(this.parameter == "multi") {
            this.multi = true;
        }
        if(this.parameter == "name") {
            this.dropdown_list = this.nameList;
        } else if(this.parameter == "scientific_name") {
            this.dropdown_list = this.scientific_name_list;
        } else if(this.parameter == "planet") {
            this.dropdown_list = this.planetList;
        } else if(this.parameter == "element") {
            this.dropdown_list = this.elementList;
        } else if(this.parameter == "folk_names") {
            this.dropdown_list = this.folk_names_list;
        } else if(this.parameter == "deities") {
            this.dropdown_list = this.deitiesList;
        } else if(this.parameter == "properties") {
            this.dropdown_list = this.propertiesList;
        }
    }, 
    methods: {
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
        async select(item) {
            //this.reset();
            this.results = [];
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
        async multiSearch() {
            this.results = [];
            this.noResults = false;
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
            this.resetMulti();
            if(this.results.length == 0) {
                this.noResults = true;
            }
        },
        resetMulti() {
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
        format(str) {
            // if(str === "na") {
            //     return "NA";
            // }
            let temp = str.split("_");
            str = "";
            for(let i = 0; i < temp.length -1; i++) {
                str += temp[i].charAt(0).toUpperCase() + temp[i].slice(1) + " ";
                console.log(str);
            }
            str += temp[temp.length-1].charAt(0).toUpperCase() + temp[temp.length-1].slice(1);
            console.log(str);
            return str;
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
<div v-if="multi">
    <h2>
    Advanced Search
    </h2>
    <!--actually is there a way to use a v-model here instead of linking via refs and functions-->
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
Deity: <div class="dropdown">
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
Property: <div class="dropdown">
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
<button @click="multiSearch">
    Search
</button>
</div>

<div v-else>
    <h2>
        Search by {{ this.format(parameter) }}:
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
                <!-- > TODO ^^not sure what all these methods are... -->
            </vue3-simple-typeahead>
    </div>
</div>
<br>
<ul class="search-results">
    <li v-for="item in results" class="clickable-item">
        <router-link to="/info" custom v-slot="{ navigate }">
            <span @click="navigate, toInfo(item)" role="link">{{ item }}</span>
        </router-link>
    </li>
</ul> 
<h2 v-if="noResults">No results</h2> 
</template>

<style>
.search-results {
    padding: 0;
    margin: 0;
    list-style: disc;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-results li {
    display: list-item;
    margin: 5px 0;
    padding: 0;
    text-align: center;
}

.clickable-item {
    cursor: pointer;
    color: inherit;
}

.clickable-item:hover {
    text-decoration: underline;
}
</style>