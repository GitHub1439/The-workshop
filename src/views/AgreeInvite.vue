<template>
  <div class="AgreeInvite">
    <div class="container">
      <div class="header-column">
        <div @click="(searchFlag = true), getSearchList()">
          {{ workspaceName }}
        </div>
      </div>
      <div class="information">
        <el-row class="information-row">
          <el-col>
            <div class="title">信息完善</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-row>
                <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                  <el-form-item label="姓名" prop="inviteeName">
                    <el-input v-model="ruleForm.inviteeName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="手机号" prop="inviteeTel">
                    <el-input v-model="ruleForm.inviteeTel"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="验证码" prop="inputCode">
                    <el-row>
                      <el-col :span="12">
                        <el-input v-model="ruleForm.inputCode"></el-input>
                      </el-col>
                      <el-col :span="12">
                        <div class="getCode" @click="getCode">
                          <div>
                            {{ codeFlag ? codeNumber : "获取验证码" }}
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="邮箱" prop="inviteeEmail">
                    <el-input v-model="ruleForm.inviteeEmail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="所在单位" prop="inviteeUnit">
                    <el-input
                      class="suffix"
                      type="text"
                      v-model="ruleForm.inviteeUnit"
                      maxlength="50"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="职务/职称" prop="inviteeJob">
                    <el-input
                      class="suffix"
                      type="text"
                      v-model="ruleForm.inviteeJob"
                      maxlength="20"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="专长" prop="inviteeSpeciality">
                    <el-input
                      class="suffix"
                      type="text"
                      v-model="ruleForm.inviteeSpeciality"
                      maxlength="50"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                  <el-form-item label="个人简介" prop="inviteeDescription">
                    <el-input v-model="ruleForm.inviteeDescription"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="submit" @click="submit">提交申请</div>
    </div>

    <!-- 搜索 -->
    <div class="search-box" v-if="searchFlag">
      <form action="/">
        <van-search
          v-model="searchValue"
          show-action
          placeholder="请输入工作坊名称"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <div class="search-list">
        <ul>
          <li
            v-for="(item, index) in searchList"
            :key="index"
            v-show="index < 10"
            @click="selectStudio(item, index)"
          >
            {{ item.workspaceName }}
          </li>
          <p v-if="searchList.length == 0">暂无结果</p>
        </ul>
      </div>
    </div>

    <el-dialog
      title="加入成功"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="360px"
      style="text-align: center"
    >
      <span>{{ message }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "AgreeInvite",
  components: {},
  data() {
    const validateMobile = (rule, value, callback) => {
      if (this.mobileFlag.test(value)) {
        callback();
      } else {
        callback("请输入正确的手机号");
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (this.emailFlag.test(value)) {
        callback();
      } else {
        callback("请输入正确的邮箱");
      }
    };
    return {
      dialogVisible: false,
      message: "", // 加入之后的账号消息提示
      workspaceName: "点击搜索工作坊", // 工作坊名称
      searchFlag: false, // 搜索框显示
      input: "",
      searchValue: "", // 搜索关键字
      searchList: [], // 搜索列表
      ruleForm: {
        workspaceId: "",
        inviteeName: "", // 受邀人姓名
        inviteeTel: "", // 受邀人手机号码
        inviteeEmail: "", // 受邀人邮箱
        inviteeStatus: "1",
        invitationRecordIdFk: "1",
        inviteeUnit: "", // 受邀人单位
        inviteeJob: "", // 受邀人职务
        inviteeSpeciality: "", // 受邀人专长
        inviteeDescription: "", // 受邀人简介
      },
      rules: {
        inviteeName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        inviteeTel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { required: true, validator: validateMobile, trigger: "blur" },
        ],
        inviteeEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { required: true, validator: validateEmail, trigger: "blur" },
        ],
        inviteeUnit: [
          { required: true, message: "请输入所在单位", trigger: "blur" },
        ],
        inviteeJob: [
          { required: true, message: "请输入职务/职称", trigger: "blur" },
        ],
        inviteeSpeciality: [
          { required: true, message: "请输入专长", trigger: "blur" },
        ],
        inviteeDescription: [
          { required: true, message: "请输入个人简介", trigger: "blur" },
        ],
      },
      mobileFlag: /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/, // 手机号验证
      emailFlag: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/, // 邮箱验证
      codeNumber: 60,
      codeFlag: false,
      codeSetInterval: "",
      btnFlag: true, // 按钮节流阀
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 表单验证
    submitForm() {
      var flag;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
    onSearch(val) {
      Toast(val);
    },
    // 关闭搜索
    onCancel() {
      this.searchFlag = false;
    },
    // 选择工作坊
    selectStudio(item, index) {
      this.ruleForm.workspaceId = item.workspaceId; // 获取工作坊ID
      this.workspaceName = item.workspaceName; // 获取工作坊名称
      this.searchFlag = false; // 隐藏搜索框
    },
    // 获取搜索列表
    getSearchList() {
      this.$http
        .get(
          "workspace/workspace/api/findWorkSpaceByName?workSpaceName=" +
            this.searchValue
        )
        .then((res) => {
          this.searchList = res.data.data;
        });
    },
    submit() {
      if (this.ruleForm.workspaceId == "") {
        Toast("请选择工作坊");
        return;
      }
      if (this.btnFlag) {
        if (this.submitForm()) {
          this.btnFlag = false;
          this.$http
            .get("workspace/invitationRecordDetails/updateByNameTel", this.ruleForm)
            .then((res) => {
              if (res.data.code == 200) {
                this.dialogVisible = true;
                this.message = res.data.message;
              } else {
                Toast(res.data.message);
              }
              setTimeout(() => {
                this.btnFlag = true;
              }, 1000);
            });
        }
      }
    },
    getCode() {
      // 节流阀
      if (this.codeFlag) {
        return;
      }
      if (this.mobileFlag.test(this.ruleForm.inviteeTel)) {
        this.$http
          .post(
            "workspace/workspace/api/getVerifyCode?mobile=" +
              this.ruleForm.inviteeTel
          )
          .then((res) => {
            if (res.data.code == 200) {
              this.$notify({
                title: "成功",
                message: "发送成功",
                type: "success",
              });
              this.codeFlag = true;
              this.codeSetInterval = setInterval(() => {
                this.codeNumber--;
              }, 1000);
            } else {
              this.$notify({
                title: "警告",
                message: res.data.message,
                type: "warning",
              });
            }
          });
      } else {
        this.$notify({
          title: "警告",
          message: "请输入正确的手机号",
          type: "warning",
        });
      }
    },
  },
  watch: {
    codeNumber(val1, val2) {
      if (this.codeNumber == 0) {
        this.codeNumber = 60;
        this.codeFlag = false;
        window.clearTimeout(this.codeSetInterval);
      }
    },
    searchValue() {
      this.getSearchList(); // 获取搜索列表
    },
  },
};
</script>
<style lang="less">
.AgreeInvite {
  padding-top: 16px;
  overflow: hidden;
  min-height: 100vh;
  background-color: #f5f5f5;
  .header-column {
    background-color: #ffffff;
    padding: 10px 20px;
    box-sizing: border-box;
    margin-bottom: 24px;
    > div {
      color: #606266;
      font-size: 14px;
      padding-left: 24px;
      height: 50px;
      font-weight: 600;
      line-height: 50px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
    }
  }
  .information {
    box-sizing: border-box;
    background-color: #fff;
    > .information-row {
      > .el-col {
        > .title {
          padding: 24px;
          border-bottom: 1px solid rgba(29, 29, 29, 0.1);
        }
        > .el-form {
          padding: 24px;
          .el-input {
            > .el-input__inner {
              height: 43px;
              background-color: #eeeeee;
              border: none;
            }
          }
          .suffix {
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
          .getCode {
            > div {
              float: right;
              cursor: pointer;
              width: 104px;
              height: 43px;
              background: #0a76d9;
              border-radius: 4px;
              line-height: 43px;
              text-align: center;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .submit {
    cursor: pointer;
    margin: 32px 0;
    width: 166px;
    height: 43px;
    line-height: 43px;
    background-color: #0a76d9;
    border-radius: 4px;

    font-size: 14px;
    text-align: center;
    color: #fff;
  }
  // 搜索
  .search-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: #f8f8fb;
    > .search-list {
      background-color: #fff;
      > ul {
        padding: 20px 30px;
        box-sizing: border-box;
        > li {
          padding: 24px 0;
          font-size: 24px;
          color: #333333;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        > p {
          text-align: center;
        }
      }
    }
  }
}
</style>