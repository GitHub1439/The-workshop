<template>
  <div class="Approval-notice">
    <!-- tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="tab-item" label="资源上传审批" name="0">
        <div class="item"></div>
        <ResourceApproval />
      </el-tab-pane>
      <!-- <el-tab-pane label="参赛审批" name="1">
        <CompetitionApproval />
      </el-tab-pane> -->
      <el-tab-pane label="加入工作坊审批" name="2">
        <JoinApproval />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ResourceApproval from "@/components/Studio-management/Approval-notice/Resource-approval"; // 资源审批
import CompetitionApproval from "@/components/Studio-management/Approval-notice/Competition-approval"; // 参赛审批
import JoinApproval from "@/components/Studio-management/Approval-notice/Join-approval"; // 加入审批
export default {
  name: "Approval-notice",
  components: { ResourceApproval, CompetitionApproval, JoinApproval },
  data() {
    return {
      activeName: "0",
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      // var myIdElement = document.getElementById("tab-0"),
      //   beforeStyle = window.getComputedStyle(myIdElement, "::before");
      // beforeStyle.display = "none";
      // console.log(beforeStyle.display);
      // console.log(document.styleSheets[0].addRule("#tab-0::before"));
      document.styleSheets[0].addRule("#tab-0::before", "display: block"); // 支持IE
      document.styleSheets[0].insertRule("#tab-0::before { display: none }", 0); // 支持非IE的现代浏览器
    }, 100);
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>
<style lang="less">
.Approval-notice {
  padding-top: 32px;
  min-height: 657px;
  display: flex;
  flex-direction: column;
  // background-color: #f5f5f5;
  > .el-tabs {
    // tabs-top
    > .el-tabs__header {
      margin: 0;
      background-color: #fff;
      > .el-tabs__nav-wrap {
        &::after {
          height: 0;
        }
        > .el-tabs__nav-scroll {
          padding-left: 25px;
          height: 69px;
          line-height: 69px;
          > .el-tabs__nav {
            > .el-tabs__active-bar {
              background-color: #5688ff;
              border-radius: 1px;
            }
            > .el-tabs__item {
              font-size: 16px;
              color: rgba(42, 42, 42, 0.6);
            }
            > .el-tabs__item.is-active {
              font-weight: 600;
              color: #2a2a2a;
            }
          }
        }
      }
      #tab-0,
      #tab-1,
      #tab-2 {
        position: relative;
        &::before {
          display: none;
          content: "";
          position: absolute;
          right: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ee4f26;
        }
      }
    }
    // 内容
    > .el-tabs__content {
      padding: 0 10px;
      > .tab-item {
      }
    }
  }
}
</style>