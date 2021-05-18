<template>
  <div class="img-box">
    <img width="100%" :src="resourceAddr" alt="图片加载失败" />
  </div>
</template>
<script>
export default {
  props: ["resourceAddr"],
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
	.img-box{
		height: 508px;
		width: 100%;
		img{
			height: 508px;
			width: 100%;
		}
	}
</style>
