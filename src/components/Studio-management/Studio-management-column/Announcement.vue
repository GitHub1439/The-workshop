<template>
  <div class="Announcement" v-loading.fullscreen.lock="loading">
    <div class="information">
      <el-row>
        <el-col>
          <div class="title">消息发布</div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item label="消息标题" prop="title">
              <el-input
                class="suffix"
                type="text"
                placeholder="请输入消息标题"
                v-model="ruleForm.title"
                maxlength="30"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="upload-file">
      <QuillEditor ref="QuillEditor" />
      <div class="btn" @click="submit">发布</div>
    </div>
    <van-loading v-if="loading2" color="#1989fa" size="30px" vertical
      >解析中请稍等...</van-loading
    >
  </div>
</template>
<script>
import QuillEditor from "../../../components/Index/QuillEditor";
export default {
  name: "Announcement",
  components: {
    QuillEditor,
  },
  data() {
    return {
      keyIndex: 1,
      loading: false,
      loading2: false,
      ruleForm: {
        workspaceId: this.$store.getters.workspaceId,
        content: "",
        memberId: this.$store.getters.personalDetails.memberId,
        title: "",
        type: 2,
      },
      rules: {
        title: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
      },
      uploadThrottleValve: true, // 上传节流阀
      setInterval: "", // 定时器

      componentsFlag: true, // 元素展示
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleChange() {},
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
    // 资源上传发布
    resourceUpload() {
      this.loading = true;
      this.$api.Announcement(this.ruleForm).then((res) => {
        if (res.data.code == 200) {
          this.$notify({
            title: "成功",
            message: "发布成功",
            type: "success",
          });
          this.clearData();
        } else {
          this.$notify({
            title: "警告",
            message: res.data.message,
            type: "warning",
          });
        }
        this.loading = false;
        setTimeout(() => {
          this.uploadThrottleValve = true;
        }, 1000);
      });
    },
    getSetInterval() {
      this.loading = true;
      this.$http
        .post(
          this.$fileApi +
            "file/success?path=" +
            this.ruleForm.resourceInfoPhysicsAddr
        )
        .then((res) => {
          if (res.data.code == 200) {
            clearInterval(this.setInterval);
            this.loading = false;
            this.resourceUpload(); // 资源上传发布
          } else {
            clearInterval(this.setInterval);
            this.setInterval = setInterval(() => {
              this.getSetInterval();
            }, 1000);
          }
        })
        .catch((err) => {
          clearInterval(this.setInterval);
        });
    },
    submit() {
      this.ruleForm.content = this.$refs.QuillEditor.submitEditor();
      if (this.uploadThrottleValve) {
        if (this.submitForm()) {
          // 资源物理地址  判断上传了文件没
          if (this.ruleForm.content.trim() == "") {
            this.$notify({
              title: "警告",
              message: "请编辑文章内容",
              type: "warning",
            });
            return;
          }
          this.uploadThrottleValve = false;
          this.resourceUpload();
        }
      }
    },
    clearData() {
      this.ruleForm = {
        workspaceId: this.$store.getters.workspaceId,
        content: "",
        memberId: this.$store.getters.personalDetails.memberId,
        title: "",
        type: 2,
      };
      this.$refs.QuillEditor.content = "";
    },
  },
  watch: {},
  filters: {},
};
</script>
<style lang="less">
.van-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .van-loading__text {
    color: #1989fa;
  }
}
.Announcement {
  padding-top: 32px;
  min-height: 100vh;
  background-color: #f5f5f5;
  .header-column {
    padding-left: 24px;
    height: 69px;
    background-color: #ffffff;
    font-weight: 600;
    color: #2a2a2a;
    line-height: 69px;
    border-bottom: 1px solid rgba(29, 29, 29, 0.1);
  }
  .information {
    box-sizing: border-box;
    background-color: #fff;
    > .el-row {
      > .el-col {
        > .title {
          text-align: center;
          padding: 24px;
          margin-bottom: 24px;
          font-weight: 600;
          color: #1d1d1d;
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
  > .upload-file {
    background-color: #fff;
    .btn {
      float: right;
      margin: 44px 30px 44px 0;
      cursor: pointer;
      width: 166px;
      height: 43px;
      background: #0a76d9;
      border-radius: 4px;
      line-height: 43px;
      font-size: 14px;
      text-align: center;
      color: #ffffff;
    }
  }
}
</style>