<template>
  <div class="main">
    <el-carousel :interval="3000" class="my-carousel w">
      <el-carousel-item v-for="(item,index) in images" :key="index" class="my-carousel-item">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

export default {
  name: "Carousel",
  data() {
    return {
      images: [
        "../../../static/images/Swiper/S1.png",
        "../../../static/images/Swiper/S2.png",
        "../../../static/images/Swiper/S3.png",
        "../../../static/images/Swiper/S4.png",
        "../../../static/images/Swiper/S5.png",
        "../../../static/images/Swiper/S6.png",
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
.main {
  margin: 100px 0 40px 0;
  display: flex;
}
/* >>> 强制使用样式 */
>>> .el-carousel__container {
  height: 380px;
}
.my-carousel, .my-carousel-item {
  border-radius:5px;
  width: 1200px;
  height: 380px;
}
img {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
