<template>
  <div class="Studio-management-column">
    <!-- tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="tab-1" label="工作坊信息" name="0">
        <div class="column-title">
          工作坊头像<span>建议图像上传尺寸为480*480px，2M以内</span>
        </div>
        <el-row>
          <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
            <div class="upload">
              <el-upload
                class="avatar-uploader"
                :headers="{ eduCheck: 'eduCheck', token: $store.getters.token }"
                :action="`${$fileApi}/file/handelImgFiles/`"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="form.workspaceAvatar"
                  :src="form.workspaceAvatar"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <div class="column-title">基本信息</div>
        <div class="form-list">
          <div class="input-box">
            <label>工作坊名称</label>
            <el-input
              style="width: 50%"
              class="suffix"
              type="text"
              placeholder="请输入内容"
              v-model="form.workspaceName"
              maxlength="50"
              show-word-limit
            ></el-input>
          </div>
          <div class="input-box">
            <label>创建者</label>
            <div>{{ form.workspaceCreator }}</div>
          </div>
          <div class="input-box">
            <label>简介</label>
            <el-input
              style="width: 70%"
              class="suffix"
              type="text"
              placeholder="请输入内容"
              v-model="form.workspaceIntroduce"
              maxlength="500"
              show-word-limit
            ></el-input>
          </div>
        </div>
        <div class="preservation clearfix">
          <div class="btn" @click="submit">保存</div>
        </div>
      </el-tab-pane>
      <el-tab-pane class="tab-2" label="成员管理" name="1">
        <div class="operation-box">
          <!-- 搜索 -->
          <el-input
            class="search"
            placeholder="搜索成员"
            prefix-icon="el-icon-search"
            v-model="pageForm.memberName"
          ></el-input>
          <div
            class="memberRoleSetUp"
            @click="$fun.openPage('Member-role-settings')"
          >
            <i class="el-icon-user-solid"></i>
            成员角色设置
          </div>
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
          <el-table-column label="头像" align="center">
            <template slot-scope="scope">
              <el-image
                class="table-td-thumb"
                :src="scope.row.avatar"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="memberName"
            label="姓名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="memberGroup"
            label="单位"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="联系方式"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="speciality"
            label="专长"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="加入时间"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column prop="name" label="成员类型" align="center">
            <template slot-scope="scope">
              <div
                :class="scope.row.tag == '成员' ? 'class1' : 'class2'"
                disable-transitions
              >
                {{ scope.row.tag }}
              </div>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" width="155">
            <template slot-scope="scope">
              <div
                class="set"
                @click="
                  (memberDetails = scope.row),
                    (dialogVisibles = true),
                    (radio = scope.row.titleId + '')
                "
                v-if="scope.row.titleId != 1"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="头衔设置"
                  placement="top"
                >
                  <i class="el-icon-setting"></i>
                </el-tooltip>
              </div>
              <el-button
                @click="see(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.tag == '管理员'"
                >撤销管理员</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="(memberDetails = scope.row), (dialogVisible = true)"
                >移出工作坊</el-button
              >
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
      <el-tab-pane class="tab-3" label="风采展示" name="2">
        <Album-List
          @changeAlbumFlag="changeAlbumFlag"
          @setAlbumDetails="setAlbumDetails"
          v-if="albumFlag"
        />
        <Album-Details
          @changeAlbumFlag="changeAlbumFlag"
          :albumDetails="albumDetails"
          v-else
        />
      </el-tab-pane>
      <el-tab-pane class="tab-4" label="栏目管理" name="3">
        <ColumnManagement />
      </el-tab-pane>
      <!-- <el-tab-pane class="tab-5" label="消息通知" name="4">
        <Announcement />
      </el-tab-pane> -->
    </el-tabs>

    <!-- 设置头衔 -->
    <el-dialog
      title="设置头衔"
      :visible.sync="dialogVisibles"
      :close-on-click-modal="false"
      width="400px"
      style="text-align: center"
    >
      <el-radio v-model="radio" label="2">辅导员</el-radio>
      <el-radio v-model="radio" label="3">顾问</el-radio>
      <el-radio v-model="radio" label="4">核心成员</el-radio>
      <el-radio v-model="radio" label="5">骨干教师</el-radio>
      <el-radio v-model="radio" label="6">青年教师</el-radio>
      <el-radio v-model="radio" label="7">研修教师</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisibles = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="setTitle"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 移除工作坊 -->
    <el-dialog
      title="移出工作坊"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="400px"
      style="text-align: center"
    >
      <span>是否将该成员移出工作坊</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="removeMember"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import AlbumList from "../../components/Studio-management/Studio-management-column/Album-list"; // 相册列表
