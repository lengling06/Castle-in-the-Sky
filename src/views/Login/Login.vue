<template>
  <div class="root-container">
    <div class="left-logo">
      <div class="icon"></div>
      <div class="text">City of sky</div>
    </div>
    <div class="left-text">
      <h2>City of sky</h2>
      <p>全球航拍爱好者和专业摄影师的作品社区</p>
    </div>
    <div class="left-about">
      <p>
        Copyright @ 2022 青霜
      </p>
    </div>
    <div class="form-box" style="top: 0; margin-top: 80px;">
      <!-- 登录表单 -->
      <div id="login" style="text-align: center;" v-show="isShowLog">
        <h1>Login</h1>
        <form @submit.prevent="login">
          <input type="text" v-model.trim="$v.username.$model" v-on:blur="$v.username.$touch()" placeholder="用户名">
          <div v-if="$v.username.$dirty && !$v.username.required" class="error-text-container">
            <div class="error-text">用户名不能为空！</div>
          </div>

          <input type="password" v-model.trim="$v.password.$model" v-on:blur="$v.password.$touch()" placeholder="密码">
          <div v-if="$v.password.$dirty && !$v.password.required" class="error-text-container">
            <div class="error-text">密码不能为空！</div>
          </div>
          <button id="btnLogin">登录</button>
          <p>
            没有账号？
            <a href="#"  class="line" @click.prevent="switchToRegister">去注册</a>
          </p>
        </form>
      </div>

      <!-- 注册表单 -->
      <div id="register" style="text-align: center;" v-show="isShowReg">
        <h1>Register</h1>
        <form @submit.prevent="register">
          <input type="text" v-model.trim="$v.username.$model" v-on:blur="$v.username.$touch()" placeholder="用户名">
          <div v-if="$v.username.$error" class="error-text-container">
            <div class="error-text">用户名必须由2-6位的汉字、字母或数字组成！</div>
          </div>

          <input type="password" v-model.trim="$v.password.$model" v-on:blur="$v.password.$touch()" placeholder="密码">
          <div v-if="$v.password.$error" class="error-text-container">
            <div class="error-text">密码必须由6-12位的字母、数字和特殊字符组成！</div>
          </div>

          <input type="password" v-model.trim="$v.confirmPassword.$model" placeholder="确认密码">
          <div v-if="$v.confirmPassword.$error" class="error-text-container">
            <div class="error-text">密码不一致</div>
          </div>

          <button>注册</button>
          <p>
            已有账号？
            <a href="#" class="line" @click.prevent="switchToLogin">去登录</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

//localStorage.clear();

//获取所有用户对象
let array; // 存储用户
if (window.localStorage.userArr){
  // 判断是否存在用户数据,存在就转换为js对象 （ JSON.parse()）
  array = JSON.parse(window.localStorage.userArr);
}else{
  // 不存在就创建一个新数组
  array = [];
}

