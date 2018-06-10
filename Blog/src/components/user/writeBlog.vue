<template>
  <div class="writeBlog">
    <input class="title" placeholder="请输入文章标题">
    <div id="editor">
      <mavon-editor style="height: 100%" :toolbars="toolbars" :boxShadow="false" v-model="editorValue"> </mavon-editor>
    </div>
    <div class="foot"><span class="btnPublish" title="发布博客" @click="sendBlog">发布博客</span></div>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
    export default {
        name: "write-blog",
        beforeCreate(){
          this.$nextTick(()=>{
            if(!this.$parent.login&&!localStorage.code){
              this.$router.push({path:'/login'});
            }
          });
        },
        data(){
          return{
            toolbars:{
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              underline: true, // 下划线
              strikethrough: true, // 中划线
              mark: true, // 标记
              superscript: true, // 上角标
              subscript: true, // 下角标
              quote: true, // 引用
              ol: true, // 有序列表
              ul: true, // 无序列表
              link: true, // 链接
              imagelink: true, // 图片链接
              code: true, // code
              table: true, // 表格
              fullscreen: true, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              htmlcode: true, // 展示html源码
              help: true, // 帮助
              /* 1.3.5 */
              undo: true, // 上一步
              redo: true, // 下一步
              trash: true, // 清空
              save: false, // 保存（触发events中的save事件）
              /* 1.4.2 */
              navigation: true, // 导航目录
              /* 2.1.8 */
              alignleft: true, // 左对齐
              aligncenter: true, // 居中
              alignright: true, // 右对齐
              /* 2.2.1 */
              subfield: true, // 单双栏模式
              preview: true, // 预览
            },
            editorValue:'## asdasdasd\n' +
            '![8.jpg](0)'
          }
        }
        ,
        mounted(){
          document.getElementsByClassName("writeBlog")[0].style.height = (window.innerHeight - 100 )+ "px";
        },
        methods:{
          sendBlog:function (){
            console.log(this.editorValue);
          }
        }
        ,
        components: {
          'mavon-editor': mavonEditor
        }
    }
</script>

<style scoped>
  .writeBlog {
    margin: auto;
    width: 80%;
    min-width: 720px;
  }
  #editor{
    height: 80%;
    width: 100%;
  }
  .title{
    font-size: inherit;
    outline: none;
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 16px;
    border: none;
    background-color: #efefef;
    color: #4f4f4f;
    margin-bottom: 24px;
  }
  .writeBlog .foot{
    overflow: hidden;
  }
  .writeBlog .btnPublish{
    font-size: 20px;
    float: right;
    padding: 10px;
    border: 1px solid skyblue;
    color: white;
    background-color: skyblue;
    border-radius: 10px;
    margin-top: 1rem;
    transition: .5s;
  }
  .writeBlog .btnPublish:hover{
    cursor: pointer;
    color: skyblue;
    background-color: transparent;
  }
</style>
