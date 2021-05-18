<template>
  <div id="App">
    <keep-alive :include="keepAlivePage">
      <transition :name="transitionName">
        <router-view
          ref="routerView"
          v-wechat-title="$route.meta.title"
        ></router-view>
      </transition>
    </keep-alive>
    <Footer class="Footer" />
  </div>
</template>

<script>
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Footer },
  computed: {
    keepAlivePage() {
      // console.log(this.$store.getters.keepAlive);
      return this.$store.getters.keepAlive;
    },
  },
  data() {
    return {
      transitionName: "",
    };
  },
  created() {},
  mounted() {
    var arr = [
      "Index",
      "Home",
      "Resources",
      "Personal-details",
      "Personal-home",
    ];
    this.$store.commit("SET_KEEP_ALIVE", arr);
  },
  methods: {},
  watch: {
    // 使用watch 监听$router的变化
    $route(to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
  },
};
</script>

<style lang="less">
@import "./style/base.less";
// #App::-webkit-scrollbar {
//   display: none; /* Chrome Safari */
// }
#App {
  position: relative;
  min-height: 100vh;
  padding-bottom: 193px;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
  .el-pagination {
    padding: 40px 0;
    text-align: center;
  }
  > .Footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  // animation: fadeInRight 0.3s;
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    // will-change: transform;
    transition: all 400ms;
    position: relative;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    // animation: fadeInRight 0.5s;
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    // animation: fadeOutRight 0.5s;
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    // animation: fadeOutRight 0.5s;
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    // animation: fadeInRight 0.5s;
  }
}
</style>
