<template>
  <div class="Studio-joining-application">
    <div class="container">
      <div class="header-column">工作坊加入申请</div>
      <div class="information">
        <el-row class="information-row">
          <el-col>
            <div class="title">申请表单</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-row class="display-row">
                <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                  <el-form-item label="姓名" prop="memberName">
                    <el-input v-model="ruleForm.memberName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="ruleForm.mobile"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
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
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="所在单位" prop="memberGroup">
                    <el-input
                      class="suffix"
                      type="text"
                      v-model="ruleForm.memberGroup"
                      maxlength="50"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="职务/职称" prop="memberPosition">
                    <el-input
                      class="suffix"
                      type="text"
                      v-model="ruleForm.memberPosition"
                      maxlength="20"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item label="专长" prop="speciality">
                    <el-input
                      class="suffix"
                      type="text"
                      v-model="ruleForm.speciality"
                      maxlength="50"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                  <el-form-item label="个人简介" prop="memberIntroduce">
                    <el-input v-model="ruleForm.memberIntroduce"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                  <el-form-item label="申请理由" prop="applyReason">
                    <el-input v-model="ruleForm.applyReason"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="submit" @click="submit">提交申请</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Studio-joining-application",
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
      ruleForm: {
        workspaceId: this.$store.getters.workspaceId,
        memberName: "",
        mobile: "",
        inputCode: "",
        email: "",
        memberGroup: "",
        memberPosition: "",
        speciality: "",
        memberIntroduce: "",
        applyReason: "",
      },
      rules: {
        memberName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { required: true, validator: validateMobile, trigger: "blur" },
        ],
        inputCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { required: true, validator: validateEmail, trigger: "blur" },
        ],
        memberGroup: [
          { required: true, message: "请输入所在单位", trigger: "blur" },
        ],
        memberPosition: [
          { required: true, message: "请输入职务/职称", trigger: "blur" },
        ],
        speciality: [
          { required: true, message: "请输入专长", trigger: "blur" },
        ],
        memberIntroduce: [
          { required: true, message: "请输入个人简介", trigger: "blur" },
        ],
        applyReason: [
          { required: true, message: "请输入申请理由", trigger: "blur" },
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
  created() {
    this.$http
      .get("/workspace/user/get")
      .then((res) => {})
      .catch((err) => {});
  },
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
    submit() {
      if (this.btnFlag) {
        if (this.submitForm()) {
          this.btnFlag = false;
          this.$http
            .post("workspace/workspace/api/applyAddToWorkSpace", this.ruleForm)
            .then((res) => {
              if (res.data.code == 200) {
                this.$notify({
                  title: "成功",
                  message: res.data.message,
                  type: "success",
                });
                this.$router.push("Home");
              } else {
                this.$notify({
                  title: "警告",
                  message: res.data.message,
                  type: "warning",
                });
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
      if (this.mobileFlag.test(this.ruleForm.mobile)) {
        this.$http
          .post(
            "workspace/workspace/api/getVerifyCode?mobile=" + this.ruleForm.mobile
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
  },
};
</script>
<style lang="less">
.Studio-joining-application {
  padding-top: 32px;
  overflow: hidden;
  min-height: 100vh;
  background-color: #f5f5f5;
  .header-column {
    margin-bottom: 24px;
    padding-left: 24px;
    height: 69px;
    background-color: #ffffff;
    font-weight: 600;
    color: #2a2a2a;
    line-height: 69px;
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
          .display-row {
            > .el-col {
              display: block !important;
            }
          }
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
}
</style>