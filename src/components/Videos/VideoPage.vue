<template>
  <div class="selected">
    <div class="wblankbar">
      <div class="blankbar w">
        <span style="display: inline-block">精选</span>
      </div>
    </div>
    <!-- 动态渲染视频 -->
    <div class="selection-area">
      <!-- 每一个分类  -->
      <div class="selected-content w" v-for="item in categories">
        <!-- 标题 -->
        <div class="works">
          <div class="works-type">
            <div class="title-left" >{{item.name}}</div>
            <div class="title-right">
              <a href="#">
                <span>更多&nbsp;</span>
              </a>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <div class="works-list w">
          <div class="shootingworks" v-for="video in item.videos" :key="video.title">
            <!--   显示的图片     -->
            <a class="works-link" @click="showImageLayer(video.url, video.title)">
              <div class="works-img" :style="`background-image: url(${video.url})`">
                <img :src="video.url" :alt="video.title" style="display: none">
                <!-- 视频播放图标 -->
<!--                <div class='play'></div>-->
              </div>
            </a>
            <!-- 作品信息  -->
            <div class="img-info">
              <div class="img-title">
                <a href="#" class="address" >{{video.title}}</a>
                <!-- 设备 -->
                <div class="equipment">
                  <span>设备：</span>
                  <a href="#" class="tool">{{video.device}}</a>
                </div>
                <!-- 点赞和观看 -->
                <div class="view-info">
                  <!-- 观看 -->
                  <div class="view">
                    <div class="watch-icon">
                      <svg viewBox="0 0 48 48">
                        <path d="M24.585 10.012C33.08 10.287 40.552 14.95 47 24c-6.562 9.36-14.229 14.027-23 14-8.771.027-16.438-4.64-23-14 6.448-9.05 13.92-13.713 22.415-13.988a14.244 14.244 0 0 1 1.17 0zM24 34c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm0-3a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" fill="#838385" fill-rule="evenodd"></path>
                      </svg>
                    </div>
                    {{ video.views }}
                  </div>
                  <!-- 点赞 -->
                  <a href="#" class="dz" @click.prevent="toggleLike(video)">
                    <div class="fabulous">
                      <div class="fabulous-icon">
                        <svg viewBox="0 0 40 40">
                          <path :fill="video.liked ? '#87b9ff' : 'currentColor'" d="M28.387 13.375h1.446c2.781.115 5 2.403 5 5.208a5.194 5.194 0 0 1-1.701 3.85l-.515 10.398a2.5 2.5 0 0 1-2.497 2.376H6.666a2.5 2.5 0 0 1-2.5-2.5V15.874a2.5 2.5 0 0 1 2.5-2.5h5.344c2.752-.787 4.168-2.653 4.247-5.599a4.958 4.958 0 1 1 9.908-.276l-.001.11c.006.513-.014 1.034-.054 1.562a24.287 24.287 0 0 1-.714 4.203h2.989z"></path>
                          <path fill="none" :stroke="video.liked ? '#3d85ec' : 'currentColor'" stroke-width="2.5" d="M29.833 14.625h-6.047l.401-1.561c.355-1.381.58-2.71.678-3.987a17 17 0 0 0 .051-1.494l.001-.083a3.708 3.708 0 1 0-7.41.207l.001.102c-.094 3.486-1.871 5.829-5.153 6.767l-.168.048H6.668c-.69 0-1.25.56-1.25 1.25v16.833c0 .69.56 1.25 1.25 1.25h23.454a1.25 1.25 0 0 0 1.248-1.188l.54-10.913.381-.347a3.944 3.944 0 0 0 1.293-2.927c0-2.126-1.681-3.872-3.75-3.958z"></path>
                          <path :fill="video.liked ? '#5d99ec' : 'currentColor'" d="M6.671 15.89h7.079v16.825H6.671z"></path>
                          <path :fill="video.liked ? '#3d85ec' : 'currentColor'" d="M11.25 14.375h2.5v20.833h-2.5V14.375z"></path>
                        </svg>
                      </div>
                    </div>
                    {{ video.like }}
                  </a>
                </div>
              </div>
              <hr />
              <!-- 用户 -->
              <div class="user">
                <div class="user-info">
                  <a href="#" class="user-link">
                    <div class="user-img">
                      <div class="user-icon" style="background-image: url('../../../static/images/user.png')">
                        <img src="../../../static/images/user.png" alt="" style="display: none"/>
                      </div>
                    </div>
                    <div class="username">青霜</div>
                  </a>
                  <div class="time">
                    <span>2022年12月16日</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    用于显示图片-->
    <el-dialog :visible="isImageLayerVisible" @close="closeImageLayer" :show-close="true" :size="'tiny'">
      <div class="image-layer">
        <div class="image-title">{{ currentImageAlt }}</div>
        <img :src="currentImageSrc" :alt="currentImageAlt" class="center-image">
      </div>
    </el-dialog>
  </div>
