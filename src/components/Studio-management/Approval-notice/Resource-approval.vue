<template>
  <div class="Resource-approval">
    <p>共{{ pageForm.total }}条审批待处理</p>

    <el-row class="search-box">
      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <el-input placeholder="请输入资源名称" v-model="pageForm.resourceName">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <el-input placeholder="请输入作者名称" v-model="pageForm.author">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>

    <el-row class="list" :gutter="30">
      <el-col
        :xs="24"
        :sm="6"
        :md="12"
        :lg="12"
        :xl="12"
        v-for="(item, index) in resourceApprovalList"
        :key="index"
      >
        <div class="box">
          <div class="img-top">
            <img
              :src="
                require(`../../../assets/images/fileType/${item.resourceFormatIDfk}.png`)
              "
              alt
            />
            <div class="title">
              <el-tooltip :content="item.resourceInfoName" placement="top">
                <span class="spanTitle">{{ item.resourceInfoName | stringCutting(15) }}</span>
              </el-tooltip>
              <!-- v-if="item.resourceFormatIDfk != 10 || item.recommendation == 4" -->
              <span class="spanSee" @click="see(item)">查看</span>
            </div>
            <div class="teacher">
              <img :src="item.avatar" alt />
              <span>{{ item.username }}</span>
            </div>
          </div>
          <div class="time clearfix">
            <div>
              时间：
              <span>{{ item.uploadTime.substring(0, 10) }}</span>
            </div>
            <div v-if="item.resourceDisplay == 1">
              资源类型：
              <span>{{ item.resourcetypeName }}</span>
            </div>
            <div v-else>
              所属栏目：
              <span>{{ item.resourcetypeName }}</span>
            </div>
          </div>
          <el-row class="btn" :gutter="20">
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <!-- 
                (dialogVisible = true),
                  (flag = true),
                  (resourceDetails = item)
               -->
              <div
                class="btn-box"
                @click="
                  pass(item)
                "
              >
                通过
              </div>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <div
                class="btn-box"
                @click="
                  (dialogVisible = true),
                    (flag = false),
                    (resourceDetails = item)
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

    <!-- 查看 -->
    <el-dialog
      title
      :visible.sync="seeDialogVisible"
      :close-on-click-modal="false"
      width="855px"
    >
      <Dialog v-if="seeDialogVisible" ref="Dialog" />
    </el-dialog>

    <!-- 确认 -->
    <el-dialog
      title="审批结果确认"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="400px"
      style="text-align: center"
    >
      <span>{{ flag ? "确认该资源审批通过" : "拒绝该资源审批通过" }}</span>
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
import Dialog from "./Dialog";
export default {
  name: "Resource-approval",
  components: { Dialog },
  data() {
    return {
      resourceApprovalList: [], // 审批列表
      dialogVisible: false, // 确认框
      seeDialogVisible: false,
      flag: false, // true通过 false反驳
      resourceDetails: [], // 当前审核资源
      none: false, // 暂无数据
      pageForm: {
        pageNum: 1,
        pageSize: 6,
        total: 0,
        workspaceId: this.$store.getters.workspaceId,
        resourceName: "", // 搜索资源名称
        author: "", // 搜索老师名称
      },
    };
  },
  created() {
    this.getResourceApprovalList(); // 获取资源审批列表
  },
  mounted() {},
  methods: {
    // 获取资源审批列表
    getResourceApprovalList() {
      this.$http
        .get("workspace/workspace/api/find/workspaceResource", this.pageForm)
        .then((res) => {
          this.resourceApprovalList = res.data.data.records;
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
      this.getResourceApprovalList(); // 获取资源审批列表
      scrollTo(0, 0);
    },
    // 查看
    see(item) {
      if (item.recommendation != 4) {
        this.$http
          .post(this.$fileApi + "onlineFile/checkResource", {
            resourceUrl: item.resourceInfoAddr,
          })
          .then((res) => {
            if (res.data.code == 200) {
              if (res.data.data.code == "2") {
                this.$message({
                  type: "success",
                  message: res.data.data.msg,
                });

                if (
                  item.resourceFormatIDfk != "9" &&
                  item.resourceFormatIDfk != "10"
                ) {
                  this.seeDialogVisible = true;
                  setTimeout(() => {
                    this.$refs.Dialog.getData(
                      item.resourceInfoPhysicsAddr,
                      item.resourceFormatIDfk
                    );
                  }, 10);
                } else {
                  var fileName = item.resourceInfoAddr.substring(
                    item.resourceInfoAddr.lastIndexOf("/") + 1,
                    item.resourceInfoAddr.length
                  );
                  this.$axios({
                    method: "post",
                    url: this.$fileApi + "onlineFile/download",
                    responseType: "blob",
                    data: {
                      pathUrl: item.resourceInfoAddr,
                      fileName: fileName,
                    },
                  })
                    .then((res) => {
                      console.log(res);
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
                    })
                    .catch((err) => {});
                }
              } else {
                this.$message({
                  type: "info",
                  message: res.data.data.msg,
                });
              }
            }
          })
          .catch((err) => {});
      } else {
        this.seeDialogVisible = true;
        setTimeout(() => {
          this.$refs.Dialog.getData(
            item.resourceInfoPhysicsAddr,
            item.resourceFormatIDfk
          );
        }, 10);
      }
    },
    btn() {
      var auditResult;
      if (this.flag) {
        auditResult = 0; // 通过
      } else {
        auditResult = 2; // 驳回
      }
      this.$http
        .get("workspace/reourceAudit/resourceAuditAdd", {
          resourceInfoId: this.resourceDetails.resourceInfoID,
          auditResult: auditResult,
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.getResourceApprovalList(); // 获取资源审批列表
            this.dialogVisible = false;
          }
        });
    },
    pass(item) {
      if(item.recommendation != 4) {
        this.$http.post(this.$fileApi + "onlineFile/checkResource", {
          resourceUrl: item.resourceInfoAddr,
        })
        .then((res) => {
          if (res.data.code == 200) {
            if (res.data.data.code == "2") {
              this.$message({
                type: "success",
                message: "资源获取成功！",
              });
              this.dialogVisible = true;
              this.flag = true
              this.resourceDetails = item;
            } else {
              var message = res.data.data.msg;
              if(res.data.data.code == "1") {
                message = "资源转换中，请耐性等待！";
              } else {
                message = "资源获取失败，无法操作！";
              }
              this.$message({
                type: "info",
                message: message,
              });
            }
          }
        }).catch((err) => {});
      } else {
        this.dialogVisible = true;
        this.flag = true
        this.resourceDetails = item;
      }
    }
  },
  watch: {
    "pageForm.resourceName"(val) {
		this.pageForm.pageNum = 1;
      this.getResourceApprovalList();
    },
    "pageForm.author"(val) {
		this.pageForm.pageNum = 1;
      this.getResourceApprovalList();
    },
  },
  filters: {},
};
</script>
<style lang="less">
.el-pagination {
  padding: 40px 0;
  text-align: center;
}
.Resource-approval {
  > p {
    padding: 24px 0;
    color: rgba(42, 42, 42, 0.4);
  }
  > .search-box {
    margin-bottom: 20px;
    .el-input__inner {
      height: 27px;
      line-height: 27px;
      width: 250px;
    }
    .el-input__icon {
      line-height: 27px;
    }
  }
  > .list {
    > .el-col {
      margin-bottom: 32px;
      > .box {
        padding: 16px 18px 12px 16px;
        background-color: #fff;
        > .img-top {
          > img {
            margin-right: 24px;
            float: left;
            display: block;
            width: 79px;
            height: 89px;
          }
          > .title {
            margin-bottom: 10px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            > .spanTitle {
              font-weight: 600;
              color: #2a2a2a;
              line-height: 24px;
            }
            > .spanSee {
              margin-left: 10px;
              cursor: pointer;
              font-size: 12px;
              color: #0a76d9;
            }
          }
          > .teacher {
            > img {
              margin-right: 9px;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              vertical-align: middle;
            }
            > span {
              font-size: 14px;
              color: #2a2a2a;
            }
          }
        }
        > .time {
          padding: 16px 0 23px 0;
          > div {
            float: left;
            opacity: 0.4;
            font-size: 12px;
            color: rgb(42, 42, 42);
            > span {
              color: rgb(42, 42, 42);
            }
          }
          > div:nth-child(2) {
            margin-left: 5px;
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
              box-sizing: border-box;
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

  // > .el-dialog__wrapper {
  //   .el-dialog {
  //     margin: 0 !important;
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //     height: 500px;
  //     overflow-y: scroll;
  //     .el-dialog__header {
  //       text-align: center;
  //       // padding: 0;
  //       .el-dialog__headerbtn {
  //         // display: none;
  //       }
  //     }
  //     .el-dialog__body {
  //       // padding: 0;
  //     }
  //   }
  // }
  > .none {
    display: block;
    margin: 50px auto 0 auto;
    width: 216px;
    height: 197px;
  }
}
</style>