<template>
  <div>
    <div id="head">
      <div class="head-content">
        <ul class="head-left">
          <router-link to="/homepage" tag="li"> 首页</router-link>
          <router-link to="/blogPage" tag="li">我的博客</router-link>
          <router-link to="/algorithmPage" tag="li">算法总结</router-link>
          <router-link to="/introducePage" tag="li">自我介绍</router-link>
        </ul>
        <div class="head-right">
          <div class="head-search">
            <input type="text" maxlength="10" placeholder="搜索">
            <img class="point" src="../../static/img/search.png" alt="搜索">
          </div>
          <div class="userLogin"><button id="login">Login</button></div>
          <div class="userInfo" style="display: none"><img src="../../static/img/avatar.png" alt="头像"></div>
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
    export default {
        name: "headed"
    }
</script>

<style scoped src="../assets/css/head.css">

</style>
