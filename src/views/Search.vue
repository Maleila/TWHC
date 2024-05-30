<script>
export default {
    data() {
        searchTerm: ""
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
<!-- <div class="spacer"></div> -->
<input v-model="searchTerm"/>
<!-- really I think I want this to be a dropdown so you can only choose stuff pulled from the db -->

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