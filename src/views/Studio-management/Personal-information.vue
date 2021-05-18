<template>
  <div class="Personal-information">
    <div class="header-column">个人信息</div>
    <div class="information">
      <el-row>
        <el-col>
          <div class="title">头像管理</div>
        </el-col>
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
                v-if="ruleForm.avatar"
                :src="ruleForm.avatar"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
        <el-col>
          <div class="title">基本信息</div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="90px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名" prop="memberName">
              <!-- <el-input style="width: 30%" v-model="ruleForm.memberName"></el-input> -->
              <div>{{ ruleForm.memberName }}</div>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <!-- <el-input style="width: 30%" v-model="ruleForm.mobile"></el-input> -->
              {{ ruleForm.mobile }}
            </el-form-item>
            <el-form-item label="邮箱号" prop="email">
              <!-- <el-input style="width: 40%" v-model="ruleForm.email"></el-input> -->
              {{ ruleForm.email }}
            </el-form-item>
            <el-form-item label="所在单位" prop="memberGroup">
              <el-input
                style="width: 40%"
                class="suffix"
                type="text"
                placeholder="请输入内容"
                v-model="ruleForm.memberGroup"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="职务/职称" prop="memberPosition">
              <el-input
                style="width: 30%"
                class="suffix"
                type="text"
                placeholder="请输入内容"
                v-model="ruleForm.memberPosition"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="专长" prop="speciality">
              <el-input
                style="width: 30%"
                class="suffix"
                type="text"
                placeholder="请输入内容"
                v-model="ruleForm.speciality"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="个人简介" prop="memberIntroduce">
              <el-input
                style="width: 70%"
                class="suffix"
                type="text"
                placeholder="请输入内容"
                v-model="ruleForm.memberIntroduce"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col>
          <div class="submit" @click="submit">保存</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Personal-information",
  components: {},
  data() {
    return {
      ruleForm: {
        avatar: "",
        memberName: "",
        mobile: "",
        email: "",
        memberPosition: "",
        memberGroup: "",
        speciality: "",
        memberIntroduce: "",
        workspaceId: this.$store.getters.workspaceId,
      },
      rules: {
        memberPosition: [
          { required: true, message: "请输入职务/职称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        memberGroup: [
          { required: true, message: "请输入所在单位", trigger: "blur" },
        ],
        speciality: [
          { required: true, message: "请输入专长", trigger: "blur" },
        ],
        memberIntroduce: [
          { required: true, message: "请输入个人简介", trigger: "blur" },
        ],
      },
      personalDetails: {},
    };
  },
  created() {
    // 获取个人信息
    this.$api
      .getMemberInfoById({
        memberId: this.$store.getters.personalDetails.memberId,
        workspaceId: this.$store.getters.workspaceId,
      })
      .then((res) => {
        this.ruleForm = res.data.data;
      });
  },
  mounted() {},
  methods: {
    // 图片上传
    handleAvatarSuccess(res, file) {
      // this.form.imageUrl = URL.createObjectURL(file.raw);
      let formData = new FormData();
      formData.append("file", file.raw);
      this.ruleForm.avatar = res.data.addr; // 获取头像
    },
    // 限制图片大小和格式
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 [png,jpg,jpeg] 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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
      if (this.submitForm()) {
        this.ruleForm.workspaceId = this.$store.getters.workspaceId;
        delete this.ruleForm.createTime;
        delete this.ruleForm.modifyTime;
        this.$api.updateWorkSpaceMemberInfo(this.ruleForm).then((res) => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "修改失败",
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="less">
.Personal-information {
  padding-top: 32px;
  min-height: 657px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  > .header-column {
    margin-bottom: 24px;
    padding-left: 24px;
    height: 69px;
    background-color: #ffffff;
    font-weight: 600;
    color: #2a2a2a;
    line-height: 69px;
  }
  > .information {
    padding: 24px;
    box-sizing: border-box;
    background-color: #fff;
    > .el-row {
      > .el-col {
        > .title {
          margin-bottom: 24px;
          font-weight: 600;
          color: #1d1d1d;
        }
        > .upload {
          text-align: center;
          margin-bottom: 24px;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 50%;
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
            width: 113px;
            height: 113px;
            line-height: 113px;
            text-align: center;
          }
          .avatar {
            width: 113px;
            height: 113px;
            display: block;
          }
        }
        .el-form-item__content {
          font-size: 16px;
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
        > .submit {
          cursor: pointer;
          float: right;
          width: 72px;
          height: 43px;
          line-height: 43px;
          background-color: #0a76d9;
          border-radius: 4px;

          font-size: 14px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
</style>