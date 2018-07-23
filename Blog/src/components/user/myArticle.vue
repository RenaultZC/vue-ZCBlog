<template>
    <div class="article" :style="{display:display?'block':'none'}">
      <div class="list">
        <div class="star" title="点赞" :class="this.$parent.star[ID]?'active':''" @click="Star">
          <span class="fa fa-thumbs-o-up" ></span><br>
          <span>{{star+''}}</span>
        </div>
        <div class="college" title="收藏" :class="this.$parent.collection[ID]?'active':''" @click="collect">
          <span class=" fa fa-star" ></span><br>
          <span>收藏</span>
        </div>
        <div :class="toTop?'topIn':''" class="toTop" @click="topUp" title="回到顶部">
          <span class="fa fa-arrow-up"></span><br>
          <span>TOP</span>
        </div>
      </div>
      <div class="title">
        <h1>{{title}}</h1>
        <span>发表日期：{{date}}</span>
        <span>&nbsp;作者：{{author}}</span>
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
            view:null,
            toTop:false,
            star:null,
            display:false,
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
                  this.date = this.date.split(' ')[0].split('/')[0]+'年'+this.date.split(' ')[0].split('/')[1]+'月'+this.date.split(' ')[0].split('/')[2]+'日 ';
                  this.like = data.result[0].like;
                  this.logo = data.result[0].logo;
                  this.view = data.result[0].view;
                  this.star = data.result[0].star;
                  this.display = true;
                  this.$parent.loading();
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
        },
        mounted(){
          window.onscroll = ()=>{
              if(window.scrollY > innerHeight){
                this.toTop = true;
              }else{
                this.toTop = false;
              }
          };
          this.$parent.loading();
        },
        methods:{
          topUp(){
            if(this.toTop){
              window.scrollTo(0,0);
            }
          },
          Star:function () {
            if(this.$parent.login){
              let star = document.querySelectorAll('.star')[0];
              let eClassName = star.className.split(' ');
              ajax({
                url:/*window.location.origin+*/"http://localhost:1234/api/user/article/star",
                type:"GET",
                data:{
                  ID:this.ID,
                  code:localStorage.code
                },
                success:function (data){
                  data = JSON.parse(data);
                  if(data.error){
                    console.log(data);
                  }else{
                    if(eClassName.length === 1){
                      star.className += " active";
                      this.star++;
                    }else if(eClassName.length === 2){
                      star.className = eClassName.slice(0,1).join(" ");
                      this.star--;
                    }
                  }
                  this.$parent.getStar();
                }.bind(this),
                fail:()=>{
                  console.log('无法发送请求');
                }
              });
            }else{
              this.$parent.Popup('用户未登录','用户尚未登录，点击确定登录后即可点赞','/login');
            }
          },
          collect:function (){
            if(this.$parent.login){
              let collection = document.querySelectorAll('.college')[0];
              let eClassName = collection.className.split(' ');
              ajax({
                url:/*window.location.origin+*/"http://localhost:1234/api/user/article/college",
                type:"GET",
                data:{
                  ID:this.ID,
                  code:localStorage.code
                },
                success:function (data){
                  data = JSON.parse(data);
                  if(data.error){
                    console.log(data);
                  }else{
                    if(eClassName.length === 1){
                      collection.className += " active";
                    }else if(eClassName.length === 2){
                      collection.className = eClassName.slice(0,1).join(" ");
                    }
                  }
                  this.$parent.getCollege();
                }.bind(this),
                fail:()=>{
                  console.log('无法发送请求');
                }
              });
            }else{
              this.$parent.Popup('用户未登录','用户尚未登录，点击确定登录后即可收藏','/login');
            }
          }
        }
    }
</script>

<style scoped>
  .article{
    width: 900px;
    left: 0;
    right: 0;
    margin: 0 auto;
    position: relative;
    padding-bottom: 5rem;
  }
  .title{
    padding: 8px 25px 15px 25px;
    border: 1px solid #e0e0e0;
    border-bottom: 0;
    background: #fbfbfb;
  }
  .view{
    float: right;
  }
  .list{
    width: 44px;
    position: fixed;
    margin-left: -50px;
    z-index: 9999;
    text-align: center;
  }
  .toTop{
    opacity: 0;
    text-align: center;
    transition: 0.5s;
  }
  .topIn{
    opacity: 1;
  }
  .v-note-panel{
    border: none!important;
  }
  .list div{
    width: 44px;
    height: 40px;
    border-radius: 4px;
    font-size: 12px;
    color: #6b6b6b;
    cursor: pointer;
    border: 1px solid #eeeeee;
    background: #fff;
    margin-bottom: 4px;
    padding-top: 4px;
  }
  .list .fa{
    font-size: 18px;
  }
  .list div:hover{
    color: orange;
  }
  .list .active{
    color: orange;
  }
  @media screen and (max-width: 1020px) {
    .list{
      left: 56px;
      top: 64px;
    }
  }
</style>
