<template>
  <div class="root">
    <div class="blur-overlay"></div> <!-- 添加背景模糊层 -->
    <div class="bd-cover">
      <div class="row">
        <div class="content">
          <div class="title">Sunny</div>
          <div class="txt">{{ txt }}</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="img"></div>
      <div class="main-content">
        <div class="name">青霜</div>
        <div class="main-txt">
          <i>不是每个人都应该像我这样去建造一座水晶大教堂，但是每个人都应该拥有自己的梦想，设计自己的梦想，追求自己的梦想，实现自己的梦想。梦想是生命的灵魂，是心灵的灯塔，是引导人走向成功的信仰。有了崇高的梦想，只要矢志不渝地追求，梦想就会成为现实，奋斗就会变成壮举，生命就会创造奇迹。——罗伯·舒乐</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "about",
  data() {
    return {
      txt: "",  // 古诗词
    }
  },
  mounted() {
    this.getPoetry();
  },
  methods: {
    // 获取古诗词
    getPoetry() {
      axios.get('https://v1.hitokoto.cn/?c=i&encode=text')
        .then((res) => {
          this.txt = res.data;
        })
        .catch((err) => {
          // 请求失败后，设置的文案
          this.txt = "无言独上西楼，月如钩。寂寞梧桐深院锁清秋。"
          console.log(err);
        })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.root {
  position: relative;
  width: 100%;
  height: 100vh;
  margin-bottom: 250px;
}
.blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../../static/images/background.jpg");
  background-size: cover;
  filter: blur(10px); /* 背景模糊效果，可根据需要调整模糊程度 */
  z-index: -1;
}
.bd-cover {
  width: 100%;
  height: 570px;
  display: flex;
  background-image: url("../../../static/images/0.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
  align-items: center;
  justify-content: center;
  z-index: 1; /* 确保内容位于背景模糊层之上 */
}
.row {
  width: 1125px;
  height: 118px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  color: white;
  font-size: 60px;
  text-align: center;
  line-height: 60px;
  margin-bottom: 20px;
  font-weight: 600;
}
.txt {
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 20px;
}
.main {
  width: 1200px;
  height: 400px;
  background-color: #ffffff;
  position: relative;
  top: 130px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  /*box-shadow: 0 15px 35px rgba(50, 50, 93, .1), 0 5px 15px rgba(0, 0, 0, .07) !important;*/
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3),
  0 8px 16px rgba(0, 0, 0, 0.2),
  0 16px 32px rgba(0, 0, 0, 0.1);
}
.img {
  background-image: url("../../../static/images/avatar.jpg");
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  /* 基于上一层父盒子进行偏移 */
  position: absolute;
  top: -10px;
  left: 50%;
  /*定位到父元素的中心点*/
  transform: translate(-50%, -50%);
}
.main-content {
  width: 800px;
  height: 00px;
  color: black;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  padding-top: 100px;
}
.name {
  /*color: #6BB392;*/
  color: pink;
  font-size: 60px;
  text-align: center;
  line-height: 60px;
  margin-bottom: 40px;
  font-weight: 600;
}
.main-txt {
  /*color: #6BB392;*/
  color: pink;
  font-size: 20px;
  text-align: center;
  line-height: 20px;
}
</style>
