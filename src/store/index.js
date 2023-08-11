import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 全局State对象，用于保存所有组件的公共数据  (可以理解为数据库)
// 判读之前是否有值，如果有就取值    使用 JSON.parse() 进行反序列化
const state = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {
  user: {
    name:''
  }
};

// 监听state对象的值的最新状态（计算属性）
const getters = {
  getUser(state) {
    return state.user.name;
  },
};

// 唯一可以修改state值的方法（同步执行）
const mutations = {
  // 添加用户
  updateUser(state, user) {
    state.user = user;
  },
  // 清除用户
  clearUser(state) {
    state.user.name = null;
  },
};

// 异步执行 mutations 方法
const actions = {
  asyncUpdateUser(context, user) {
    context.commit("updateUser", user);
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
