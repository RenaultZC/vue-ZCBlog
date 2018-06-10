<template>
  <div class="forgetPage">
    <div class="forget-form">
      <input id="username" type="text" placeholder="请输入电子邮箱" @keyup.enter="forget">
      <input id="password" type="password" placeholder="请输入新密码" @keyup.enter="forget">
      <input id="forget" type="submit" value="登录" @click="forget">
    </div>
  </div>
</template>

<script>
  import ajax from "../../assets/js/ajax";
  import encryption from "../../assets/js/encryption";
    export default {
        name: "forget-password",
      beforeCreate:function(){
        document.getElementById("title").innerText = "忘记密码";
      },
      mounted(){
        document.getElementsByClassName("forgetPage")[0].style.height = window.innerHeight - 100 + "px";
      },
      methods:{
        forget:function () {
          let usernameReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
          let passwordReg = new RegExp("^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{6,20}$");
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
            }else if(!passwordReg.test(password)){
              pass.value = "";
              pass.placeholder = "请输入正确密码";
              user.className = "";
              pass.className = "error";
              this.$parent.Popup('密码格式错误','请输入数字字母加字符混合密码,并且密码长度在6-16之间');
            }else{
                password = encryption(password);
                ajax({
                  url:/*window.location.origin+*/"http://localhost:1234/api/user/forgetPassword",
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
                      this.$parent.Popup('请求成功','请在邮箱中检查邮件然后重置密码');
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
  .forgetPage {
    width: 100%;
    overflow: hidden;
    background-size:auto 100%;
    background-repeat: no-repeat;
    background-position: right;
    position: relative;
  }
  .forget-form{
    width: 300px;
    right: 0;
    left: 0;
    margin: 10% auto 0 auto;
    position: absolute;
  }
  .forget-form input{
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
  #forget{
    width: 80%;
    background: #3fbbff;
    border: 0;
    border-radius: 2rem;
    margin-left: 10%;
    transition: 0.4s;
  }
  #forget:hover{
    background: rgb(59, 176, 236);
    box-shadow: 0 15px 30px 0 rgba(0,0,0,.15);
  }
  .forget-form .error::placeholder{
    color: red;
  }
</style>
