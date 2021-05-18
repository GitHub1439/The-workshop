<template>
  <div class="Join-approval">
    <p>共{{ pageForm.total }}条审批待处理</p>
    <el-row class="list" :gutter="30">
      <el-col
        :xs="24"
        :sm="6"
        :md="12"
        :lg="12"
        :xl="12"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="box">
          <el-row class="works clearfix">
            <el-col>
              <label>申请人：</label>
              <div class="name">{{ item.memberName }}</div>
            </el-col>
            <el-col>
              <label>职称：</label>
              <div>
                <div class="text-">
                  {{ item.memberPosition | memberPosition }}
                </div>
              </div>
            </el-col>
            <el-col>
              <label>专长：</label>
              <div>
                <div class="text-">{{ item.speciality }}</div>
              </div>
            </el-col>
            <el-col>
              <label>联系方式：</label>
              <div>{{ item.memberPhone }}</div>
            </el-col>
            <el-col>
              <label>单位：</label>
              <div>{{ item.memberGroup }}</div>
            </el-col>
            <el-col>
              <label>时间：</label>
              <div>{{ item.createTime }}</div>
            </el-col>
            <el-col>
              <label>申请理由：</label>
              <div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.applyReason"
                  placement="top"
                >
                  <span>
                    {{ item.applyReason | stringCutting(23) }}
                  </span>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
          <el-row class="btn" :gutter="20">
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <div
                class="btn-box"
                @click="
                  (dialogVisible = true), (flag = true), (memberDetails = item)
                "
              >
                通过
              </div>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <div
                class="btn-box"
                @click="
                  (dialogVisible = true), (flag = false), (memberDetails = item)
                "
              >
                驳回
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageForm.pageNum"
      :page-size="pageForm.pageSize"
      layout="prev, pager, next, total, jumper"
      :total="pageForm.total"
      hide-on-single-page
    ></el-pagination>

    <el-dialog
      title="审批结果确认"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="400px"
      style="text-align: center"
    >
      <span>{{ flag ? "同意加入工作坊" : "拒绝加入工作坊" }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="btn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 暂无数据 -->
    <img
      class="none"
      v-if="none"
      src="../../../assets/images/none/none-approval.png"
      alt
    />
  </div>
</template>
<script>
export default {
  name: "Join-approval",
  components: {},
  data() {
    return {
      list: [],
      dialogVisible: false, // 确认框
      flag: false, // true通过 false反驳
      memberDetails: [], // 当前审核成员
      none: false, // 暂无数据
      pageForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        workspaceId: this.$store.getters.workspaceId,
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      this.$http
        .get("workspace/workspace/api/applyWorkSpaceMember", this.pageForm)
        .then((res) => {
          this.list = res.data.data.records;
          this.pageForm.total = res.data.data.total;
          if (this.pageForm.total == 0) {
            this.none = true;
          } else {
            this.none = false;
          }
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getList();
      scrollTo(0, 0);
    },
    btn() {
      var stauts;
      if (this.flag) {
        stauts = 1; // 通过
      } else {
        stauts = 2; // 驳回
      }
      this.$http
        .post(
          "workspace/workspace/api/auditMember?memberId=" +
            this.memberDetails.memberId +
            "&stauts=" +
            stauts +
            "&workspaceId=" +
            this.$store.getters.workspaceId
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.getList();
            this.dialogVisible = false;
          }
        });
    },
  },
  filters: {
    memberPosition(val) {
      if (val) {
        if (val.length > 20) {
          return `${val.substring(0, 20)}...`;
        } else {
          return val;
        }
      }
    },
  },
};
</script>
<style lang="less">
.el-pagination {
  padding: 40px 0;
  text-align: center;
}
.Join-approval {
  > p {
    padding: 24px 0;
    color: rgba(42, 42, 42, 0.4);
  }
  > .list {
    > .el-col {
      margin-bottom: 32px;
      > .box {
        padding: 16px 18px 12px 16px;
        background-color: #fff;
        > .works {
          margin-bottom: 16px;
          > .el-col {
            > label {
              width: 70px;
              text-align: right;
              line-height: 24px;
              float: left;
              margin-right: 16px;
              font-size: 12px;
              color: rgba(42, 42, 42, 0.4);
            }
            > div {
              line-height: 24px;
              font-size: 12px;
              color: #2a2a2a;
            }
            > .name {
              font-size: 16px;
              font-weight: 600;
              color: #0a76d9;
            }
          }
        }
        > .btn {
          > .el-col {
            float: right;
            > .btn-box {
              cursor: pointer;
              height: 43px;
              line-height: 43px;
              text-align: center;
              font-size: 14px;
              font-weight: 600;
              &:active {
                opacity: 0.6;
              }
            }
          }
          > .el-col:nth-child(2) {
            > .btn-box {
              border: 1px solid #ee4f26;
              color: #ee4f26;
            }
          }
          > .el-col:nth-child(1) {
            > .btn-box {
              background-color: #2dbc69;
              color: #fff;
            }
          }
        }
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
      }
    }
  }
  > .none {
    display: block;
    margin: 50px auto 0 auto;
    width: 216px;
    height: 197px;
  }
}
</style>