<template>
  <div>
    <audio :src="resourceAddr" controls style="width: 100%; margin: 100px 0">
      <source />
    </audio>
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
</style>
