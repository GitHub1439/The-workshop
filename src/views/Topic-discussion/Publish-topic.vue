<template>
  <div class="Publish-topic">
    <header-img title="话题发布" />
    <div class="container">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题：" prop="topicName">
          <el-input
            v-model="ruleForm.topicName"
            placeholder="请输入话题名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="topicDetails">
          <el-input
            type="textarea"
            v-model="ruleForm.topicDetails"
            placeholder="请输入话题正文"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="topicShown2">
          <el-checkbox v-model="ruleForm.topicShown2"
            >仅限于工作坊成员可见</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <div class="submit-btn clearfix">
            <div @click="submit">发布</div>
            <!-- <div>取消</div> -->
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import headerImg from "../../components/Index/Teaching-activities/Header-img";
export default {
  name: "Publish-topic",
  components: { headerImg },
  data() {
    return {
      ruleForm: {
        topicName: "",
        topicDetails: "",
        topicShown: false,
        topicShown2: false,
        recommendation: "1",
        workspaceId: this.$store.getters.workspaceId,
        memberId: this.$store.getters.personalDetails.memberId,
      },
      rules: {
        topicName: [
          { required: true, message: "请输入话题名称", trigger: "blur" },
        ],
        topicDetails: [
          { required: true, message: "请输入话题正文", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      var flag;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clearData() {
      this.ruleForm = {
        topicName: "",
        topicDetails: "",
        topicShown: false,
        topicShown2: false,
        recommendation: "1",
        workspaceId: this.$store.getters.workspaceId,
        memberId: this.$store.getters.personalDetails.memberId,
      };
    },
    submit() {
      if (this.submitForm("ruleForm")) {
        this.ruleForm.topicShown2
          ? (this.ruleForm.topicShown = 1)
          : (this.ruleForm.topicShown = 2);
        this.$api.editTopic(this.ruleForm).then((res) => {
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
        });
      }
    },
  },
};
</script>
<style lang="less">
.Publish-topic {
  background: #f6f6f6;
  min-height: 100vh;
  padding-bottom: 30px;
  > .container {
    margin-top: 30px;
    padding: 30px 90px 0 0;
    background-color: #fff;
    box-sizing: border-box;
    .el-textarea__inner {
      min-height: 285px !important;
      max-height: 285px;
    }
    .el-input__inner,
    .el-textarea__inner {
      border-radius: 0;
    }
    .submit-btn {
      text-align: center;
      > div {
        user-select: none;
        display: inline-block;
        cursor: pointer;
        width: 122px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        color: #ffffff;
      }
      > div:nth-child(1) {
        margin-right: 10px;
        background: #5688ff;
      }
      > div:nth-child(2) {
        background: #999;
      }
    }
  }
}
</style>