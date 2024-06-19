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
                this.name = this.capitalize(`${doc.data().name}`);
                this.scientific_name = this.capitalize(`${doc.data().scientific_name}`);
                this.folk_name = `${doc.data().folk_names}`;
                this.element = this.capitalize(`${doc.data().element}`);
                this.planet = this.capitalize(`${doc.data().planet}`);
                this.deities = `${doc.data().deities}`;
                this.properties = `${doc.data().properties}`
            });
            this.properties = this.formatLists(this.properties);
            this.folk_name = this.formatLists(this.folk_name);
            this.deities = this.formatLists(this.deities);
        },
        capitalize(str) {
            if(str === "na") {
                return "NA";
            }
            let temp = str.split(" ");
            str = "";
            for(let i = 0; i < temp.length -1; i++) {
                str += temp[i].charAt(0).toUpperCase() + temp[i].slice(1) + " ";
                console.log(str);
            }
            str += temp[temp.length-1].charAt(0).toUpperCase() + temp[temp.length-1].slice(1);
            console.log(str);
            return str;
        },
        formatLists(list) {
            let formattedList = "";
            list = list.split(",");
            for(let i = 0; i < list.length-1; i++) {
                formattedList = formattedList.concat(this.capitalize(list[i]) + ", ");
                console.log(formattedList);
            }
            formattedList = formattedList.concat(this.capitalize(list[list.length-1]));
            return formattedList;
            
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
<h1>{{ name }}</h1>
<br>
<h2>
    Scientific Name: <i>{{ scientific_name }}</i>
    <br>
    Folk Names: {{ folk_name }}
    <br>
    Element: {{ element }}
    <br>
    Planet: {{ planet }}
    <br>
    Deities: {{ deities }}
    <br>
    Properties: {{ properties }}
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