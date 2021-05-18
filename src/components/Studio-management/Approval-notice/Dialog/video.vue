<template>

    <video
      controlslist="nodownload"
      controls="controls"
      object-fit="cover"
      style="width: 98%; height: 98%; margin: 10px auto"
      autoplay
      :src="resourceAddr"
    ></video>
  
</template>



<script>
export default {
  props: ["resourceAddr"],
  name: "Video",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>

</style>
