<template>
  <div class="Personal-details">
    <div
      class="bg-img"
      :style="{
        background: `url(${require($store.getters.lwStudio
          ? '../assets/images/BG/lw-03.png'
          : '../assets/images/BG/bg-03.png')}) repeat center top`,
      }"
    ></div>
    <div class="header-box">
      <div class="head-portrait">
        <img :src="memberDetails.avatar" alt="" />
      </div>
      <div class="name">{{ memberDetails.memberName }}</div>
      <div class="type">{{ memberDetails.memberPosition }}</div>
      <div class="tabs">
        <div class="container">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="TA的主页" name="Personal-home"></el-tab-pane>
            <el-tab-pane
              label="TA的资源"
              name="Personal-resource"
            ></el-tab-pane>
            <el-tab-pane label="TA的资料" name="Personal-data"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <router-view
      :style="{
        position: 'relative',
        zIndex: 9,
      }"
      ref="routerView"
      :memberDetails="memberDetails"
    />
  </div>
</template>
<script>
export default {
  name: "Personal-details",
  components: {},
  data() {
    return {
      activeName: "Personal-home",
      memberDetails: {},
    };
  },
  created() {
    this.getMemberDetails(); // 成员详情

    this.activeName = this.$route.name;
  },
  mounted() {},
  methods: {
    // 成员详情
    getMemberDetails() {
      this.$api
        .getMemberInfoById({
          memberId: this.$route.query.memberId,
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          this.memberDetails = res.data.data;
          this.memberDetails.memberIntroduce2 = this.memberDetails.memberIntroduce;
          if (
            this.memberDetails.memberIntroduce &&
            this.memberDetails.memberIntroduce.length > 95
          ) {
            this.memberDetails.memberIntroduce =
              this.memberDetails.memberIntroduce.substring(0, 95) + "...";
          }
        });
    },
    handleClick(tab, event) {
      if (this.$route.name !== tab.name) {
        this.$router.push({
          path: tab.name,
          query: { memberId: this.$route.query.memberId },
        });
      }
    },
  },
  watch: {
    $route(to, from) {
      this.activeName = this.$route.name;
      console.log(to, from);
    },
  },
};
</script>
<style lang="less">
.Personal-details {
  padding-bottom: 30px;
  // background-color: #f9f5f5;
  > .bg-img {
    position: absolute;
    top: 0;
    height: 700px;
    width: 100%;
    background: url(../assets/images/BG/bg-03.png) no-repeat center top;
  }
  > .header-box {
    position: relative;
    z-index: 9;
    padding: 88px 0 12px 0;
    > .head-portrait {
      margin: 0 auto;
      width: 142px;
      height: 142px;
      border: 4px solid #ffffff;
      border-radius: 50%;
      box-sizing: border-box;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    > .name {
      padding: 12px 0 4px 0;
      font-size: 18px;
      font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
      font-weight: 600;
      text-align: center;
      color: #000000;
    }
    > .type {
      padding: 4px 0 31px 0;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      text-align: center;
      color: rgba(0, 0, 0, 0.6);
    }
    > .tabs {
      margin-bottom: 24px;
      > .container {
        height: 46px;
        background: #ffffff;
        // border: 1px solid #e1e1e1;
        border-radius: 4px;
        box-shadow: 0px 3px 9px 0px rgba(32, 52, 0, 0.12);
      }
      .el-tabs {
        width: 310px;
        margin: 0 auto;
        > .el-tabs__header {
          margin: 0;
          > .el-tabs__nav-wrap {
            &::after {
              height: 0;
            }
            > .el-tabs__nav-scroll {
              > .el-tabs__nav {
                > .el-tabs__item {
                  font-weight: normal;
                  font-size: 18px;
                  color: #3d3308;
                }
                // 文字选中颜色
                > .is-active {
                  color: #3d3308;
                }
                // 选中下划线
                > .el-tabs__active-bar {
                  height: 3px;
                  background-color: #5b920b;
                  border-radius: 2px;
                }
              }
            }
          }
        }
      }
    }
  }

  .none {
    margin: 0 auto;
    padding: 50px 0;
    text-align: center;
    > img {
      display: block;
      margin: 0 auto;
      width: 517px;
      height: 371px;
    }
    > span {
      font-size: 26px;
      font-weight: 600;
      color: #6a7588;
      letter-spacing: 3px;
    }
  }
}
</style>