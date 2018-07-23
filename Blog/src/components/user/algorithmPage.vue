<template>
  <div style="text-align: center">
    <canvas id="canvas"></canvas>
    <div class="algorithm" v-cloak>
      <div class="algorithm-item" v-for="item in algorithm" >
        <router-link :to="{path:'/myArticle',query: {ID:item.ID}}" tag="div">
          <p class="item-title">
            {{item.title}}
          </p>
          <p :title="item.content+'...'" class="item-content">
            {{item.content+'...'}}
          </p>
          <div class="item-info">
            <span class="fa fa-user-circle">&nbsp;{{item.author}}</span>
            <span class="fa fa-calendar">&nbsp;{{item.date}}</span>
            <span class="fa fa-eye">&nbsp;{{item.view}}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
    import ajax from '../../assets/js/ajax';
    import mineSweeping from '../../assets/js/mineSweeping';
    export default {
        name: "algorithm-page",
        beforeCreate:function(){
          document.getElementById("title").innerText = "算法";
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
              if(data.error){
                console.log(data.error);
              }else{
                let arr = [];
                data.result.forEach((item)=>{
                  if(item.type === 0){
                    if(item.logo)
                      item.logo = window.URL.createObjectURL(new Blob([new Buffer(item.logo.data).buffer],{type:'image/jpeg'}));
                    item.date = item.date.slice(0,10);
                    this.algorithm.push(item);
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
          let canvas = document.getElementById("canvas");
          let mineSweep = new mineSweeping(canvas);
          mineSweep.init(360,360);
          canvas.addEventListener('mousedown',()=>{
            mineSweep.click();
          });
          canvas.addEventListener('mousemove',(event)=>{
            mineSweep.move(event.offsetX,event.offsetY);
          });
        },
        data(){
          return{
            algorithm:[]
          }
        },
        methods:{
        }
    }
</script>

<style scoped>
  .algorithm{
    width: 720px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .algorithm-item {
    cursor: pointer;
    padding: 1rem;
    border-bottom:1px dashed #c6cfd2;
  }
  .algorithm-item:first-child{
    border-top: 1px solid #c6cfd2;
    margin-top: 1rem;
  }
  .algorithm-item:hover{
    background: rgba(0,0,0,.01);
  }
  .item-title{
    font-weight: bold;
    font-size: 1.5rem;
  }
  .item-content{
    white-space: nowrap;
    color: #999;
    line-height: 24px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-info span{
    margin: 0 1rem;
  }
  #canvas{
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 16px;
  }
  [v-cloak]{
    display: none;
  }
</style>
