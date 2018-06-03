<template>
  <div>
      <h1>blog</h1>
  </div>
</template>

<script>
    export default {
        name: "blog-page",
        beforeCreate:function(){
          document.getElementById("title").innerText = "博客";
        }
    }
</script>

<style scoped>

</style>
