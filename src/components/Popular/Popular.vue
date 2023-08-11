<template>
  <div class="content">
    <div class="title w">
      <span>热门航拍点</span>
      <a class="hvideo" href="#">
        <span>热门航拍点集锦</span>
      </a>
    </div>
    <!-- 图片 -->
    <div class="hot-areas w">
      <a href="../../views/Tags" class="region" v-for="(item,index) in places" :key="index">
        <div class="d-img" :style="`background-image: url(${item.imgUrl})`">
          <img :src="item.imgUrl" alt="" class="htimg" />
        </div>
        <div class="d-text">{{ item.placeName }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popular",
  data() {
    return {
      places: [
        { placeName: '澳大利亚', imgUrl: '../../../static/images/Region/1.jpg'},
        { placeName: '美国', imgUrl: '../../../static/images/Region/2.jpg'},
        { placeName: '冰岛', imgUrl: '../../../static/images/Region/3.jpg'},
        { placeName: '西藏', imgUrl: '../../../static/images/Region/4.jpg'},
        { placeName: '上海', imgUrl: '../../../static/images/Region/5.jpg'},
        { placeName: '新疆', imgUrl: '../../../static/images/Region/6.jpg'},
      ]
    }
  }
}
</script>

<style scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.title {
  height: 50px;
  font-size: 1.8rem;
  color: rgba(0,0,0,.85);
  line-height: 1.6rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  /* 居中 */
  align-items: center;
}
.hvideo {
  text-decoration: none;
}
.hvideo span {
  font-size: .9rem;
  line-height: 1.2rem;
  /* 取消文字加粗 */
  font-weight: 400;
  color: #1890ff;
}
.hvideo span:hover {
  text-decoration: underline;
}
.hot-areas {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
.region {
  text-decoration: none;
}
.d-img {
  width: 180px;
  height: 120px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  border-radius:5px
}
.htimg {
  width: 100%;
  height: 100%;
  /* 0.3s 平滑过渡动画 */
  transition: transform 0.3s ease;
}
/* 移动到div上时，图片放大1.2倍，div不变化 */
.d-img:hover .htimg {
  transform: scale(1.2);
}
.d-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  word-wrap: break-word;
  color: rgba(0,0,0,.85);
  font-size: 16px;
  margin-top: .4rem;
  line-height: 1.2rem;
  font-weight: 400;
}
</style>
