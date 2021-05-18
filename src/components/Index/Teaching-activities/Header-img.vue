<template>
  <div class="Activity-box">
    <div
      class="BG-img"
      :style="{
        background: $store.getters.lwStudio
          ? `url(${require('../../../assets/images/BG/lw-01.png')}) repeat center bottom`
          : `url(${$store.getters.style.dressUpAddr}) repeat center bottom`,
      }"
    >
      <Header class="Header" />
      <div class="container">
        <div
          class="title"
          :style="
            $store.getters.lwStudio
              ? { color: '#942504' }
              : { color: $store.getters.style.color1 }
          "
        >
          <!-- {{ title }} -->
          {{ $store.getters.personalDetails.workspaceName }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../Header";
export default {
  name: "Activity-box",
  props: ["title"],
  components: { Header },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.Activity-box {
  position: relative;
  .Header {
    position: absolute;
    top: 0;
    left: 0;
  }
  > .BG-img {
    position: relative;
    top: 0;
    z-index: 8;
    height: 340px;
    width: 100%;
    > .container {
      position: relative;
      height: 100%;
      .title {
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translate(0%, -50%);
        font-size: 36px;
        font-weight: 700;
        color: #5a4b09;
        letter-spacing: 2px;
      }
    }
  }
}
</style>