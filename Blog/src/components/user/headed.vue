<template>
  <div>
    <div id="head">
      <div class="head-content">
        <ul class="head-left">
          <router-link to="/homepage" tag="li"> 首页</router-link>
          <router-link to="/blogPage" tag="li">博客</router-link>
          <router-link to="/algorithmPage" tag="li">算法总结</router-link>
          <router-link to="/introducePage" tag="li">自我介绍</router-link>
        </ul>
        <div class="head-right">
          <div class="head-search">
            <input type="text" maxlength="10" placeholder="搜索">
            <img class="point" src="../../../static/img/search.png" alt="搜索">
          </div>
          <div class="userLogin">
            <router-link to="/login" tag="button" class="button login">登录</router-link>
            <router-link to="/register" tag="button" class="button register">注册</router-link>
          </div>
          <div class="userInfo" style="display: none">
            <ul>
              <li>
                <router-link to="writeBlog" tag="div" class="write-blog">写博客</router-link>
              </li>
              <li v-on="{mouseover:loginListOn,mouseout:loginListOut}">
                <router-link class="login-img" src="../../static/img/avatar.png" tag="img" to="userCenter" alt="头像"> </router-link>
                <ul class="login-list" :style="{ display : loginList}">
                  <router-link to="userCenter" tag="li">个人中心</router-link>
                  <router-link to="blogManage" tag="li">博客管理</router-link>
                  <li @click="loginOut">退出</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="body">
      <transition name="fade" mode="out-in">
        <router-view>
        </router-view>
      </transition>
    </div>
    <div class="alert-background">
      <div class="alert">
        <div class="alert-head">
          <span class="alert-title">错误类型</span>
          <b class="close" @click="PopDisplay">×</b>
        </div>
        <div class="alert-content">
          错误内容
        </div>
        <div class="alert-button">
          <router-link :to="link" @click.native="PopDisplay" tag="div">确定</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import ajax from "../../assets/js/ajax"
    export default {
        name: "headed",
        data(){
          return{
            loginList:"none",
            login:false,
            link:''
          }
        },
        beforeCreate:function () {
          ajax({
            url:'http://localhost:1234/api/user/getInfo',
            type:"GET",
            data:{
              code:window.localStorage.code
            },
            success:function (data) {
              data = JSON.parse(data);
              if(!data.error){
                document.getElementsByClassName('userLogin')[0].style.display = 'none';
                document.getElementsByClassName('userInfo')[0].style.display = 'block';
                this.login = true;
                if(data.result.logo)
                  document.getElementsByClassName('login-img')[0].src = data.result.logo;
              }else{
                localStorage.clear();
              }
            }.bind(this),
            fail:()=>{
              console.log("请求发不出去");
            }
          });
        },
        methods:{
            update:function () {
              ajax({
                url:'http://localhost:1234/api/user/getInfo',
                type:"GET",
                data:{
                  code:window.localStorage.code
                },
                success:function (data) {
                  data = JSON.parse(data);
                  if(!data.error){
                    document.getElementsByClassName('userLogin')[0].style.display = 'none';
                    document.getElementsByClassName('userInfo')[0].style.display = 'block';
                    if(data.result.logo)
                      document.getElementsByClassName('login-img')[0].src = '../../static/img/avatar.png';
                  }
                  this.login = true;
                }.bind(this),
                fail:()=>{
                  console.log("请求发不出去");
                }
              });
            },
          loginListOn:function () {
            this.loginList = "block";
          },
          loginListOut:function () {
            this.loginList = "none";
          },
          loginOut:function () {
            ajax({
              url:'http://localhost:1234/api/user/loginOut',
              type:"GET",
              data:{
                code:window.localStorage.code
              },
              success:function (data) {
                data = JSON.parse(data);
                document.getElementsByClassName('userLogin')[0].style.display = 'block';
                document.getElementsByClassName('userInfo')[0].style.display = 'none';
                if(data.result.logo)
                  document.getElementsByClassName('login-img')[0].src = data.result.logo;
                localStorage.clear();
                this.login = false;
                this.$router.push({path:"/homepage"})
              }.bind(this),
              fail:()=>{
                console.log("请求发不出去");
              }
            })
          },
          Popup:function (type = '错误',content = '点击确定继续操作',link = '') {
            this.link = link;
            let alertType = document.getElementsByClassName("alert-title")[0];
            let alertContent = document.getElementsByClassName("alert-content")[0];
            alertType.innerText = type;
            alertContent.innerText = content;
            document.getElementsByClassName("alert-background")[0].style.display = "block";
          },
          PopDisplay:function (){
              document.getElementsByClassName("alert-background")[0].style.display = "none";
          }
        }
    }
</script>

<style scoped src="../../assets/css/head.css">

</style>
