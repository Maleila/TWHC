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