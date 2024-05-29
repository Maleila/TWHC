<script>
export default {
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
    hello hello {{ parameter }}
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