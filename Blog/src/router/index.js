import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import headed from '@/components/headed'
import blogPage from '@/components/blogPage'
import algorithmPage from '@/components/algorithmPage'
import introducePage from '@/components/introducePage'
import notFound from '@/components/notFound'
import home from '@/components/home'

Vue.use(Router);

export default new Router({
  mode:'history',
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
        {path:'/introducePage',component:introducePage}
      ]
    },
    {
      path: '*',
      name: '404NotFound',
      component: notFound
    }
  ]
})
