<template>
  <div>
    <h1>introduce</h1>
  </div>
</template>

<script>
    export default {
        name: "introduce-page",
        beforeCreate:function(){
          document.getElementById("title").innerText = "Introduce";
        }
    }
</script>

<style scoped>

</style>
