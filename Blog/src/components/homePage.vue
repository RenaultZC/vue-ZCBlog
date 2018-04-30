<template>
  <div>
    <h1>home</h1>
  </div>
</template>

<script>
    export default {
        name: "home-page",
        data(){
          return {

          }
        },
        beforeCreate:function(){
          document.getElementById("title").innerText = "Home";
        }
    }
</script>

<style scoped>

</style>
