// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router"; // 导入router路由文件，自动扫描（index）里面的配置文件
//import AppFooter from "./components/AppFooter/AppFooter";
import Vuex from 'vuex';
import AuthPlugin from "./plugins/auth-plugin";
import store from './store';


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuex);
//Vue.use(AuthPlugin);
//Vue.component('app-footer', AppFooter); // 全局注册组件


// 路由跳转之前
router.beforeEach((to, from, next) => {
  // 获取登录状态
  let isLogin = localStorage.getItem('isLogin');
  // 点击退出登录时
  if (to.path === '/logout') {
    // 清空状态
    // localStorage.removeItem('isLogin');
    localStorage.clear();
    store.commit('clearUser');
    //跳转到登录页面
    next({path: '/'});
  } else if (to.path === '/login') {
    // 判断登录状态，不为空时，跳转到首页
    if (isLogin !== null) {
      next({path: '/'});
    }
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,   // 配置路由
  store,
  components: {App},
  template: '<App/>'
})
