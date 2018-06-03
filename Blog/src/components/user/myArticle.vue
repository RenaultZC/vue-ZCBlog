<template>
    <div>article{{ID}}....</div>
</template>

<script>
  import ajax from '../../assets/js/ajax';
    export default {
        name: "myArticle",
        data(){
          return{
            ID:null,
            title:null,
            author:null,
            content:null,
            date:null,
            like:null,
            logo:null
          }
        },
        beforeCreate:function () {
          let ID = this.$route.query.ID;
          if(!ID){
            this.$router.push({path:'/home'});
          }else{
            ajax({
              url:'http://localhost:1234/api/user/article/search',//window.location.origin+'/api/user/article/search',
              type:'GET',
              data:{
                flag:ID,
                type:'ID',
              },
              success:function (data) {
                data = JSON.parse(data);
                if(data.error){

                }else{
                  this.ID = data.result[0].ID;
                  this.title = data.result[0].title;
                  this.author = data.result[0].author;
                  this.content = data.result[0].content;
                  this.date = data.result[0].date;
                  this.like = data.result[0].like;
                  this.logo = data.result[0].logo;
                }
              }.bind(this),
              fail:()=>{
                console.log("请求发不出去");
              }
            });
          }
        }
    }
</script>

<style scoped>

</style>
