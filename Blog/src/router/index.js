import Vue from 'vue'
import Router from 'vue-router'
import notFound from '@/components/notFound'
import home from '@/components/home'
import headed from '@/components/headed'
import homePage from '@/components/user/homePage'
import userCenter from '@/components/user/userCenter'
import blogPage from '@/components/user/blogPage'
import algorithmPage from '@/components/user/algorithmPage'
import introducePage from '@/components/user/introducePage'
import login from '@/components/user/login'
import register from '@/components/user/register'
import forgetPassword from '@/components/user/forgetPassword'
import myArticle from '@/components/user/myArticle'
import writeBlog from '@/components/user/writeBlog'

Vue.use(Router);

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/homePage',
      component: headed,
      children:[
        {name: 'homePage',path:'/homePage',component:homePage},
        {name:'blogPage',path:'/blogPage',component:blogPage},
        {name:'algorithmPage',path:'/algorithmPage',component:algorithmPage},
        {name:'introducePage',path:'/introducePage',component:introducePage},
        {name:'login',path:'/login',component:login},
        {name:'register',path:'/register',component:register},
        {name:'forgetPassword',path:'/forgetPassword',component:forgetPassword},
        {name:'myArticle',path:'/myArticle',component:myArticle},
        {name:'writeBlog',path:'/writeBlog',component:writeBlog},
        {name:'userCenter',path:'/userCenter',component:userCenter},
      ]
    },
    {
      name:'notFound',
      path:'/*',
      component:notFound
    }
  ],
})
