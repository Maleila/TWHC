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
        // why is this so slow??
    },
    methods: {
        async loadList() {
            const db = useFirestore();

            const querySnapshot = await getDocs(collection(db, "plants"));
            querySnapshot.forEach((doc) => {
                this.plants.push(`${doc.data().name}`);
            });
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
    Browse
</h2>
<div class="button">

    <li v-for="item in plants">
        <router-link to="/info" custom v-slot="{ navigate }">
            <button @click="navigate, toInfo(item)" role="link">{{ item }}</button>
        </router-link>
    
    </li>
</div>

</template>

<style>
</style>