</template>

<script>

// 抽取出图片路径
const imagePaths = {
  nature: '../../../static/images/Nature/',
  city: '../../../static/images/City/',
  sports: '../../../static/images/Sports/',
  people: '../../../static/images/People/'
};

// 定义在export外部，作为组件的局部函数
// 抽象出一个函数来生成视频对象
const createVideo = (title, category, imageIndex, device, views, like) => {
  const url = `${imagePaths[category.toLowerCase()]}${imageIndex}.jpg`;
  return {title, url, device, views, like, liked: false};   // liked 表示是否被点赞
};

export default {
  name: "VideoPage.vue",
  data() {
    return {
      videoLoaded: false,
      // 视频数据
      categories: [
        {
          name: '自然',
          videos: [
            createVideo('沙漠光影', 'nature', 1, 'DJI Mavic 3', 200, 10),
            createVideo('银河流星雨', 'nature', 2, 'DJI Mini 3 Pro', 76, 3),
            createVideo('赛里木湖的天鹅', 'nature', 3, 'DJI Mini 3 Pro', 66, 2),
            createVideo('钻石星辰', 'nature', 4, 'DJI Mini 3 Pro', 38, 2),
          ]
        },
        {
          name: '城市',
          videos: [
            createVideo('A Miniature Village', 'city', 1, 'DJI Mavic 3 Pro', 166, 7),
            createVideo('上海夜景平流雾', 'city', 2, 'DJI Mavic 3', 74, 4),
            createVideo('Island', 'city', 3, 'Mavic 2 Pro', 232, 14),
            createVideo('Cross-over', 'city', 4, 'DJI Mini 3 Pro', 234, 14),
          ]
        },
        {
          name: '运动',
          videos: [
            createVideo('Beach', 'sports', 1, 'DJI Mavic 3', 60, 2),
            createVideo('顶峰相见', 'sports', 2, 'DJI Mavic 3 Pro', 51, 2),
            createVideo('Mates Rates', 'sports', 3, 'Mavic 2 Pro', 540, 23),
            createVideo('Skypixel', 'sports', 4, 'Mavic 2 Pro', 248, 13),
          ]
        },
        {
          name: '人物',
          videos: [
            createVideo('Relax', 'people', 1, 'Mavic 2 Pro', 36, 10),
            createVideo('2 kayakers in dark waters', 'people', 2, 'DJI Mini 3 Pro', 119, 12),
            createVideo('Fam stuck', 'people', 3, 'Mavic 2 Pr', 538, 44),
            createVideo('Fjord Seats', 'people', 4, 'DJI Mini 3 Pro', 714, 35),
          ]
        }
      ],
      // 控制图层显示和隐藏的状态
      isImageLayerVisible: false,
      currentImageSrc: '',
      currentImageAlt: '',
    }
  },
  methods: {
    // 点赞
    toggleLike(video) {
      if (!video.liked){
        video.like += 1;
      }else{
        video.like -= 1;
      }
      video.liked = !video.liked;
    },
    // 显示图层
    showImageLayer(src, alt) {
      this.currentImageSrc = src;
      this.currentImageAlt = alt;
      this.isImageLayerVisible = true;
    },
    // 关闭图层
    closeImageLayer() {
      this.isImageLayerVisible = false;
      this.currentImageSrc = '';
      this.currentImageAlt = '';
    },
  },
}
</script>

