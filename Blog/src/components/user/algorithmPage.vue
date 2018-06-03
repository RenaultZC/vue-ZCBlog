<template>
  <div>
    <h1>
      algorithm
    </h1>
  </div>
</template>

<script>
    export default {
        name: "algorithm-page",
        beforeCreate:function(){
          document.getElementById("title").innerText = "算法";
        }
    }
</script>

<style scoped>

</style>
