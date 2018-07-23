<template>
  <div class="activation">
    <div id="progress">
        <span :class="loadAn"></span>
    </div>
    <h1 class="content">{{content}}</h1>
    <div id="option" style="display: none">
        <router-link :to="skip" tag="div" id="btn">点击跳转</router-link>
    </div>
  </div>
</template>

<script>
    import ajax from "../../assets/js/ajax";
    export default {
        name: "activation",
        beforeCreate(){
          document.getElementById("title").innerText = "激活账号";
          this.type = this.$route.params.type;
          this.type = this.type==="register"?"activation":(this.type==="forgetPassword"?'updatePassword':'404');
          this.data = this.$route.query;
          if(this.type === '404'){
            this.$router.push({name:'notFound'})
          }else{
            ajax({
              url:/*window.location.origin+*/"http://localhost:1234/api/user/"+this.type,
              type:"POST",
              data:this.data,
              success:function (data){
                data = JSON.parse(data);
                this.loadAn = 'compile';
                if(data.error){
                  this.skip = (this.type==="forgetPassword"?'/forgetPassword':'/register');
                  this.timer = setInterval(()=>{
                    document.getElementById("progress").style.display = "none";
                    document.getElementById("option").style.display = "block";
                    if(this.time === -1){
                      this.$router.push({path:this.skip});
                    }else{
                      this.content = (this.type==="register"?"注册":"修改密码")+"失败 "+this.time+'s 后跳转'+(this.type==="register"?"注册":"忘记密码")+'页面';
                    }
                    this.time--;
                  },1000);
                }else{
                  this.timer = setInterval(()=>{
                    document.getElementById("progress").style.display = "none";
                    document.getElementById("option").style.display = "block";
                    if(this.time === -1){
                      this.$router.push({path:this.skip});
                    }else{
                      this.content = (this.type==="register"?"注册":"修改密码")+"成功 "+this.time+'s 后跳转登录页面';
                    }
                    this.time--;
                  },1000);
                }
              }.bind(this),
              fail:()=>{
                console.log('无法发送请求');
              }
            });
          }
        },
        mounted(){
            setTimeout(()=>{
              this.loadAn = 'loading';
            },0);
        },
        data(){
          return{
            type:this.$route.params.type,
            data:{},
            loadAn:'',
            content:'loading...',
            time:5,
            timer:null,
            skip:'/login'
          }
        },
      beforeDestroy(){
        clearInterval(this.timer);
      }
    }
</script>

<style scoped>
  h1{
    margin: 0;
    padding: 0;
  }
  .activation{
    width: 960px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 10% 0;
  }
  #progress{
    width: 80%;
    height: 30px;
    border:1px solid #ccc;
    border-radius: 15px;
    margin: 50px 0 50px 100px;
    overflow: hidden;
    box-shadow: 0 0 5px 0 #ddd inset;
  }
  .content{
    text-align: center;
  }
  #progress span {
    display: inline-block;
    width: 0;
    height: 100%;
    background: linear-gradient(45deg, #2989d8 33%,#7db9e8 34%,#7db9e8 59%,#2989d8 60%);
    background-size: 60px 30px;
    text-align: center;
    color:#fff;
    animation: move 0.6s linear infinite;
    transition: 1s ;
  }
  #progress .loading{
    width: 70%;
  }
  #progress .compile{
    width: 100%;

  }
  @keyframes move {
    from{
      background-position: 0 0;
    }to{
      background-position: 60px 0;
         }
  }
  #btn{
    cursor: pointer;
    width: 10rem;
    padding: 1rem;
    font-size: larger;
    text-align: center;
    left: 0;
    right: 0;
    margin: 2rem auto;
    animation: greenPulse 2s infinite;
    color:white;
    border-radius: 5px;
  }
  @keyframes greenPulse {
    from { background-color: deepskyblue; -webkit-box-shadow: 0 0 9px dodgerblue; }
    50% { background-color: skyblue; -webkit-box-shadow: 0 0 18px skyblue; }
    to { background-color: deepskyblue; -webkit-box-shadow: 0 0 9px dodgerblue; }
  }
  #option{
    text-align: center;
  }
</style>
