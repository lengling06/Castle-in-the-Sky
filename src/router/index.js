import Vue from 'vue';
import Router from "vue-router";

import HomeView from '../views/Home/Home';
import Login from '../views/Login/Login';
import Tags from '../views/Tags/Tags';
import index from '../views/404';
import About from "../views/About/about";

// 安装路由
Vue.use(Router);

const router = new Router({
  mode: 'history', // 取消url中的 # 号
  routes: [
    {
      //路由路径
      path: '/',
      // 路由名称
      name: 'Home',
      // 要跳转的组件
      component: HomeView,
      meta: {
        // 是否显示底栏和导航栏
        NavShow: true
      }
    },
    {
      //路由路径
      path: '/login',
      // 路由名称
      name: 'Login',
      // 要跳转的组件
      component: Login,
      meta: {
        NavShow: false
      },
    },
    {
      //路由路径
      path: '/tags',
      // 路由名称
      name: 'Tags',
      // 要跳转的组件
      component: Tags,
      meta: {
        NavShow: true
      }
    },
    {
      //路由路径
      path: '/404',
      // 路由名称
      name: '404',
      // 要跳转的组件
      component: index,
      meta: {
        NavShow: false
      }
    },
    {
      //路由路径
      path: '/about',
      // 路由名称
      name: 'About',
      // 要跳转的组件
      component: About,
      meta: {
        NavShow: true
      }
    },
  ],
});

// 导航守卫

// 配置导出路由
export default router;
