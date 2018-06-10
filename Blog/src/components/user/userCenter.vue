<template>
    <div class="userCenter">
      <div class="user-info">
        <div class="user-logo" v-on="{mouseover:changeLogoOn,mouseout:changeLogoOff}">
          <img :src=userLogo alt="用户头像">
          <i class="fa fa-pencil-square-o" title="修改头像" :style="{display:changeLogo}" @click="popChange"></i>
        </div>
      </div>
    <div class="changeLogo-background">
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
            userLogo:null,
            username:null,
            changeLogo:"none",
            logoUrl:null,
            logoOption:"仅支持JPG,GIF,JPEG,PNG格式且文件小于5M",
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
                this.userLogo = data.result.logo?data.result.logo:'../../static/img/avatar.png';
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
                    canvas.toBlob((data)=>{
                      console.log(data);
                    },'image/jpeg',1);
                    console.log(reader.result.length);
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

          }
        }
    }
</script>

<style scoped>
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
    position: relative;
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
</style>