import AlbumDetails from "../../components/Studio-management/Studio-management-column/Album-details"; // 相册详情
import ColumnManagement from "../../components/Studio-management/Studio-management-column/Column-management"; // 栏目管理
import Announcement from "../../components/Studio-management/Studio-management-column/Announcement"; // 栏目管理
export default {
  name: "Studio-management-column",
  components: { AlbumList, AlbumDetails, ColumnManagement, Announcement },
  data() {
    return {
      dialogVisible: false, // 确认框
      dialogVisibles: false, // 头衔设置
      activeName: "0",
      form: {}, // 工作坊信息
      searchValue: "", // 搜索值

      radio: "2", // 头衔 2骨干教师 3青年教师

      tableData: [], // 表格
      multipleSelection: [], // 多选框
      pageForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        workspaceId: this.$store.getters.workspaceId,
        memberName: "",
      },
      memberDetails: [], // 当前审核成员

      albumFlag: true, // 相册标记
      albumDetails: {}, // 相册详情
    };
  },
  created() {
    this.getMemberList(); // 获取成员列表
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.$store.getters.personalDetails));
  },
  methods: {
    changeAlbumFlag(val) {
      this.albumFlag = val;
    },
    setAlbumDetails(val) {
      this.albumDetails = val;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 设置头衔
    setTitle() {
      this.$api
        .setTitle({
          memberId: this.memberDetails.memberId,
          titleId: this.radio,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "设置成功",
              type: "success",
            });
            this.dialogVisibles = false;
            this.memberDetails.titleId = this.radio;
          } else {
            this.$notify({
              title: "警告",
              message: res.data.message,
              type: "warning",
            });
          }
        });
    },
    // 移除成员
    removeMember() {
      this.$http
        .get("workspace/workspace/api/deleteWorkSpaceMember", {
          memberId: this.memberDetails.memberId,
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "移出成功",
              type: "success",
            });
            this.getMemberList(); // 获取成员列表
          } else {
            this.$notify({
              title: "警告",
              message: res.data.message,
              type: "warning",
            });
          }
          this.dialogVisible = false;
        });
    },
    // 获取工作坊信息
    getStudioInformation() {
      this.$api
        .getStudioDetails({ workspaceId: this.$store.getters.workspaceId })
        .then((res) => {
          this.$store.commit("SET_PERSONAL_DETAILS", res.data.data);
          this.form = JSON.parse(JSON.stringify(res.data.data));
        });
    },
    // 获取成员列表
    getMemberList() {
      this.$http
        .get("workspace/workspace/api/findWorkSpaceMember", this.pageForm)
        .then((res) => {
          this.pageForm.total = res.data.data.total;
          this.tableData = res.data.data.records;
        });
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
      let formData = new FormData();
      formData.append("file", file.raw);
      this.form.workspaceAvatar = res.data.addr; // 获取头像
    },
    // 限制图片大小和格式
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 (png,jpg,jpeg) 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submit() {
      this.$http
        .post("workspace/workspace/api/updateWorkSpaceInfo", {
          workspaceId: this.$store.getters.workspaceId,
          workspaceAvatar: this.form.workspaceAvatar,
          workspaceIntroduce: this.form.workspaceIntroduce,
          workspaceName: this.form.workspaceName,
        })
        .then((res) => {
          if (res.data.code) {
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
            });
            this.getStudioInformation(); // 获取工作坊信息
          } else {
            this.$notify({
              title: "警告",
              message: "修改失败",
              type: "warning",
            });
          }
        });
    },
    // 多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    see(row) {
      console.log(row);
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getMemberList(); // 获取成员列表
      scrollTo(0, 0);
    },
  },
  watch: {
    "pageForm.memberName"(val) {
      this.getMemberList();
    },
  },
};
</script>
<style lang="less">
.Studio-management-column {
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
      > .tab-1 {
        box-sizing: border-box;
        padding: 24px 25px 47px 25px;
        .upload {
          text-align: center;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            // border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 116px;
            height: 116px;
            line-height: 116px;
            text-align: center;
          }
          .avatar {
            width: 116px;
            height: 116px;
            display: block;
          }
        }
        > .column-title {
          padding: 48px 0 25px 0;
          font-weight: 600;
          color: #1d1d1d;
          > span {
            margin-left: 16px;
            font-weight: 400;
            font-size: 12px;
            color: #999;
          }
        }
        > .form-list {
          padding-left: 10px;
          box-sizing: border-box;
          > .input-box {
            margin-bottom: 24px;
            line-height: 43px;
            > label {
              text-align: right;
              width: 70px;
              margin-right: 18px;
              float: left;
              font-size: 14px;
              color: rgba(44, 44, 44, 0.4);
            }
            .el-input {
              width: 200px;
              > .el-input__inner {
                height: 43px;
                background-color: #eeeeee;
                border: none;
              }
            }
            > .suffix {
              > .el-input__inner {
                padding-right: 80px;
              }
              // 长度限制
              .el-input__suffix {
                > .el-input__suffix-inner {
                  > .el-input__count {
                    > .el-input__count-inner {
                      background: none;
                    }
                  }
                }
              }
            }
          }
        }
        > .preservation {
          padding-right: 88px;
          > .btn {
            cursor: pointer;
            float: right;
            width: 72px;
            height: 43px;
            line-height: 43px;
            background-color: #0a76d9;
            border-radius: 4px;
            color: #fff;
            text-align: center;
          }
        }
      }
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
          > .memberRoleSetUp {
            line-height: 40px;
            float: right;
            cursor: pointer;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
            font-weight: 600;
            color: #5688ff;
            > i {
              font-size: 16px;
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
      > .tab-4 {
        padding: 0 40px;
        .title {
          padding: 20px 0 28px 0;
          font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
          font-weight: 600;
          text-align: center;
          color: #2a2a2a;
        }
        .column {
          margin-bottom: 30px;
          font-size: 18px;
          color: #111110;
          > span {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
          }
        }
        .list {
          > ul {
            > li {
              position: relative;
              margin-right: 25px;
              display: inline-block;
              padding: 12px 30px;
              font-size: 14px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              text-align: center;
              color: #414246;
              background: rgba(15, 15, 15, 0.07);
              border-radius: 4px;
              > .el-icon-error {
                display: none;
                cursor: pointer;
                position: absolute;
                right: -5px;
                top: -5px;
                font-size: 20px;
              }
            }
            > li:hover {
              > .el-icon-error {
                display: block;
              }
            }
            > li:nth-last-child(1) {
              cursor: pointer;
              font-size: 14px;
              color: #242424;
              border: 1px solid #e1e1e1;
              background-color: #fff;
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