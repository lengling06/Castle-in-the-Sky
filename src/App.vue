<template>
  <div id="app">
    <!-- 使用 router-link 跳转对应的页面 -->
    <nav-bar v-show="$route.meta.NavShow"></nav-bar>  <!-- 使用 自定义导航组件 -->

    <!-- 使用 router-view 显示页面 -->
    <router-view></router-view>

    <!-- 控制是否显示底栏和导航栏 -->
    <app-footer v-show="$route.meta.NavShow"></app-footer>
  </div>
</template>

<script>
import NavBar from "./components/Header/NavBar.vue"; // 引入自定义的导航栏组件
import AppFooter from "./components/AppFooter/AppFooter";
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      showNavBar: true,
      showFooter: true
    }
  },
  components: {
    NavBar, // 注册导航栏组件
    AppFooter, // 注册页脚
  },
  mounted() {
    // 刷新页面时会造成数据丢失，所以通过监听事件，调用saveState方法把数据存储到本地
    window.addEventListener('unload', this.saveState);
  },
  methods: {
    saveState() {
      // localStorage 是以字符串形式存储数据的，要存储复杂的数据类型，使用 JSON.stringify() 进行序列化
      localStorage.setItem('state', JSON.stringify(this.$store.state));
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
  min-height: 100vh;
}
</style>
