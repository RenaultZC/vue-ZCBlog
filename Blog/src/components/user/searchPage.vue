<template>
    <div>
      <h1>search</h1>
    </div>
</template>

<script>
    export default {
        name: "search-page",
        beforeCreate:function(){
          document.getElementById("title").innerText = "搜索";
        }
    }
</script>

<style scoped>

</style>
