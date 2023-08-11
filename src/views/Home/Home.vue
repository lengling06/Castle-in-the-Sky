<template>
  <div class="main">
    <carousel></carousel>
    <popular></popular>
    <video-page></video-page> <!-- 视频渲染组件 -->
  </div>
</template>

<script>
console.log("%c Hello World %c By 青霜 %c", "background:#e9546b ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff; padding:5px 0;", "background:#ec8c69 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #000; padding:5px 0;", "background:transparent")

import Carousel from "../../components/Carousel/Carousel";
import VideoPage from "../../components/Videos/VideoPage";  // 引入自定义的视频渲染组件
import Popular from "../../components/Popular/Popular";

export default {
  name: "Home",
  components: {
    Carousel, // 轮播图
    Popular, // 热门航拍点
    VideoPage, // 注册视频渲染组件
  }
}
</script>

<style scoped>

</style>
