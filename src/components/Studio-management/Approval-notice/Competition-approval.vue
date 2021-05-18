<template>
  <div class="Competition-approval">
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
              <label>作品名称：</label>
              <div class="Title-of-the-work text-overflow-2">
                {{ item.worksName }}
              </div>
            </el-col>
            <el-col>
              <label>申请老师：</label>
              <div class="applicant">
                <img :src="item.avatar" alt />
                <span>{{ item.writeName }}</span>
              </div>
            </el-col>
            <el-col>
              <label>团队成员：</label>
              <div class="Name-of-competition text-overflow-1">
                <span v-for="(item2, index2) in item.menberName" :key="index2"
                  >{{ item2 }},</span
                >
              </div>
            </el-col>
            <el-col>
              <label>参赛名称：</label>
              <div class="Name-of-competition text-overflow-1">
                首届湖南省“互联网+教学创新”大赛
              </div>
            </el-col>
            <el-col>
              <label style="float: none; margin-left: 10px">作品信息：</label>
              <ul class="clearfix">
                <li v-for="(item3, index3) in item.resourceVos" :key="index3">
                  <div class="show-box">
                    <el-row>
                      <el-col :span="4">
                        <div class="title">{{ item3.resourceTypeName }}</div>
                      </el-col>
                      <el-col :span="2">
                        <img
                          :src="
                            require(`../../../assets/images/fileType/${item3.resourceFormatIdFk}.png`)
                          "
                          alt
                        />
                      </el-col>
                      <el-col :span="12">
                        <div class="fileName text-overflow-1">
                          {{ item3.resourceInfoName }}
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <span
                          class="see"
                          @click="see(item3, index3, 1)"
                          v-if="item3.resourceFormatIdFk < 9"
                          >查看</span
                        >
                        <span class="see" @click="see(item3, index3, 2)" v-else
                          >下载</span
                        >
                      </el-col>
                    </el-row>
                  </div>
                </li>
              </ul>
            </el-col>
            <el-col>
              <label>时间：</label>
              <div class="time">
                {{ item.creatTime }}
                <span>
                  学科学段：
                  <span>{{ item.sName }}{{ item.subjectName }}</span>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row class="btn" :gutter="20">
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <div
                class="btn-box"
                @click="
                  (confirmDialogVisible = true),
                    (flag = true),
                    (worksDetails = item)
                "
              >
                通过
              </div>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <div
                class="btn-box"
                @click="
                  (confirmDialogVisible = true),
                    (flag = false),
                    (worksDetails = item)
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
      :visible.sync="confirmDialogVisible"
      :close-on-click-modal="false"
      width="400px"
      style="text-align: center"
    >
      <span>{{ flag ? "同意该作品参赛" : "拒绝该作品参赛" }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="confirmDialogVisible = false"
          >取 消</el-button
        >
        <el-button size="small" type="primary" @click="btn">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="70%"
    >
      <Dialog ref="Dialog" />
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
import Dialog from "./Dialog";
export default {
  name: "Competition-approval",
  components: {
    Dialog,
  },
  data() {
    return {
      dialogVisible: false,
      confirmDialogVisible: false, // 确认框
      flag: false, // true通过 false反驳
      worksDetails: [], // 当前审核作品
      list: [],
      none: false, // 暂无数据
      pageForm: {
        pageNum: 1,
        pageSize: 6,
        total: 0,
        workspaceId: this.$store.getters.workspaceId,
      },
    };
  },
  created() {
    this.getList(); // 获取列表
  },
  mounted() {},
  methods: {
    // 获取列表
    getList() {
      this.$http.get("workspace/worksBack/workslist", this.pageForm).then((res) => {
        if (res.data.data !== null) {
          this.list = res.data.data.records;
          this.pageForm.total = res.data.data.total;
          this.none = false;
        } else {
          this.none = true;
        }
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getList();
      scrollTo(0, 0);
    },
    // 查看
    see(item, index, flag) {
      if (flag == 1) {
        this.dialogVisible = true;
        setTimeout(() => {
          this.$refs.Dialog.getData(
            item.resourceInfoPhysicsAddr,
            item.resourceFormatIdFk
          );
        }, 10);
      } else {
        this.downloadWeekly(item.resourceInfoPhysicsAddr, item.resourceOrigin);
      }
    },
    // 下载
    downloadWeekly(resourceInfoPhysicsAddr, fileName) {
      this.$http.defaults.baseURL = this.$fileApi; // 配置axios请求的地址
      this.$http
        .post("onlineFile/verifyUser", {
          pathUrl: resourceInfoPhysicsAddr,
          fileName: fileName,
        })
        .then((v) => {
          if (v.data.code == 200) {
            const u = "onlineFile/download";
            this.$http({
              method: "POST",
              url: u,
              responseType: "blob",
              data: {
                pathUrl: resourceInfoPhysicsAddr,
                fileName: fileName,
              },
            })
              .then((res) => {
                const content = res.data;
                if (!content) {
                  return;
                }
                const blob = new Blob([content]);
                if ("download" in document.createElement("a")) {
                  // 非IE下载
                  const elink = document.createElement("a");
                  elink.download = fileName;
                  elink.style.display = "none";
                  elink.href = URL.createObjectURL(blob);
                  document.body.appendChild(elink);
                  elink.click();
                  URL.revokeObjectURL(elink.href); // 释放URL 对象
                  document.body.removeChild(elink);
                } else {
                  // IE10+下载
                  navigator.msSaveBlob(blob, file);
                }
                this.$http.defaults.baseURL = "/requestApi"; // 配置axios请求的地址
              })
              .catch((err) => {
                this.$http.defaults.baseURL = "/requestApi"; // 配置axios请求的地址
              });
          } else {
            this.$message({
              type: "info",
              message: v.data.msg,
            });
          }
        });
    },
    btn() {
      var audit;
      if (this.flag) {
        audit = 1; // 通过
      } else {
        audit = 2; // 驳回
      }
      this.$http
        .post(
          "workspace/worksBack/audit?worksId=" +
            this.worksDetails.worksId +
            "&audit=" +
            audit +
            "&workspaceId=" +
            this.$store.getters.workspaceId
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.getList();
            this.confirmDialogVisible = false;
          }
        });
    },
  },
};
</script>
<style lang="less">
.el-pagination {
  padding: 40px 0;
  text-align: center;
}
.Competition-approval {
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
          > .el-col {
            margin-bottom: 16px;
            > label {
              width: 70px;
              text-align: right;
              line-height: 24px;
              float: left;
              margin-right: 16px;
              font-size: 12px;
              color: rgba(42, 42, 42, 0.4);
            }
            > .Title-of-the-work {
              font-weight: 600;
              color: #2a2a2a;
              line-height: 24px;
            }
            > .applicant {
              > img {
                margin-right: 4px;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                vertical-align: middle;
              }
              > span {
                font-size: 14px;
                color: #2a2a2a;
              }
            }
            > .Name-of-competition {
              line-height: 24px;
            }
            > ul {
              width: 100%;
              > li {
                margin-bottom: 8px;
                padding: 0 12px;
                box-sizing: border-box;
                background-color: #fbfbfb;
                height: 40px;
                line-height: 40px;
                > .show-box {
                  .title {
                    font-size: 12px;
                    color: #2a2a2a;
                  }
                  img {
                    margin-top: 6px;
                    float: left;
                    display: block;
                    margin-right: 10px;
                    width: 25px;
                    height: 28px;
                  }
                  .fileName {
                    float: left;
                    margin-right: 24px;
                    font-size: 14px;
                    color: #2a2a2a;
                  }
                  .see {
                    float: right;
                    display: block;
                    cursor: pointer;
                    font-size: 12px;
                    color: #0a76d9;
                  }
                }
              }
            }
            > .time {
              line-height: 24px;
              font-size: 12px;
              color: rgba(42, 42, 42, 0.8);
              > span {
                margin-left: 10px;
                color: rgba(42, 42, 42, 0.4);
                > span {
                  color: rgba(42, 42, 42, 0.8);
                }
              }
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
      // margin: 0 !important;
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
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