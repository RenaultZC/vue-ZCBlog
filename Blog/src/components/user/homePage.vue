<template>
  <div class="home"  v-cloak>
    <div v-for="item in blog" class="home-item" :blog-id='item.ID'>
      <router-link tag="div" :to="{path:'/myArticle',query: {ID:item.ID}}" :style="{backgroundImage:'url('+(item.img?item.img:'../static/img/blogImg.gif')+')'}" class="item-img"> </router-link>
      <div class="item-info">
        <span class="item-title">
          <router-link tag="b" class="item-title" :to="{path:'/myArticle',query: {ID:item.ID}}">{{item.title}}</router-link>
        </span>
        <div class="item-content">
          <p>{{item.content+'...'}}</p>
        </div>
        <div class="item-user">
          <img v-if="item.logo" :src="item.logo">
          <img v-else="item.logo" src="../../../static/img/avatar.png">
          <span>{{item.author}}</span>
          <div class="item-point"></div>
          <span>{{item.date}}</span>
          <div class="item-point"></div>
          <router-link v-if="item.type===0" to="/algorithmPage" tag="span" class="item-link">算法总结</router-link>
          <router-link v-else to="/blogPage" tag="span" class="item-link">个人博客</router-link>
          <div class="rating">
            <span class="fa fa-eye rating-border" title="阅读量">&ensp;{{parseInt(item.view)}}</span>
            <span class="fa fa-thumbs-o-up rating-border" title="点赞" @click="star(item.ID)" :class="{active:$parent.star[item.ID]}">&ensp;{{parseInt(item.star)}}</span>
            <span class="fa fa-star" title="收藏" @click="collect(item.ID)" :class="$parent.collection[item.ID]?'active':''"></span>
          </div>
        </div>
      </div>
    </div>
    <p v-if="blog===[]" style="font-size: 2rem;text-align: center">目前还没有用户发表博客</p>
  </div>
</template>

<script>
  import ajax from '../../assets/js/ajax';
    export default {
        name: "home-page",
        data(){
          return {
            blog:null,
            login:window.localStorage.login
          }
        },
        beforeCreate:function(){
          document.getElementById("title").innerText = "主页";
          this.$parent.getStar();
          this.$parent.getCollege();
          ajax({
            url:'http://localhost:1234/api/user/article/search',//window.location.origin+'/api/user/article/search',
            type:'GET',
            data:{
              email:window.localStorage.email,
              type:'all',
            },
            success:function (data) {
              this.$parent.loading();
              data = JSON.parse(data);
              if(data.error){
                this.blog = [];
              }else{
                data.result.forEach((item)=>{
                  if(item.logo)
                    item.logo = window.URL.createObjectURL(new Blob([new Buffer(item.logo.data).buffer],{type:'image/jpeg'}));
                  item.date = item.date.slice(0,10);
                });
                this.blog = data.result;
              }
            }.bind(this),
            fail:()=>{
              console.log("请求发不出去");
            }
          });
        },
      mounted(){
        this.$parent.loading();
      }
      ,
      methods:{
          star:function (ID) {
            if(this.$parent.login){
              let that =event;
              let eClassName =that.target.className.split(" ");
              ajax({
                url:/*window.location.origin+*/"http://localhost:1234/api/user/article/star",
                type:"GET",
                data:{
                  ID:ID,
                  code:localStorage.code
                },
                success:function (data){
                  data = JSON.parse(data);
                  if(data.error){
                    console.log(data);
                  }else{
                    if(eClassName.length === 3){
                      that.target.className += " active";
                      this.blog.forEach((item)=>{
                        if(item.ID === ID){
                          item.star++;
                        }
                      });
                    }else if(eClassName.length === 4){
                      that.target.className = eClassName.slice(0,3).join(" ");
                      this.blog.forEach((item)=>{
                        if(item.ID === ID){
                          item.star--;
                        }
                      });
                    }
                    this.$parent.getStar();
                  }
                }.bind(this),
                fail:()=>{
                  console.log('无法发送请求');
                }
              });
            }else{
              this.$parent.Popup('用户未登录','用户尚未登录，点击确定登录后即可点赞','/login');
            }
          },
          collect:function (ID){
            if(this.$parent.login){
              let that = event;
              let eClassName =that.target.className.split(" ");
              ajax({
                url:/*window.location.origin+*/"http://localhost:1234/api/user/article/college",
                type:"GET",
                data:{
                  ID:ID,
                  code:localStorage.code
                },
                success:function (data){
                  data = JSON.parse(data);
                  if(data.error){
                    console.log(data);
                  }else{
                    if(eClassName.length === 2){
                      that.target.className += ' active';
                    }else if(eClassName.length === 3){
                      that.target.className = eClassName.slice(0,2).join(" ");
                    }
                    this.$parent.getCollege();
                  }
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
  .home{
    width: 70%;
    min-width: 720px;
    margin: 0 auto;
  }
  .home-item{
    padding: 10px 0;
    border-bottom: 1px solid black;
    overflow: hidden;
  }
  .item-title{
    line-height: 2rem;
    font-size: 2rem;
  }
  .item-title:hover{
    color: #ca0c16;
    cursor: pointer;
  }
  .item-content p{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    color: darkgray;
  }
  .item-user{
    height: 1.5rem;
  }
  .item-user img{
    width: auto;
    height: 1.5rem;
    padding-right: 0.5rem;
    float: left;
  }
  .item-user span{
    float: left;
  }
  .item-user .item-point{
    width: 0;
    height: 0;
    border-radius: 1px;
    border: 1px solid black;
    float: left;
    margin: 0.5rem 0.5rem;
  }
  .item-link:hover{
    cursor: pointer;
  }
  .rating{
    float: right;
    vertical-align: middle;
  }
  .rating-border{
    border-right: 1px solid rgba(0,0,0,0.5);
  }
  .rating span{
    padding: 0 0.5rem;
    margin: 0;
    line-height: 1.5rem;
  }
  .rating .active:before{
    color: orange;
  }
  .rating  .fa-thumbs-o-up:hover:before,.rating .fa-star:hover:before{
    cursor: pointer;
    color: orange;
  }
  [v-cloak]{
    display: none;
  }
  .item-img{
    float: left;
    width: 18%;
    margin: 0 1%;
    height: 110px;
    border-radius: 5px;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .item-info{
    width: 80%;
    float: left;
  }
</style>
