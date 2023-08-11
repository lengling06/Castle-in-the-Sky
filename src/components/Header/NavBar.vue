<!-- 导航栏，作为每个页面的通用导航栏 -->
<template>
  <div class="shortcut">
    <div class="logo">
      <router-link v-bind:to="'/'">
        City of sky
      </router-link>
    </div>
    <div class="hotArea">
      <ul>
        <li v-for="(menu, index) in menuList" v-bind:key="index">
          <router-link v-bind:to="menu.path">
            {{ menu.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <!--    未登录时-->
    <div class="register" v-if="!($store.getters.getUser !== null)">
      <ul>
        <li>
          <router-link to="/login">登录</router-link>
        </li>
        <li>
          <router-link to="/login">注册</router-link>
        </li>
      </ul>
    </div>
    <!--    登录后-->
    <div class="user-info" v-else>
      <div class="user-icon">
        <el-avatar
          src="../../../static/images/2.png"
          :size="40"
        >
        </el-avatar>
      </div>
      <div class="user-name">{{ $store.getters.getUser }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "NavBar",
  data() {
    return {
      menuList: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '探索',
          path: '/404'
        },
        {
          name: '标签',
          path: '/tags'
        },
        {
          name: '摄影师',
          path: '/404'
        },
        {
          name: '热门活动',
          path: '/404'
        },
        {
          name: '关于',
          path: '/about'
        },
      ],
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

a, li {
  list-style: none;
  text-decoration: none;
  color: black;
}

.shortcut {
  /* 弹性布局 */
  display: flex;
  width: 100%;
  height: 60px;
  background-color: pink;
  /* 可以达到两边无缝隙，中间空白部分均分的效果 */
  justify-content: space-between;

  /* 居中 */
  align-items: center;

  /* 固定导航栏 */
  /* 新属性sticky */
  /*position: sticky;*/
  position: fixed;
  /* 距离页面顶部距离 */
  top: 0;
  /* 设置元素的堆叠顺序或者叫元素层级，值越大，元素的层级就越高 */
  z-index: 100;
}

.hotArea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 208px;
}

.hotArea ul {
  display: flex;
  vertical-align: middle;
}

.hotArea ul li {
  font-size: 16px;
  font-weight: 600;
  line-height: 60px;
  margin: 0 10px;
}

.logo {
  margin-left: 30px;
  line-height: 60px;
  font-weight: 600;
}

.register {
  margin-right: 30px;
  line-height: 60px;
  font-weight: 600;
}

.register ul li {
  display: inline-block;
  margin-left: 10px;
}

.hotArea ul li router-link:hover {
  color: #7b7b7b;
}

.register ul li router-link:hover {
  color: #7b7b7b;
}

.user-info {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  margin: 0 10px;
}
</style>
