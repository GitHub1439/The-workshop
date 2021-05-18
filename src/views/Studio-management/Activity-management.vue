<template>
  <div class="Activity-management">
    <!-- tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="tab-3" label="活动海报" name="0">
        <Album-List />
      </el-tab-pane>
      <el-tab-pane class="tab-2" label="话题讨论" name="1">
        <div class="operation-box">
          <!-- 搜索 -->
          <el-input
            class="search"
            placeholder="搜索话题"
            prefix-icon="el-icon-search"
            v-model="pageForm.topicName"
          ></el-input>
        </div>
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
          <el-table-column
            prop="memberName"
            label="序号"
            width="55"
            align="center"
          >
            <template slot-scope="scope">
              {{
                (pageForm.pageNum - 1) * pageForm.pageSize + scope.$index + 1
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="发布者"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="topicName"
            label="标题"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="recommendation"
            label="推荐状态"
            align="center"
            :formatter="recommendationFormatter"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column label="操作" width="155">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  设置<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    @click.native="setRecommendation(scope.row)"
                    >{{
                      scope.row.recommendation == 1 ? "设为推荐" : "取消推荐"
                    }}</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="delTopic(scope.row)"
                    >删除话题</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageForm.pageNum"
          :page-size="pageForm.pageSize"
          layout="prev, pager, next, total, jumper"
          :total="pageForm.total"
          hide-on-single-page
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane class="tab-5" label="活动集锦" name="2">
        <ActivityHighlights />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import AlbumList from "../../components/Studio-management/Activity-management/Album-list"; // 活动海报
import ActivityHighlights from "../../components/Studio-management/Activity-management/Activity-highlights"; // 活动集锦
export default {
  name: "Activity-management",
  components: { AlbumList, ActivityHighlights },
  data() {
    return {
      activeName: "0",
      form: {}, // 工作坊信息

      radio: "2", // 头衔 2骨干教师 3青年教师

      tableData: [], // 表格
      multipleSelection: [], // 多选框
      pageForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        workspaceId: this.$store.getters.workspaceId,
        topicName: "",
      },
      memberDetails: [], // 当前审核成员
    };
  },
  created() {
    this.getTopic_discussion_list(); // 获取话题讨论列表
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.$store.getters.personalDetails));
  },
  methods: {
    recommendationFormatter(el) {
      if (el.recommendation == 1) {
        return "不推荐";
      } else {
        return "已推荐";
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 获取话题讨论列表
    getTopic_discussion_list() {
      this.$api.Topic_discussion_list(this.pageForm).then((res) => {
        this.pageForm.total = res.data.data.total;
        this.tableData = res.data.data.rows;
      });
    },
    // 设置推荐
    setRecommendation(val) {
      delete val.createTime;
      this.$confirm(
        val.recommendation == 1 ? "是否设为推荐？" : "是否取消推荐？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "",
        }
      )
        .then(() => {
          var str = JSON.parse(JSON.stringify(val));
          str.recommendation == 1
            ? (str.recommendation = 2)
            : (str.recommendation = 1);
          this.$api.editTopic(str).then((res) => {
            if (res.data.code == 200) {
              this.$notify({
                title: "成功",
                message: "设置成功",
                type: "success",
              });
              this.getTopic_discussion_list();
            } else {
              this.$notify({
                title: "警告",
                message: res.data.message,
                type: "warning",
              });
            }
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    },
    // 删除话题
    delTopic(val) {
      this.$api
        .delTopic({ ids: val.id, workspaceId: this.$store.getters.workspaceId })
        .then((res) => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
            });
            this.getTopic_discussion_list();
          } else {
            this.$notify({
              title: "警告",
              message: "删除失败",
              type: "warning",
            });
          }
        });
    },
    // 多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getTopic_discussion_list(); // 获取话题讨论列表
      scrollTo(0, 0);
    },
  },
  watch: {
    "pageForm.topicName"(val) {
      this.getTopic_discussion_list();
    },
  },
};
</script>
<style lang="less">
.Activity-management {
  margin-top: 32px;
  min-height: 657px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
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
    }
    // 内容
    > .el-tabs__content {
      > .tab-2 {
        box-sizing: border-box;
        padding: 24px 25px 47px 25px;
        .operation-box {
          > .search {
            margin-bottom: 24px;
            width: 50%;
            > .el-input__inner {
              border-radius: 22px;
            }
          }
        }
        .table-td-thumb {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .set {
          cursor: pointer;
          float: left;
          padding-top: 3.5px;
          i {
            margin-right: 15px;
          }
        }
        .class1,
        .class2 {
          width: 65px;
          height: 26px;
          border-radius: 2px;
          font-size: 12px;
          line-height: 26px;
        }
        .class1 {
          background-color: rgba(58, 58, 58, 0.1);
          color: rgba(58, 58, 58, 0.8);
        }
        .class2 {
          background-color: rgba(238, 79, 38, 0.1);
          color: #ee4f26;
        }
        .el-pagination {
          padding: 40px 0;
          text-align: center;
        }
      }
      > .tab-3 {
      }
    }
  }
  > .el-dialog__wrapper {
    .el-dialog {
      margin: 0 !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .el-dialog__header {
        text-align: center;
        // padding: 0;
        .el-dialog__headerbtn {
          // display: none;
        }
      }
      .el-dialog__body {
        // padding: 0;
        .el-radio {
          width: 25%;
          margin-bottom: 10px;
        }
      }
    }
  }
  .add-column-dialog {
    .label {
      margin-bottom: 10px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #5688ff;
      > span {
        opacity: 0.6;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>