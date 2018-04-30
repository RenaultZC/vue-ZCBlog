<template>
    <h1>404NotFound</h1>
</template>

<script>
    export default {
        name: "notFound",
        beforeCreate:function(){
          document.getElementById("title").innerText = "404 Not Found";
        }
    }
</script>

<style scoped>

</style>
