import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/user/homePage'
import headed from '@/components/user/headed'
import blogPage from '@/components/user/blogPage'
import algorithmPage from '@/components/user/algorithmPage'
import introducePage from '@/components/user/introducePage'
import notFound from '@/components/notFound'
import home from '@/components/home'
import login from '@/components/user/login'
import register from '@/components/user/register'
import forgetPassword from '@/components/user/forgetPassword'
import myArticle from '@/components/user/myArticle'

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
      name: 'homePage',
      component: headed,
      children:[
        {path:'/homePage',component:homePage},
        {name:'blogPage',path:'/blogPage',component:blogPage},
        {name:'algorithmPage',path:'/algorithmPage',component:algorithmPage},
        {name:'introducePage',path:'/introducePage',component:introducePage},
        {name:'login',path:'/login',component:login},
        {name:'register',path:'/register',component:register},
        {name:'forgetPassword',path:'/forgetPassword',component:forgetPassword},
        {name:'myArticle',path:'/myArticle',component:myArticle},
        {name:'notFound',path:'/*',component:notFound}
      ]
    }
  ]
})
