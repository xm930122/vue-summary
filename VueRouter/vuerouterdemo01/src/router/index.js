import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Hello1 from '@/components/Hello1'
import Hello2 from '@/components/Hello2'
import Params from '@/components/Params'
import Error from '@/components/Error'

Vue.use(Router)   //Vue全局使用Router

export default new Router({
  // 路由模式设置：（history模式（不带#）和hash模式：（带#））
  mode:'history',
  routes: [
    {
      // 单页面多路由区域路由配置
      path: '/',
      name: 'HelloWorld',
      components:{
        default:HelloWorld,
        left:Hello1,
        right:Hello2
      }
    },
    {
      // 单页面多路由区域路由配置
      path: '/pang',
      name: 'HelloWorldPang',
      components:{
        default:HelloWorld,
        left:Hello2,
        right:Hello1
      }
    },
    {
      // 配置子路由+别名的使用（别名和redirect区别：别名对应path不一样，显示的组件一样，redirect：path和对应组件都是一样的）
      // redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。
      // alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了<router-view>中的内容。
      //  alias别名请不要用在path为’/’中，是不起作用的
      path: '/hi',
      component: Hi,
      alias:'/jspang',
      children:[
        { path: '/',name: 'Hello/Hi',component: Hi},
        { path: 'hi1',name: 'Hello/Hi/Hi1',component: Hi1},
        { path: 'hi2',name: 'Hello/Hi/Hi2',component: Hi2}
      ]
    },
    {
      // 利用url传递参数
      path:'/params/:newsId(\\d+)/:newsTitle',  //正则：\\d+  newsId只能是数字
      component:Params,
      // next 路由的控制参数，常用的有next(true)和next(false) next({path:'/'})。
      // 路由进入   可以写在路由配置页面，但是路由离开不可以写在路由配置页面
      // beforeEnter:(to, from, next) => {
      //   console.log('我进入了params模板');
      //   console.log(to);
      //   console.log(from);
      //   next();
      // }
    },
    {
      // redirect重定向
      path:'/goHome',
      redirect:'/'
    },
    {
      // 利用url传递参数+redirect重定向
      path:'/goParams/:newsId/:newsTitle',
      redirect:'/params/:newsId(\\d+)/:newsTitle',
    },
    {
      // 404页面的设置（path加*）
      path:'*',
      component:Error
    }

  ]
})