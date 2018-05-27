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
            <img class="point" src="../../static/img/search.png" alt="搜索">
          </div>
          <div class="userLogin">
            <router-link to="/login" tag="button" class="button login">登录</router-link>
            <router-link to="/register" tag="button" class="button register">注册</router-link>
          </div>
          <div class="userInfo" style="display: none">
            <router-link to="writeBlog" tag="div">写博客</router-link>
            <img class="login-img" src="../../static/img/avatar.png" alt="头像">
            <ul class="login-list">
              <router-link to="userCenter" tag="li">个人中心</router-link>
              <router-link to="blogManage" tag="li">博客管理</router-link>
              <li>退出</li>
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
  </div>
</template>

<script>
    import ajax from "../assets/js/ajax"
    export default {
        name: "headed",
        data(){
          return{

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
                console.log(1);
                  document.getElementsByClassName('userLogin')[0].style.display = 'none';
                  document.getElementsByClassName('userInfo')[0].style.display = 'block';
                  document.getElementsByClassName('login-img')[0].src = data.result.logo;
              }
            }
          });
        }
    }
</script>

<style scoped src="../assets/css/head.css">

</style>
