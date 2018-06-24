<template>
    <div class="article">
      <div class="title">
        <h1>{{title}}</h1>
        <span>{{date}}</span>
        <span class="view fa fa-eye">阅读数：{{view}}</span>
      </div>
      <div id="editor">
        <mavon-editor
          ref=md
          :scroolStyle="false"
          :boxShadow="false"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbars="toolbars"
          :editable="false"
          :toolbarsFlag="false"
          :readModel="true"
          :value="content+''"
        > </mavon-editor>
      </div>
      <div class="footer">

      </div>
    </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
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
            logo:null,
            toolbars:{},
            view:null
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
                  this.$router.go(-1);
                }else{
                  this.ID = data.result[0].ID;
                  this.title = data.result[0].title;
                  this.author = data.result[0].author;
                  this.content = data.result[0].content;
                  this.date = data.result[0].date;
                  this.date = new Date(this.date).toLocaleString();
                  this.date = this.date.split(' ')[0].split('/')[0]+'年'+this.date.split(' ')[0].split('/')[1]+'月'+this.date.split(' ')[0].split('/')[2]+'日 '+this.date.split(' ')[1];
                  this.like = data.result[0].like;
                  this.logo = data.result[0].logo;
                  this.view = data.result[0].view;
                }
              }.bind(this),
              fail:()=>{
                console.log("请求发不出去");
              }
            });
          }
        },
        components: {
          'mavon-editor': mavonEditor
        }
    }
</script>

<style scoped>
  .article{
    width: 900px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .title{
    padding: 8px 25px 15px 25px;
  }
  .view{
    float: right;
  }
</style>
