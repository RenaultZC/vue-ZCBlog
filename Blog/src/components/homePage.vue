<template>
  <div>
    <h1>home{{blog}}</h1>
  </div>
</template>

<script>
  import ajax from '../assets/js/ajax';
    export default {
        name: "home-page",
        data(){
          return {
            blog:null,
            algorithm:null,
          }
        },
        beforeCreate:function(){
          document.getElementById("title").innerText = "主页";
          ajax({
            url:'http://localhost:1234/api/user/article/search',//window.location.origin+'/api/user/article/search',
            type:'GET',
            data:{
              email:window.localStorage.email,
              type:'all',
            },
            success:function (data) {
              if(data.error){

              }else{

              }
            }.bind(this),
            fail:()=>{
              console.log("请求发不出去");
            }
          });
        }
    }
</script>

<style scoped>

</style>
