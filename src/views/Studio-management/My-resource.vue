<template>
  <div class="My-resource">
    <ResourceComponents pageFlag="1" tag="none" />
  </div>
</template>
<script>
import ResourceComponents from "../../components/Studio-management/Resource-components";
export default {
  name: "My-resource",
  components: { ResourceComponents },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>
<style lang="less">
.My-resource {
  padding-top: 32px;
  display: flex;
  flex-direction: column;
}
</style>