export default {
  name: "Login",
  mixins: [validationMixin],
  // 表单验证
  validations: {
    username: {
      required,
      minLength: minLength(2),
      valid: value => /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/.test(value)
    },
    password: {
      required,
      minLength: minLength(6),
      valid: value => /^[a-zA-Z0-9!@#$%^&*()]{6,12}$/.test(value)
    },
    confirmPassword: {
      required,
      sameAs: sameAs('password'),
    },
  },
  data() {
    return {
      isShowLog: true,
      isShowReg: false,
      username: '',
      password: '',
      confirmPassword: '',
    }
  },
  created() {
    // 控制底栏和导航栏的显示与隐藏
    this.$parent.showNavBar = false;
    this.$parent.showFooter = false;
  },
  methods: {
    // 切换登录或者注册页
    switchToRegister() {
      this.isShowLog = false;
      this.isShowReg = true;
      this.username = '';  // 清空用户名
      this.password = '';  // 清空密码
      this.confirmPassword = '';  // 清空确认密码
      this.$v.$reset();  // 重置表单验证状态
    },
    switchToLogin() {
      this.isShowLog = true;
      this.isShowReg = false;
      this.username = '';  // 清空用户名
      this.password = '';  // 清空密码
      this.confirmPassword = '';  // 清空确认密码
      this.$v.$reset();  // 重置表单验证状态
    },
    // 提交登录或注册
    register() {
      this.$v.$touch(); // 触发验证

      if (!this.$v.$invalid) {
        // 验证通过
        // 遍历数组，判断是否账号是否存在
        for (let i = 0; i < array.length; i++){
          if (this.username === array[i].username){
            this.$message({
              showClose: true,
              message: '用户已存在！',
              type: 'error'
            });
            return;
          }
        }
        // 创建对象
        let obj = {username: this.username, password: this.password};
        array.push(obj);
        // 将对象转换成字符串
        window.localStorage.userArr = JSON.stringify(array);
        this.$message({
          message: '注册成功！',
          type: 'success'
        });
        this.switchToLogin();
      } else {
        // 验证失败
        this.$message.error('请确保输入的符合要求！');
        this.$v.$reset(); // 重置表单验证状态
        return false;
      }
    },
    login() {
      this.$v.$touch(); // 触发验证
      if (this.username !== '' || this.password !== ''){
        // 用于标记当前循环到的对象的下标
        let state = -1;
        // 循环数组
        for (let i = 0; i < array.length; i++){
          // 如果循环到数组中的对象的名字等于用户输入的名字
          if (array[i].username === this.username){
            // 就把当前循环到的对象的下标给state
            state = i;
          }
        }
        // console.log(state);
        if (state < 0){
          this.$message({
            showClose: true,
            message: '账号不存在！',
            type: 'error'
          });
        }else{
          // 再根据state找到数组中的对象，判断用户输入的密码是否等于userArray[state].pwd
          if (array[state].password === this.password){
            this.$message({
              message: '登录成功！',
              type: 'success'
            });
            // 设置登录状态   键值对
            localStorage.setItem('isLogin', 'true');
            // 传递用户名到 store
            this.$store.dispatch("asyncUpdateUser", {name: this.username});
            // 页面传参
            this.$router.push({ name: 'Home', params: {name:this.username}});
          }else{
            this.$message({
              showClose: true,
              message: '用户名或密码错误！',
              type: 'error'
            });
            this.$v.$reset(); // 重置表单验证状态
          }
        }
      }
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.root-container {
  background:url(../../../static/images/春野尽披黄金甲.jpg) no-repeat;
  background-size: cover;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  /*position: relative;*/
  /* min-height: 100vh; */
}
.left-logo {
  display: flex;
  padding: 25px 0 0 40px;
  width: 130px;
  height: 60px;
  justify-content: space-evenly;
  align-items: center;
}
.left-logo .icon {
  background: url(../../../static/images/樱花.svg) no-repeat;
  width: 30px;
  height: 30px;
}
.left-logo .text {
  /* padding-right: 20px; */
  color: rgb(255, 255, 255);
  font-weight: 600;
}

.left-text {
  top: 256px;
  left: 8%;
  position: absolute;
}
.left-text h2 {
  font-size: 36px;
  color: #ffffff;
  font-weight: 600;
  line-height: 40px;
  /* margin: 0; */
}
.left-text p {
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  margin: 14px 0 0;
}
.left-about {
  position: absolute;
  top: 650px;
  left: 64px;
}
.left-about p {
  line-height: 18px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  margin: 0 0 4px;
}
.form-box {
  position: absolute;
  right: 8%;
  padding: 64px;
  width: 360px;
  /* height: 542px; */
  /* max-width: 488px; */
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 16px 32px 0 rgb(0 0 0 / 8%);
  margin: 0 auto;
}
h1 {
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 32px;
  text-align: center;
  /* 大写 */
  text-transform: uppercase;
  color: pink;
  /* 字间距 */
  letter-spacing: 5px;
}
input {
  background-color: transparent;
  width: 70%;
  color: #353030;
  /* 取消边框 */
  border: none;
  /* 下边框样式 */
  border-bottom: 1px solid rgba(138, 120, 120, 0.4);
  padding: 10px 0;
  /* 文本缩进 */
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}

/* 设置input的占位符颜色 */
input::placeholder {
  color: #adaaab;
}
/* 当input获得焦点时 */
input:focus {
  /* 文字颜色 */
  color: #353030;
  /* 隐藏边框 */
  outline: none;
  /* 设置下边框线 */
  border-bottom: 1px solid #FE4066;
  /* 线条过渡动画 */
  transition: 0.7s;
}
input:focus::placeholder {
  /* 透明度 */
  opacity: 0;
}
button {
  width: 70%;
  /*margin-top: 35px;*/
  background-color: #fe4066;
  outline: none;
  /* 圆角 */
  border-radius: 8px;
  padding: 13px;
  color: #ffedff;
  letter-spacing: 2px;
  border: none;
  /* 鼠标指针样式 */
  cursor: pointer;
}
button:hover {
  /* 不透明度 */
  opacity: 0.3;
  /* 设置过渡动画，ease属性：动画开始时缓慢，然后加快 */
  transition: 0.5s ease;
}
p {
  font-size: 12px;
  letter-spacing: 1px;
  color: #8c8889;
  line-height: 22px;
  /* 设置不能被选中 */
  user-select: none;
}
.line {
  text-decoration: none;
  color: #FE4066;
  display: inline-block;
  position: relative;
  margin: 16px 0 -16px;
}
/* 利用 ::before 伪元素实现文字下划线 */
/* ::before 伪元素可以在元素的内容前面插入新内容。 */
.line::before {
  /* 宽度设置为0，可以实现宽度从0到100%的变化 */
  width: 0;
  height: 1px;
  /* content 属性必填，否则没效果 */
  content: '';
  transition: 0.3s;
  position: absolute;
  bottom: 0;
  left: 50%;
  /* 	定义转换，只是用 X 轴的值。 */
  transform: translateX(-50%);
  background: #fe4066;
}
.line:hover::before {
  width: 100%;
}
.error-text-container {
  position: static;
  margin: 3px 0 3px 52px;
  height: 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.error-text {
  color: #fe4066;
  line-height: 16px;
  font-size: 12px;
}
</style>
