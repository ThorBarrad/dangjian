import Vue from 'vue'
import VueRouter from 'vue-router'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Different_tag from '../views/Different_tag.vue'
import index from '../views/index.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"视频展示页面",
    component:index,
    redirect:"/login",
    children:[
      {
        path:"/login",
        name:"登录页",
        component:login,
        meta: {
          keepAlive: false 
        }
      },
      {
        path:"/PageOne",
        name:"首页",
        component:PageOne,
        meta: {
          keepAlive: false 
        }
      },
      {
        path:"/PageTwo/:post_id",
        name:"视频播放页",
        component:PageTwo,
        meta: {
          keepAlive: false 
        }
      },
      {
        path:"/tags/:item",
        name:"标签对应的视频",
        component:Different_tag,
        meta: {
          keepAlive: true 
        }
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


// 挂载路由导航守卫

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    
    if (noLogin) { // 没有登录则跳转/login页，进行登录 
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }else{
    next()
  }
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  //如果用户访问的是登录页，直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage获取保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  //如果没有token，强制跳转到登录页进行登录
  if (!tokenStr) return next('/login')
  next()
  
  //判断是否需要缓存
if(to.path === '/tags' && from.path === '/PageTwo'){
  to.meta.keepAlive = true;  // 让 列表页 缓存，即不刷新
  next();
}else {
  to.meta.keepAlive = false;  // 让 列表页 即不缓存，刷新
  next();
}
})


export default router
