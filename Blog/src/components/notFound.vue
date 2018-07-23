<template>
  <div class="body">
    <div class="row">
      <h1>404</h1>
      <hr>
      <h2>Page Not Found</h2>
      <router-link tag="p" to="/homePage">Click Here To Home</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "notFound",
        beforeCreate:function(){
          document.getElementById("title").innerText = "找不到该页面";
        },
        mounted(){
          document.getElementsByClassName("body")[0].style.height = window.innerHeight+"px";
        }
    }
</script>

<style scoped>
  .body{
    background-image: url("http://img.netbian.com/file/2017/1126/5af5c7d46a76f871d0f84172d6304344.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .row{
    text-align: center;
    margin: 16% auto;
    animation: slideup 1s linear;
  }
  h1, h2, p{
    text-rendering: optimizeLegibility;
  }
  h2, p{
    font-family: 'Lato', sans-serif;
    color: #374140;
  }
  h1{
    color:#1E1E20;
    font-family: 'Merriweather', serif;
    font-size: 120px;
    line-height: 122px;
  }
  h2{
    font-size: 30px;
    line-height: 32px;
    margin-bottom: 10px;
  }
  p{
    font-size: 18px;
    line-height: 20px;
    cursor: pointer;
  }
  hr{
    width: 15%;
    margin: 40px auto;
    border-color:#DC3522;
  }
  @keyframes slideup {
    from{
      margin-top: 100%;
    }to{
      margin-top: 16%;
         }
  }
</style>
