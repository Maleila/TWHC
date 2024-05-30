<script>
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore"; 
import "firebase/firestore";

export default {
    data() {
        return {
            plants: []
        };
    },
    mounted() {
        this.loadList();
    },
    methods: {
        async loadList() {
            const db = useFirestore();

            const querySnapshot = await getDocs(collection(db, "plants"));
            querySnapshot.forEach((doc) => {
                this.plants.push(`${doc.data().name}`);
            });
        }
    }
}
</script>

<template>
<h2>
    Browse
</h2>

<li v-for="item in plants">
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