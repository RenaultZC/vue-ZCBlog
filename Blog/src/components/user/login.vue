<template>
  <div class="loginPage">
    <div class="login-form">
          <input id="username" type="text" placeholder="请输入电子邮箱" @keyup.enter="login">
          <input id="password" type="password" placeholder="请输入密码" @keyup.enter="login">
          <div class="text">
            <router-link tag="span" to="/forgetPassword" class="text-left" >忘记密码</router-link>
            <router-link tag="span" to="/register" class="text-right">注册账号</router-link>
          </div>
          <input id="login" type="submit" value="登录" @click="login">
    </div>
  </div>
</template>

<script>
    import ajax from "../../assets/js/ajax";
    import encryption from "../../assets/js/encryption";
    export default {
        name: "login",
      beforeCreate:function(){
        document.getElementById("title").innerText = "登录";
        if(this.$parent.login){
          this.$router.push({name:'homePage'});
        }
      },
      mounted:function () {
        document.getElementsByClassName("loginPage")[0].style.height = window.innerHeight - 100 + "px";
      },
      methods:{
          login:function () {
            let usernameReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            let user = document.getElementById("username");
            let pass = document.getElementById("password");
            let username = user.value;
            let password = pass.value;
            if(username && password){
              if(!usernameReg.test(username)){
                user.value = "";
                pass.value = "";
                user.placeholder = "请输入正确邮箱";
                user.className = "error";
                pass.className = "";
              }else{
                password = encryption(password);
                ajax({
                  url:/*window.location.origin+*/"http://localhost:1234/api/user/login",
                  type:"POST",
                  data:{
                    username:username,
                    password:password
                  },
                  success:function (data){
                    data = JSON.parse(data);
                    if(data.error){
                      if(data.result === "用户不存在"){
                        user.value = "";
                        pass.value = "";
                        user.placeholder = "请输入正确邮箱";
                        user.className = "error";
                        pass.className = "";
                      }else{
                        pass.value = "";
                        pass.placeholder = "密码不正确";
                        pass.className = "error";
                      }
                    }else{
                      localStorage.setItem('code',data.result.code);
                      localStorage.setItem('flag',data.result.flag);
                      this.$router.push({name:'homePage'});
                      this.$parent.update();
                      this.$parent.getCollege();
                      this.$parent.getStar();
                      this.$parent.login = true;
                    }
                  }.bind(this),
                  fail:()=>{
                    console.log('无法发送请求');
                  }
                });
              }
            }else{
              if(password){
                user.placeholder = "请输入电子邮箱";
                user.className = "error";
              }else if(username){
                user.placeholder = "请输入电子邮箱";
                user.className = "";
                pass.placeholder = "请输入密码";
                pass.className = "error";
              }else{
                pass.placeholder = "请输入密码";
                pass.className = "error";
                user.placeholder = "请输入电子邮箱";
                user.className = "error";
              }
            }
          }
      }
    }
</script>

<style scoped>
  .loginPage {
    width: 100%;
    overflow: hidden;
    background-size:auto 100%;
    background-repeat: no-repeat;
    background-position: right;
    position: relative;
  }
  .login-form{
    width: 300px;
    right: 0;
    left: 0;
    margin: 10% auto 0 auto;
    position: absolute;
  }
  .login-form input{
    border: 0;
    width: 100%;
    border-bottom:2px solid black ;
    outline: none;
    text-align: center;
    margin: 2rem 0;
    background: transparent;
    font-size: 2rem;
    font-family: 华文楷体;
  }
  #login{
    width: 80%;
    background: #3fbbff;
    border: 0;
    border-radius: 2rem;
    margin-left: 10%;
    transition: 0.4s;
  }
  #login:hover{
    background: rgb(59, 176, 236);
    box-shadow: 0 15px 30px 0 rgba(0,0,0,.15);
  }
  .login-form .error::placeholder{
    color: red;
  }
  .text span{
    font-family: 华文楷体;
    font-size: 20px;
    transition: 0.3s;
    border-bottom: 1px solid transparent;
  }
  .text-left{
    float: left;
  }
  .text-right{
    float: right;
  }
  .text span:hover{
    border-bottom: 1px solid skyblue;
    color: darkorange;
    cursor: pointer;
  }
</style>
