<template>
  <div class="No_data">
    <img :width="data.width" :height="data.height" :src="data.img" alt="" />
    <p v-for="item in data.titleList" :key="item">{{ item }}</p>
  </div>
</template>
<script>
export default {
  name: "No_data",
  props: {
    data: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.No_data {
  padding: 34px 0;
  background-color: #fff;
  > img {
    display: block;
    margin: 0 auto 14px auto;
  }
  > p {
    margin-bottom: 4px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    text-align: center;
    color: #a9b1b6;
  }
}
</style>