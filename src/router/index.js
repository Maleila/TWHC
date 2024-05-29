import { createRouter, createWebHistory, parseQuery } from "vue-router";
import Home from "../views/Home.vue"; //it super didn't want to do the @, maybe that's not a thing anymore?
import Search from "../views/Search.vue";

const routes = [
    { path: "/", name: "Home", component: Home }, // Tell the router to render home component when the home route is visited
    { path: "/search", 
    name: "Search",
    component: Search,
    props: (route) => ({
        parameter: route.query.parameter,
    })},
];

// Create a router instance
const router = createRouter({
    history: createWebHistory(), // Create historys
    routes: routes,
  });
  
  export default router;