<template>
    <div class="registerPage">
      <div class="register-form">
        <input id="username" type="text" placeholder="请输入电子邮箱" @keyup.enter="register">
        <input id="password" type="password" placeholder="请输入密码" @keyup.enter="register">
        <input id="Repassword" type="password" placeholder="请再次输入密码" @keyup.enter="register">
        <input id="register" type="submit" value="注册" @click="register">
      </div>
    </div>
</template>
<script>
    import ajax from "../../assets/js/ajax";
    import encryption from "../../assets/js/encryption";
    export default {
        name: "register",
      beforeCreate:function () {
        document.getElementById("title").innerText = "注册";
        if(this.$parent.login){
          this.$router.push({name:'homePage'});
        }
      },
      mounted:function () {
        document.getElementsByClassName("registerPage")[0].style.height = window.innerHeight - 100 + "px";
      },
      methods:{
          register:function () {
            let usernameReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            let passwordReg = new RegExp("^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{6,20}$");
            let user = document.getElementById("username");
            let pass = document.getElementById("password");
            let Repass = document.getElementById("Repassword");
            let username = user.value;
            let password = pass.value;
            let Repassword = Repass.value;
            if(username && password && Repassword){
              console.log(usernameReg.test(username),passwordReg.test(password))
                  if(!usernameReg.test(username)){
                    user.placeholder = "请输入正确邮箱";
                    Repass.placeholder = "请输入密码";
                    Repass.placeholder = "请再次输入密码";
                    user.className = "error";
                    pass.className = "";
                    Repass.className = "";
                    user.value = "";
                    pass.value = "";
                    Repass.value = "";
                  }else if(!passwordReg.test(password)){
                    user.placeholder = "请输入电子邮箱";
                    pass.placeholder = "请输入混合密码且长度在6-20";
                    Repass.placeholder = "请再次输入密码";
                    user.className = "";
                    pass.className = "error";
                    Repass.className = "";
                    pass.value = "";
                    Repass.value = "";
                  }else{
                    password = encryption(password);
                    ajax({
                      url:/*window.location.origin+*/"http://localhost:1234/api/user/register",
                      type:"POST",
                      data:{
                        username:username,
                        password:password
                      },
                      success:function (data){
                        data = JSON.parse(data);
                        if(data.error){
                          if(data.result === "注册失败，此邮箱已存在"){
                            user.value = "";
                            pass.value = "";
                            Repass.value = "";
                            user.placeholder = "请重新输入邮箱";
                            user.className = "error";
                            pass.className = "";
                            Repass.className = "";
                          }else{
                            this.$parent.Popup("注册失败","网络请求忙请稍后再试");
                          }
                        }else{
                          this.$parent.Popup("注册成功","注册成功请前往邮箱激活账号");
                        }
                      }.bind(this),
                      fail:()=>{
                        console.log('无法发送请求');
                      }
                    });
                  }
            }else if(!username){
              user.placeholder = "请输入电子邮箱";
              Repass.placeholder = "请输入密码";
              Repass.placeholder = "请再次输入密码";
              user.className = "error";
              pass.className = "";
              Repass.className = "";
              pass.value = "";
              Repass.value = "";
            }else if(!password){
              user.placeholder = "请输入电子邮箱";
              Repass.placeholder = "请输入密码";
              Repass.placeholder = "请再次输入密码";
              user.className = "";
              pass.className = "error";
              Repass.className = "";
              Repass.value = "";
            }else{
              user.placeholder = "请输入电子邮箱";
              Repass.placeholder = "请输入密码";
              Repass.placeholder = "请再次输入密码";
              Repass.className = "error";
              user.className = "";
              pass.className = "";
            }
          }
      }
    }
</script>

<style scoped>
  .registerPage{
    width: 100%;
    position: relative;
  }
  .register-form{
    width: 300px;
    right: 0;
    left: 0;
    margin: 10% auto 0 auto;
    position: absolute;
  }
  .register-form input{
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
  #register{
     width: 80%;
     background: #3fbbff;
     border: 0;
     border-radius: 2rem;
     margin-left: 10%;
     transition: 0.4s;
   }
  #register:hover{
    background: rgb(59, 176, 236);
    box-shadow: 0 15px 30px 0 rgba(0,0,0,.15);
  }
  .register-form .error::placeholder{
    color: red;
  }
</style>
