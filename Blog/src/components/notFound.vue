<template>
    <h1>404NotFound</h1>
</template>

<script>
    export default {
        name: "notFound",
        beforeCreate:function(){
          document.getElementById("title").innerText = "找不到该页面";
        }
    }
</script>

<style scoped>

</style>
