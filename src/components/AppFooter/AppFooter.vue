<template>
  <footer class="footer">
    <div class="about w">
        <span class="about-info">
          Copyright @ 2023
          <a class="website" href="https://lengling06.github.io">lengling06.github.io</a>
          青霜
        </span>
      <br>
      <br>
      <span class="time">北京时间 : {{ currentDate }}<span class="space">&nbsp;&nbsp;</span>{{ currentTime }}
      </span>
    </div>
  </footer>
</template>

<script>

export default {
  name: "AppFooter",
  data() {
    return {
      currentDate: '',
      currentTime: '',
    }
  },
  mounted() {
    setInterval(() => {
      let date =new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss = date.getSeconds();
      // 当时间小于10时,补0
      if (hh < 10){
        hh = '0' + hh;
      }
      if (mm < 10){
        mm = '0' + mm ;
      }
      if (ss < 10){
        ss = '0' + ss;
      }
      this.currentDate = year + '/' + (month + 1) + '/' + day;
      this.currentTime = hh + ':' + mm + ':' + ss;
    }, 1000);
  },
}
</script>

<style lang="scss" scoped>
.w {
  margin: 0 auto;
}
// 空格模板
.space::before {
  content: '\00a0';
}
.footer {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex: none;
  min-width: 1200px;
  height: 100px;
  background-color: pink;
}
.footer .about {
  text-align: center;
}
.about .about-info {
  font-size: 16px;
  color: #666;
}
.about-info .website {
  color: #999;
  margin: 0.3rem;
}
.about-info .website:hover {
  color: #ffffff;
}
.time {
  display: block;
  color: #666;
  white-space: pre-line;
}
</style>
