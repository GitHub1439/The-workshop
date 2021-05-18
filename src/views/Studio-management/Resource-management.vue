<template>
  <div class="Resource-management">
    <ResourceComponents pageFlag="0" />
  </div>
</template>
<script>
import ResourceComponents from "../../components/Studio-management/Resource-components";
export default {
  name: "Resource-management",
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
.Resource-management {
  padding-top: 32px;
  display: flex;
  flex-direction: column;
}
</style>