<style lang="scss" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
a, li {
  list-style: none;
  text-decoration: none;
  color: black;
}
.selection-area {
  display: block;
  background-color: #f7f8f9;
  height: auto;
}
.selected {
  padding-top: 72px;
}
.selected .wblankbar {
  width: 100%;
  height: 60px;
  /* 盒子阴影 */
  box-shadow: 0 1px 0 0 rgba(0,0,0, 0 / 5%);
}
.blankbar {
  width: 1200px;
  height: 60px;
}
.wblankbar .blankbar {
  text-align: center;
}
.wblankbar .blankbar span {
  line-height: 60px;
  border-bottom: .15rem solid #1088f2;
  font-weight: 600;
}
.selected-content .works,.works-type,.title-left,.title-right {
  display: flex;
}
.works {
  padding-top: 2rem;
}
.works .works-type {
  width: 90rem;
  justify-content: space-between;
}
.works-type {
  height: 27px;
  /* 居中 */
  align-items: center;
}
.title-left {
  font-size: 19px;
}
.title-right span {
  font-size: .9rem;
  line-height: 1.2rem;
  /* 取消文字加粗 */
  font-weight: 400;
  color: #1890ff;
}
.title-right span:hover {
  text-decoration: underline;
}
.works-list {
  /* float: left; */
  height: 100%;
  min-height: 1px;
  display: flex;
  padding-top: 30px;
  justify-content: space-between;
  /* justify-content: space-evenly; */
}
.works-list .shootingworks {
  display: flex;
  margin: 0.5rem;
  justify-content: center;
  color: #333;
  align-items: center;
  width: 14.25rem;
  height: 16rem;
  flex-direction: column;
  border-radius: .2rem;
  background-color: #fff;
  overflow: hidden;
}
.shootingworks .works-link {
  position: relative;
  width: 100%;
  height: 9.5rem;
  background-color: #ddd;
  display: flex;
  cursor: pointer;
}
.works-img {
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity .3s ease;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.works-img:hover .play {
  background: url(../../../static/images/播放.svg);
}
.play {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.img-info {
  width: 100%;
  height: 6.5rem;
  padding: .5rem .65rem;
  box-sizing: border-box;
}
.img-info .img-title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 3.25rem;
}
.img-title .address {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  word-wrap: break-word;
  font-size: .7rem;
  font-weight: 600;
  line-height: 1.05rem;
  color: #000;
  cursor: pointer;
}
.img-title .equipment {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: .6rem;
  color: #999;
  margin: .2rem 0;
  height: .9rem;
  line-height: .9rem;
}
.equipment span {
  flex: none;
  margin-right: .2rem;
}
.equipment .tool {
  color: #1088f2;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  word-wrap: break-word;
}
.img-title .view-info {
  font-size: .6rem;
  display: flex;
  /* align-items: flex-end; */
}
.view-info .view {
  display: flex;
  margin-right: 1rem;
  color: #999;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
.view .watch-icon {
  width: .8rem;
  height: .8rem;
  flex: none;
  margin-right: .25rem;
  font-size: 0;
}
.watch-icon svg {
  overflow: visible;
  width: 100%;
}
.view-info .dz {
  display: flex;
  margin-right: 1rem;
  color: #999;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}
.dz .fabulous {
  width: .8rem;
  height: .8rem;
  flex: none;
  margin-right: .25rem;
  font-size: 0;
}
.fabulous .fabulous-icon svg {
  overflow: visible;
  width: 100%;
}
hr {
  margin: .5rem 0;
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #eee;
  padding: 0;
}
.img-info .user {
  height: 1.2rem;
}
.user .user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .6rem;
}
.user-info .user-link {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  overflow: hidden;
  justify-content: center;
  color: #333;
}
.user-link .user-img {
  flex: none;
  margin-right: .25rem;
  background-size: contain;
  background: url('../../../static/images/user.png') no-repeat 50%;
  width: 1.2rem;
  height: 1.2rem;
  transition: background .3s ease;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
}
.user-img .user-icon {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  transition: opacity .3s ease;
  opacity: 1;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.user-link .username {
  flex: 1 1 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  word-wrap: break-word;
  padding-right: .2rem;
  line-height: 1.2rem;
  box-sizing: border-box;
}
.user-link .time {
  flex: none;
  color: #999;
}
.img-title .address:hover {
  color: #1088f2;
}
.img-title .tool:hover {
  text-decoration: underline;
}
.user-link .username:hover {
  color: #1088f2;
}
.el-dialog__wrapper .image-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.center-image {
  display: block;
  max-width: 100%;
  max-height: 400px; /* 设置图片的最大高度 */
  margin: 0 auto;
}
.image-title {
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 20px;
  text-align: center;
}
</style>
