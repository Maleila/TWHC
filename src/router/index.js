import { createRouter, createWebHistory, parseQuery } from "vue-router";
import Home from "../views/Home.vue"; //it super didn't want to do the @, maybe that's not a thing anymore?
import Search from "../views/Search.vue";
import Browse from "../views/Browse.vue";
import Add from "../views/Add.vue";
import Info from "../views/Info.vue";
import MultiSearch from "../views/MultiSearch.vue";

const routes = [
    { path: "/", name: "Home", component: Home }, // Tell the router to render home component when the home route is visited
    { path: "/browse", name: "Browse", component: Browse},
    { path: "/add", name: "Add", component: Add},
    { path: "/multisearch", name: "Multisearch", component: MultiSearch},
    { path: "/search", 
    name: "Search",
    component: Search,
    props: (route) => ({
        parameter: route.query.parameter,
    })},
    { path: "/info", 
    name: "Info",
    component: Info,
    props: (route) => ({
        plant: route.query.plant,
    })},
];

// Create a router instance
const router = createRouter({
    history: createWebHistory(), // Create historys
    routes: routes,
  });
  
  export default router;