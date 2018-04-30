<template>
  <div>
    <canvas id="canvas"></canvas>
    <div id="content">
      <div class="content-logo"></div>
      <div class="content-motto">{{contentMotto}}</div>
      <div class="content-link">
        <a href="./homePage">Blog</a>
        <a href="./algorithmPage">Algorithm</a>
        <a href="https://github.com/RenaultZC">GitHub</a>
        <a href="./rewardPage">Reward</a>
      </div>
    </div>
  </div>
</template>

<script>
  import drawCanvas1 from "../assets/js/drawcanvas1";
  import drawCanvas2 from "../assets/js/drawcanvas2";
    export default {
        name: "home",
        data(){
           return {
             contentMotto:""
           }
        },
        beforeCreate:function(){
          document.getElementById("title").innerText = "Welcome To Zc Blog";
        }
        ,
        mounted:function (){
            let a = 1-Math.random().toFixed();
            window.onload = ()=>{
              if(a){
                drawCanvas1();
              }else{
                drawCanvas2();
              }
            };
            if(a){
              this.contentMotto = "弱水三千，只取一瓢";
            }else{
              this.contentMotto = "一啄一饮，莫非前定";
            }
        }
    }
</script>

<style scoped>
  #content{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 720px;
    height: 350px;
  }
  .content-logo{
    width: 200px;
    height: 200px;
    background-size: 100%;
    background-image: url("../assets/img/logo.jpg");
    background-position: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 50%;
  }
  .content-link{
    margin-top: 20px;
    overflow: hidden;
    font-family:"Garamond";
    font-size: 1.5rem;
    font-weight:bold ;
  }
  .content-link a{
     color: lightgray;
     text-decoration: none;
     width: 25%;
     display: block;
     float: left;
     transition: 0.3s;
     text-align: center;
   }
  .content-link a:hover{
     color: rgba(0,0,0,0.8);
   }
  .content-motto{
     text-align: center;
     font-size: 2rem;
     font-family: "华文行楷";
     margin-top: 5%;
  }
</style>
