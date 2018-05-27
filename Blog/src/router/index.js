import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import headed from '@/components/headed'
import blogPage from '@/components/blogPage'
import algorithmPage from '@/components/algorithmPage'
import introducePage from '@/components/introducePage'
import notFound from '@/components/notFound'
import home from '@/components/home'
import login from '@/components/login'
import register from '@/components/register'
import forgetPassword from '@/components/forgetPassword'

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
        {path:'/blogPage',component:blogPage},
        {path:'/algorithmPage',component:algorithmPage},
        {path:'/introducePage',component:introducePage},
        {path:'/login',component:login},
        {path:'/register',component:register},
        {path:'/forgetPassword',component:forgetPassword},
        {path:'/*',component:notFound}
      ]
    }
  ]
})
