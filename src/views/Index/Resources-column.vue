<template>
  <div class="Resources-column">
    <div class="container">
      <div class="left">
        <div class="title">{{ $route.query.name }}</div>
        <el-tree
          :data="$store.getters.treeList"
          :props="{ label: 'name' }"
          accordion
          :highlight-current="true"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
      <div class="right">
        <Rcomm
          ref="Rcomm"
          :pageForm="pageForm"
          selectFlag="2"
          @getList="getList"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Rcomm from "../../components/Index/Resources-column-com";
export default {
  name: "Resources-column",
  components: { Rcomm },
  data() {
    return {
      pageForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        workspaceId: this.$store.getters.workspaceId,
        resourceInfoName: "", // 资源名称
        resourceTypeId: "", // 类型ID
        resourceFormatId: "", // 分类ID
        sort: "0", // 根据要求排序
        fId: "", // 栏目ID
        columnId: "", // 子栏目ID
      },
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$refs.Rcomm.pageForm.fId = this.$route.query.id;
    });
  },
  methods: {
    handleNodeClick(data) {
      if (data.children) {
        this.$refs.Rcomm.pageForm.fId = data.id;
        this.$refs.Rcomm.pageForm.columnId = "";
      } else {
        this.$refs.Rcomm.pageForm.columnId = data.id;
      }
      this.getList();
    },
    getList() {
      this.$api
        .getResourceInfoXiaoBen(this.$refs.Rcomm.pageForm)
        .then((res) => {
          this.$refs.Rcomm.pageForm.total = res.data.data.total;
          this.$refs.Rcomm.resourcesList = res.data.data.rows;
          if (this.$refs.Rcomm.resourcesList.length == 0) {
            this.$refs.Rcomm.none = true;
          } else {
            this.$refs.Rcomm.none = false;
          }
        });
    },
  },
  filters: {},
  watch: {
    $route(to, from) {
      this.$refs.Rcomm.pageForm.fId = this.$route.query.id;
    },
    "pageForm.resourceInfoName"(val) {
      this.getList();
    },
  },
};
</script>
<style lang="less">
.Resources-column {
  padding: 32px 0;
  min-height: 100vh;
  > .container {
    width: 100%;
    background-color: #fff;
    > div {
      float: left;
    }
    > .left {
      > .title {
        padding: 24px 0 20px 24px;
      }
      width: 20%;
      min-height: 100vh;
      .el-tree > .el-tree-node {
        min-width: 100%;
        display: inline-block;
      }
    }
    > .right {
      width: 80%;
    }
  }
}
</style>