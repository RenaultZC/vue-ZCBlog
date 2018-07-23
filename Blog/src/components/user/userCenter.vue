<template>
    <div class="userCenter">
      <div class="user-info">
        <div class="user-logo" v-on="{mouseover:changeLogoOn,mouseout:changeLogoOff}">
          <img :src=user.userLogo alt="用户头像">
          <i class="fa fa-pencil-square-o" title="修改头像" :style="{display:changeLogo}" @click="popChange"></i>
        </div>
        <p class="user-name">
          {{user.username}} <i class="fa fa-pencil-square-o changeName" @click="changeName">修改名称</i>
        </p>
        <p class="change-name"  style="display:none;">
          <input type="text" v-model="username" maxlength="10" placeholder="请输入用户名" @keyup.enter="saveName">
          <span @click="saveName">确定</span>
          <span @click="closeName">取消</span>
        </p>
        <p>收藏数:{{collection.length+""}}</p>
        <p>点赞数:{{star.length+""}}</p>
      </div>
      <div class="user-article">
        <div class="article-head">
            <ul>
              <li :class="oneself?'active':''" @click="changeSelf(1)">我的文章</li>
              <li :class="oneself?'':'active'" @click="changeSelf(0)">我的收藏</li>
            </ul>
        </div>
        <div class="article-body">
          <div class="article"></div>
          <div v-if="oneself" >
            <div class="article" v-for="item in article">
              <router-link class="article-title" tag="p" :to="{path:'/myArticle',query: {ID:item.ID}}">{{item.title}}</router-link>
              <span class="delete-article fa fa-trash" @click="deleteArticle(item.ID)" title="删除博客"></span>
                <p class="article-time">{{item.date.slice(0,-5).split('T')[0]}}</p>
            </div>
          </div>
          <div v-else >
            <div class="article" v-for="item in collection">
              <router-link class="article-title" tag="p" :to="{path:'/myArticle',query: {ID:item.ID}}">{{item.title}}</router-link>
              <span class="delete-article fa fa-star" style="color: orange" @click="deleteCollege(item.ID)" title=""></span>
            </div>
          </div>
        </div>
      </div>
      <div class="changeLogo-background" style="display: none">
        <div class="changeLogo">
          <div class="chooseFile">
            <input type="file" @change="getLogo" id="logoFile">
            <span class="fa fa-photo">选择图片</span>
          </div>
          <p class="change-prompt">{{logoOption}}</p>
          <div class="headers">
            <div>
              <canvas id="userCanvas"></canvas>
            </div>
            <div>
              <div>
                <img :src="logoUrl" class="middle" :style="logoUrl?{opacity:1}:{opacity:0}">
              </div>
              <span :style="logoUrl?{opacity:1}:{opacity:0}">75×75</span>
            </div>
            <div>
              <div>
                <img :src="logoUrl" class="small" :style="logoUrl?{opacity:1}:{opacity:0}">
              </div>
              <span :style="logoUrl?{opacity:1}:{opacity:0}">24×24</span>
            </div>
          </div>
          <p class="logoSuccess">
            <span @click="outChange">取消</span>
            <span @click="saveLogo">保存</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
  import ajax from "../../assets/js/ajax";
    export default {
        name: "user-center",
        data(){
          return{
            user:{
              username:null,
              userLogo:null
            },
            changeLogo:"none",
            logoUrl:null,
            logoOption:"仅支持JPG,GIF,JPEG,PNG格式且文件小于5M",
            username:null,
            collection:[],
            star:[],
            article:[],
            oneself:true
          }
        },
        beforeCreate(){
          ajax({
            url:'http://localhost:1234/api/user/getInfo',
            type:"GET",
            data:{
              code:window.localStorage.code
            },
            success:function (data) {
              data = JSON.parse(data);
              if(!data.error){
                this.username = data.result.username;
                this.user.username = data.result.username;
                this.user.userLogo = data.result.logo?window.URL.createObjectURL(new Blob([new Buffer(data.result.logo.data).buffer],{type:'image/jpeg'})):'../../static/img/avatar.png';
              }else{
                localStorage.clear();
                this.$router.push({path:'/login'});
              }
            }.bind(this),
            fail:()=>{
              console.log("请求发不出去");
            }
          });
        },
        mounted(){
          this.getCollege();
          this.getStar();
          this.getArticle();
        },
        methods:{
          changeLogoOn(){
            this.changeLogo = 'block';
          },
          changeLogoOff(){
            this.changeLogo = 'none';
          },
          getLogo(){
            if(event.target.files.length){
              let reader = new FileReader(),
                  img = new Image(),
                  canvas = document.getElementById('userCanvas'),
                  context = canvas.getContext('2d'),
                  logo = event.target.files[0],
                  type = logo.name.split(".")[1],
                  that = this;
              canvas.width = 150;
              canvas.height = 150;
              reader.readAsDataURL(logo);
              reader.onload = (ev)=>{
                img.src = ev.target.result;
                if(type!=="jpg"&&type!=="gif"&&type!=="jpeg"&& type!=="png"){
                  this.logoOption = "文件不是JPG,GIF,JPEG,PNG格式";
                }else if(Math.floor(logo.size/(5*1024**2))){
                  this.logoOption = "文件过大请选择小于5M的文件";
                }else{
                  this.logoOption = "仅支持JPG,GIF,JPEG,PNG格式且文件小于5M";
                  img.onload = ()=>{
                    let width = img.width,
                        height = img.height,
                        center = {x : width / 2 , y : height / 2 , side : 0};
                    center.side = (width > height ? height / 2 : width / 2);
                    context.drawImage(img,center.x - center.side,center.y - center.side,center.side*2,center.side*2,0,0,149,149);
                    that.logoUrl = canvas.toDataURL('image/jpeg',1);
                  }
                }
              };
            }
          },
          popChange(){
            document.getElementsByClassName("changeLogo-background")[0].style.display = "block";
          },
          outChange(){
            document.getElementsByClassName("changeLogo-background")[0].style.display = "none";
            document.getElementById("logoFile").value = "";
            let canvas = document.getElementById('userCanvas'),
                context = canvas.getContext('2d');
            context.clearRect(0,0,150,150);
            this.logoUrl = null;
          },
          saveLogo(){
            let canvas = document.getElementById('userCanvas');
            canvas.toBlob((data)=>{
              let formdata = new FormData();
              formdata.append("img", data);
              formdata.append('code',localStorage.code);
              formdata.append('type','1');
              $.ajax({
                url:'http://localhost:1234/api/user/changeInfo',
                type:'POST',
                processData: false,
                contentType: false,
                xhrFields: {withCredentials: true},
                data: formdata,
                success:function (data) {
                  this.outChange();
                  this.$parent.update();
                  this.update();
                }.bind(this),
                error:function (data){
                  console.log(data);
                }
              });
            },'image/jpeg',1);
          },
          changeName(){
            document.getElementsByClassName('change-name')[0].style.display = 'block';
            document.getElementsByClassName('change-name')[0].children[0].focus();
          },
          closeName(){
            document.getElementsByClassName('change-name')[0].style.display = 'none';
          },
          saveName(){
            ajax({
              url:'http://localhost:1234/api/user/changeInfo',
              type:'POST',
              data: {
                type:'0',
                value:this.username,
                code:window.localStorage.code
              },
              success:function (data) {
                if(data.error){
                  console.log(data);
                }else{
                  this.update();
                  this.closeName();
                }
              }.bind(this),
              error:function (data){
                console.log(data);
              }
            })
          },
          getCollege(){
            ajax({
              url:'http://localhost:1234/api/user/article/getCollege',
              type:"GET",
              data:{
                code:window.localStorage.code
              },
              success:function(data){
                data = JSON.parse(data);
                if(data.error){
                  this.collection = [];
                }else{
                  this.collection = data.result;
                }
              }.bind(this)
            })
          },
          getStar(){
            ajax({
              url:'http://localhost:1234/api/user/article/getStar',
              type:"GET",
              data:{
                code:window.localStorage.code
              },
              success:function(data){
                data = JSON.parse(data);
                if(data.error){
                  this.star = [];
                }else{
                  this.star = data.result;
                }
              }.bind(this)
            })
          },
          getArticle(){
            ajax({
              url:'http://localhost:1234/api/user/article/search',
              type:"GET",
              data:{
                type:'email',
                flag:window.localStorage.code
              },
              success:function(data){
                data = JSON.parse(data);
                if(data.error){
                  this.article = [];
                }else{
                  this.article = data.result;
                }
              }.bind(this)
            })
          },
          update(){
            ajax({
              url:'http://localhost:1234/api/user/getInfo',
              type:"GET",
              data:{
                code:window.localStorage.code
              },
              success:function (data) {
                data = JSON.parse(data);
                if(!data.error){
                  this.username = data.result.username;
                  this.user.username = data.result.username;
                  this.user.userLogo = data.result.logo?window.URL.createObjectURL(new Blob([new Buffer(data.result.logo.data).buffer],{type:'image/jpeg'})):'../../static/img/avatar.png';
                }else{
                  localStorage.clear();
                  this.$router.push({path:'/login'});
                }
              }.bind(this),
              fail:()=>{
                console.log("请求发不出去");
              }
            });
          },
          changeSelf(type){
            if(type === 1){
              this.oneself = true;
            }else{
              this.oneself = false;
            }
          },
          deleteArticle(ID){
            ajax({
              url:'http://localhost:1234/api/user/article/delete',
              type:"POST",
              data:{
                code:window.localStorage.code,
                ID:ID
              },
              success:function (data) {
                data = JSON.parse(data);
                if(data.error){
                  this.$parent.Popup('删除失败','删除失败请稍后重试');
                }else{
                  this.getArticle();
                }
              }.bind(this),
              fail:()=>{
                console.log("请求发不出去");
              }
            });
          },
          deleteCollege(ID){
            ajax({
              url:'http://localhost:1234/api/user/article/college',
              type:"GET",
              data:{
                ID:ID,
                code:window.localStorage.code
              },
              success:function (data) {
                data = JSON.parse(data);
                if(data.error){
                  this.$parent.Popup('取消收藏失败','取消收藏失败请稍后重试');
                }else{
                  this.getCollege();
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
  .user-info{
    overflow: hidden;
    position: relative;
  }
  .userCenter{
    width: 80%;
    min-width: 720px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  #userCanvas{
    width: 150px;
    height: 150px;
  }
  .user-logo{
    width: 150px;
    float: left;
    position: relative;
    margin: 20px;
  }
  .user-logo img{
    width: 150px;
  }
  .user-logo i{
    font-size: 1.5rem;
    width: 1.5rem;
    left: 0;
    right: 0;
    bottom: 1.2rem;
    margin: 0 auto;
    position: absolute;
  }
  .user-logo i:hover{
    cursor: pointer;
  }
  .changeLogo-background{
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
  }
  .changeLogo{
    width: 500px;
    height: 300px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 1rem;
    margin: auto;
    background-color: white;
    overflow: hidden;
  }
  .chooseFile input{
    width: 7rem;
    height: 3rem;
    opacity: 0;
    left: 1rem;
    position: absolute;
    z-index: 1;
  }
  .chooseFile span{
    color: white;
    background-color: orangered;
    padding: 0.5rem;
    margin: 0.5rem;
  }
  .changeLogo .change-prompt{
    font-family: 方正姚体;
  }
  .middle{
    width: 75px;
    height: 75px;
  }
  .small{
    width: 24px;
    height: 24px;
  }
  .headers{
    width: 100%;
    overflow: hidden;
  }
  .headers div{
    margin-right: 5%;
    float: left;
  }
  .logoSuccess{
    overflow: hidden;
  }
  .logoSuccess span{
    float: right;
    background-color: #be0000;
    color: white;
    padding: 0.2rem 0.5rem;
    margin: 0 0.5rem;
  }
  .logoSuccess span:nth-child(1){
    background-color: lightgray;
    color: white;
  }
  .logoSuccess span:hover{
    cursor: pointer;
  }
  .user-info p{
    width: 70%;
    float: left;
    font-size: 24px;
    margin-bottom: 0;
  }
  .user-info .user-name{
    font-size: 24px;
  }
  .change-name{
    float: left;
    font-size: 24px;
  }
  .change-name input{
    line-height: 24px;
    font-size: 24px;
    outline: none;
    border: 0;
    border-bottom: 1px solid black;
    width: 180px;
  }
  .change-name{
    background: white;
    left: 190px;
    position: absolute;
  }
  .change-name span{
    background-color: #be0000;
    color: white;
    padding: 0.2rem 0.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
    font-size: 14px;
  }
  .change-name span:last-child{
    background-color: lightgray;
    color: white;
  }
  .change-name span:hover{
    cursor: pointer;
  }
  .changeName{
    color: #5C9BF3;
    cursor: pointer;
    font-size: 16px;
    margin-left: 1rem;
  }
  .article-head ul{
    list-style: none;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
  .article-head ul li{
    height: 48px;
    line-height: 48px;
    width: 49.5%;
    border: 1px solid transparent;
    float: left;
    text-align: center;
    cursor: pointer;
    background: #eee;
  }
  .article-head ul .active{
    background: #fff;
    border-top: 1px solid #8d8d8d;
  }
  .delete-article{
    font-size: 24px;
    float: right;
    margin: 1rem 1rem 0 1rem;
    cursor: pointer;
  }
  .article{
    border-bottom: 1px solid #eeeeee;
    overflow: hidden;
  }
  .article-title{
    float: left;
    color: #428bca;
    cursor: pointer;
    margin-left: 1rem;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .article-time{
    float: right;
  }
</style>
