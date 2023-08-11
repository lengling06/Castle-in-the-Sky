<template>
  <div style="background-color: #f7f8f9">
<!--    导航栏-->
    <div class="tags-bar">
      <div class="tags-width">
        <ul>
          <li v-for="(item, index) in tabTitle" :key="index">
            <a href="#"
               :class="{ 'active': activeIndex === index }"
               @click="setActive(index)"
            >{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>
<!--    相册-->
    <div class="main">
      <div class="content w">
        <a href="#" class="album" v-for="(category, index) in displayItems" :key="index">
          <div class="album-box">
            <div class="album-box-con">
              <div class="left-img">
                <div class="show-img" :style="`background-image: url('../../../static/tagimages/${category.images[0]}');`">
                  <img :src="'../../../static/tagimages/' + category.images[0]" alt="" style="display: none;">
                </div>
              </div>
              <div class="right-img">
                <div class="right-img-box">
                  <div class="t-img r-i" :style="`background-image: url('../../../static/tagimages/${category.images[1]}');`">
                    <img :src="'../../../static/tagimages/' + category.images[1]" alt="" style="display: none;">
                  </div>
                </div>
                <div class="right-img-box">
                  <div class="b-img r-i" :style="`background-image: url('../../../static/tagimages/${category.images[2]}');`">
                    <img :src="'../../../static/tagimages/' + category.images[2]" alt="" style="display: none;">
                  </div>
                </div>
              </div>
            </div>
            <h3 class="a-title">{{ category.name }}</h3>
          </div>
        </a>
      </div>
    </div>

<!--    分页-->
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="totalPages"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Tags",
  props:['data'],
  data() {
    return {
      tabTitle:['题材', '风格', '设备', '地区'], // bar 数据
      activeIndex: 0, // 初始化为 0
      categories: [],  // 存放获取到的数据
      // 分页
      currentPage: 1, // 当前页
      pageSize: 12,  // 每页显示的个数
    };
  },
  mounted() {
    // 设置第一个 li 为选中状态
    this.setActive(0);
    // 获取数据
    this.loadCategories();
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    },
    // 加载数据
    loadCategories() {
      // 发送请求，获取数据
      axios.get("../../../static/data/categories.json")
        .then(response => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 当页数发生改变时触发
    handleCurrentChange(val) {
      // console.log(val)
      // val 可以获取当前页数
      this.currentPage = val;
    }
  },
  computed: {
    // 每页要显示的数据
    displayItems() {
      // 开始索引
      let startIndex = (this.currentPage - 1) * this.pageSize;
      // 结束索引
      let endIndex = startIndex + this.pageSize;
      // slice(开始索引，结束索引)：提取部分数据，返回一个包含此数据的新数组  (左闭右开)
      return this.categories.slice(startIndex,endIndex);
    },
    // 计算总页数
    totalPages(){
      // console.log(this.categories.length / this.pageSize)
      // Math.ceil(number);   有小数时，向上取整 ( 例：6.2 --> 7 )
      return Math.ceil(this.categories.length / this.pageSize);
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* 版心 */
.w {
  width: 1200px;
  margin: 0 auto;
}
a,li {
  list-style: none;
  text-decoration: none;
  color: black;
}
.tags-bar {
  margin-top: 60px;
  background-color: #fff;
  box-shadow: 0 1px 0 0 rgba(0,0,0,.05);
}
.tags-width {
  position: relative;
  height: 100%;
  width: 1200px;
  margin: 0 auto;
}
.tags-width ul {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
.tags-width ul li {
  height: 4rem;
  box-sizing: border-box;
  margin: 0 .75rem;
  font-weight: 600;
  font-size: .7rem;
  cursor: pointer;
  border-bottom: .15rem solid transparent;
  border-top: .15rem solid transparent;
}
.tags-width ul li a {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-decoration: none;
  font-size: 14px;
  color: #595959;
}
.tags-width ul li a:hover {
  color: #1088f2;
}
.active {
  color: black !important;
  border-bottom: .15rem solid #1088f2;
}
.main {
  width: 1200px;
  margin: 1rem auto;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.album {
  margin-bottom: .8rem;
}
.album-box {
  display: flex;
  justify-content: space-between;
  border-radius: .2rem;
  width: 19.5rem;
  height: 14rem;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 0.05rem 0.2rem 0 rgba(0,0,0,.1);
  box-sizing: border-box;
  padding: .8rem;
}
.album-box-con {
  flex: none;
  width: 100%;
  height: 10.4rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  border-radius: .2rem;
}
.left-img {
  background-color: #ddd;
}
.show-img {
  width: 10.4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition: opacity .3s ease;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.right-img {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 7.25rem;
}
.right-img-box {
  background-color: #ddd;
}
.t-img {
}
.b-img {
  flex-direction: column;
}
.r-i {
  width: 100%;
  height: 5.1rem;
  display: flex;
  opacity: 1;
  transition: opacity .3s ease;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.a-title {
  width: 100%;
  flex: none;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.6rem;
  color: rgba(0,0,0,.85);
  letter-spacing: 0;
  align-self: flex-start;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  word-wrap: break-word;
}
.pagination-container {
  display: flex;
  justify-content: center;
  padding: 25px 0;
}
</style>
