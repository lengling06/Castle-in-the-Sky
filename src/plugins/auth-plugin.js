// 自定义插件，用于管理用户登录状态
const AuthPlugin = {
  install(Vue) {
    Vue.prototype.isLoggedIn = () => {
      // 通过设置的键来获取登录状态
      const isLoggedIn = localStorage.getItem('isLogin');
      return isLoggedIn === 'true';
    }
  }
}

export default AuthPlugin;
