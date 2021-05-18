<template>
  <div class="Header">
    <div class="container">
      <el-row class="header-column">
        <el-col style="margin-left: -130px;" :xs="24" :sm="6" :md="6" :lg="3" :xl="3" @click.native="jump(1,'')"
          >首页</el-col
        >
        <el-col :xs="24" :sm="6" :md="6" :lg="3" :xl="3" @click.native="jump(2,'TheResearchResources')"
          >教研资源</el-col
        >
        <el-col :xs="24" :sm="6" :md="6" :lg="3" :xl="3" @click.native="jump(3,'Live-class')"
          >直播课堂</el-col
        >
        <el-col :xs="24" :sm="6" :md="6" :lg="3" :xl="3" @click.native="jump(4)"
          >工作坊</el-col
        >
        <el-col :xs="24" :sm="6" :md="6" :lg="3" :xl="3" @click.native="jump(5,'Resource-result')"
          >教研成果</el-col
        >
        <el-col :xs="24" :sm="6" :md="6" :lg="3" :xl="3" @click.native="jump(6,'Personal-Center')"
          >个人中心</el-col
        >
        <el-col class="search" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
          <el-input v-model="searchValue" placeholder="搜索相关内容"></el-input>
          <div class="search-btn">
            <span>搜索</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <iframe
      src="http://www.hnedu.cn/column/tb/index.shtml"
      width="100%"
      height="229px"
      scrolling="no"
      frameborder="0"
      style="display: block;"
    ></iframe> -->
  </div>
</template>
<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {
      searchValue: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    jump(flag,navName) {
      if (flag !== 4) {
        window.location.href =
        `http://study.hnedu123.cn/?navName=${navName}&token=${this.$store.getters.token}`
          // "http://study.hnedu123.cn/"
      }else{
        this.$router.push('/Home')
		this.$route.meta.tabs = this.$store.getters.tabsList[0].name;
		this.$store.commit("SET_TABS", this.$store.getters.tabsList[0].name);
      }
    },
  },
};
</script>
<style lang="less">
.Header {
  position: relative;
  z-index: 9;
  width: 100%;
  height: 59px;
  background: linear-gradient(
    180deg,
    rgba(52, 42, 4, 0.08),
    rgba(61, 51, 8, 0)
  );
  .header-column::-webkit-scrollbar {
    display: none;
  }
  .header-column {
    margin: 0 auto;
    position: relative;
    font-weight: 700;
    line-height: 59px;
    color: #161614;
    > .el-col {
      text-align: right;
      cursor: pointer;
    }
    > .search {
      max-height: 59px;
      float: right;
      position: relative;
      font-weight: normal;
      > .el-input {
        > .el-input__inner {
          border: none;
          background-color: rgba(255, 255, 255, 0.36);
        }
      }
      > .search-btn {
        cursor: pointer;
        padding-right: 16px;
        display: inline-block;
        position: absolute;
        z-index: 9;
        right: 0;
        font-size: 12px;
        color: #1d1d1d;
        > span {
          position: relative;
          &::before {
            content: "";
            position: absolute;
            top: -2px;
            left: -16px;
            width: 1px;
            height: 20px;
            background-color: #707070;
          }
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .container {
      width: 100%;
      overflow-x: scroll;
      .header-column {
        width: 500px;
      }
    }
  }
}
</style>