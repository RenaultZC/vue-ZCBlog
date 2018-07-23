<template>
  <div class="blog"  v-cloak>
    <div class="blog-content">
      <div class="blog-item" v-for="item in blog">
          <router-link  :to="{path:'/myArticle',query: {ID:item.ID}}" tag="div"  class="item-info" :style="item.img?'':'width:100%'">
            <div class="item-head">
              <img v-if="item.logo" :src="item.logo">
              <img v-else="item.logo" src="../../../static/img/avatar.png">·
              <span>{{item.author}}</span>·
              <span>{{item.date}}</span>
              <p class="item-title"><span class="title">{{item.title}}</span></p>
            </div>
            <div class="item-content" :title="item.content+'...'">
              {{item.content+'...'}}
            </div>
          </router-link>
          <div class="item-foot">
            <span class="fa fa-eye rating-border" title="阅读量">&ensp;{{parseInt(item.view)}}</span>
            <span class="fa fa-thumbs-o-up rating-border" title="点赞" @click="star(item.ID)" :class="{active:$parent.star[item.ID]}">&ensp;{{parseInt(item.star)}}</span>
            <span class="fa fa-star" title="收藏" @click="collect(item.ID)" :class="$parent.collection[item.ID]?'active':''">&ensp;收藏</span>
          </div>
          <router-link :to="{path:'/myArticle',query: {ID:item.ID}}" tag="div" class="item-img" :style="{backgroundImage:'url('+item.img+')',display:item.img?'':'none'}"> </router-link>
      </div>
    </div>
    <div class="blog-aside">
      <div class="aside-content">
        <p class="aside-title">其他博客网站</p>
        <ul>
          <li><a href="https://www.csdn.net/"><img src="http://www.ayla.com.cn/assets/blt8947f26905c0f94e/CSDN.jpg" alt="CSDN" title="CSDN"></a></li>
          <li><a href="https://juejin.im"><img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="掘金" title="掘金"></a></li>
          <li><a href="https://www.jianshu.com/"><img src="https://cdn2.jianshu.io/assets/web/nav-logo-4c7bbafe27adc892f3046e6978459bac.png" alt="简书" title="简书"></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import ajax from '../../assets/js/ajax';
    export default {
        name: "blog-page",
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
              this.blog = [];
              if(data.error){
                console.log(data.error);
              }else{
                let arr = [];
                data.result.forEach((item)=>{
                  if(item.type === 1){
                    if(item.logo)
                      item.logo = window.URL.createObjectURL(new Blob([new Buffer(item.logo.data).buffer],{type:'image/jpeg'}));
                    item.date = item.date.slice(0,10);
                    this.blog.push(item);
                  }
                });
              }
            }.bind(this),
            fail:()=>{
              console.log("请求发不出去");
            }
          });
        },
        mounted(){
          this.$parent.loading();
          console.log(this.$router)
        },
        data(){
          return{
            blog:[]
          }
        },
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
  .blog{
    width: 960px;
    left: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    position: relative;
  }
  .blog-content{
    width: 720px;
    float: left;
  }
  .blog-item{
    width: 700px;
    height: 130px;
    padding: 9px;
    border: 1px solid #dbdcdc;
    cursor: pointer;
    position: relative;
  }
  .item-info{
    width: 80%;
    height: 100%;
    float: left;
  }
  .item-head img{
    width: auto;
    height: 1.5rem;
    margin: 0 0.5rem
  ;
  }
  .item-head span{
    margin: 0 0.5rem;
  }
  .item-img{
    float: right;
  }
  .item-content{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-img{
    width: 20%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .item-title{
    margin: 0.5rem 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-title span:hover{
    text-decoration: underline;
  }
  .item-content{
    color: #b2bac2;
    padding-left: 1rem;
  }
  .item-foot span{
    border: 1px solid #edeeef;
    padding: 0.3rem;
    display: flex;
    justify-content: center;
    float: left;
    color: #b2bac2;
  }
  .item-foot{
    overflow: hidden;
    position: absolute;
    bottom: 9px;
  }
  .item-foot span:hover{
    background-color: #f7f8fa;
  }
  .item-foot span:nth-child(1):hover{
    background: transparent;
  }
  .item-foot .active{
    color: orange;
  }
  .blog-aside{
    width: calc(100% - 720px);
    height: 3rem;
    position: absolute;
    top: 0;
    right: 0;
  }
  .aside-content{
    position: fixed;
    width: 200px;
    margin-left: 20px;
    top: 64px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.3);
    border-radius: 10px;
  }
  .aside-title{
    margin: 0 10px;
    line-height: 45px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #dbdcdc;
  }
  .aside-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
  }
  .aside-content img{
    height: 3.5rem;
    margin: 0.5rem;
  }
  .aside-content ul li{
    margin: 0.5rem;
    border-radius: 5px;
    border: 1px solid #dbdcdc;
  }
  [v-cloak]{
    display: none;
  }
  @media screen and (max-width: 960px){
    .blog-aside{
      display: none;
    }
    .blog{
      width: 720px;
    }
  }
</style>
