<template>
  <div class="Article-published" v-loading.fullscreen.lock="loading">
    <div class="container" :style="{ width: '810px' }">
      <div class="information">
        <el-row>
          <el-col>
            <div class="title">文章信息</div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
            >
              <el-form-item label="文章名称" prop="resourceInfoName">
                <el-input
                  class="suffix"
                  type="text"
                  placeholder="请输入文章名称"
                  v-model="ruleForm.resourceInfoName"
                  maxlength="30"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="文章分类" prop="catalogInfoIdFk">
                <el-cascader
                  :props="{
                    value: 'id',
                    label: 'label',
                    children: 'children',
                  }"
                  :key="keyIndex + 1"
                  v-model="chapterList"
                  :options="options"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="文章限制" prop="openButton">
                <el-radio v-model="ruleForm.openButton" label="0"
                  >公开</el-radio
                >
                <el-radio v-model="ruleForm.openButton" label="1"
                  >不公开</el-radio
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="upload-file">
      <div class="container" :style="{ width: '810px' }">
        <div class="title">编辑文本</div>
        <!-- <QuillEditor ref="QuillEditor" /> -->
        <Tinymce ref="Tinymce" />
      </div>
    </div>
    <div class="submit" v-if="domFlag">
      <div class="container" :style="{ width: '810px' }">
        <div class="btn1" @click="submit">提交发布</div>
        <!-- <div class="btn2" @click="submit">预览</div> -->
      </div>
    </div>
    <van-loading v-if="loading2" color="#1989fa" size="30px" vertical
      >解析中请稍等...</van-loading
    >
  </div>
</template>
<script>
import QuillEditor from "../components/Index/QuillEditor";
import Tinymce from "../components/Index/Tinymce";
export default {
  name: "Article-published",
  components: {
    QuillEditor,
    Tinymce,
  },
  data() {
    return {
      keyIndex: 1,
      loading: false,
      loading2: false,
      chapterList: [], // 章节ID
      options: [], // 分类列表
      columnList: [], // 栏目列表
      ruleForm: {
        workspaceId: this.$store.getters.workspaceId,
        resourceInfoName: "", // 资源名称
        resourceInfoDescription: "", // 简介
        resourceTypeIdFk: "", // 资源类型ID外键
        type: "", // 资源格式ID外键
        catalogInfoIdFk: "", // 章节外键
        openButton: "0", // 是否公开 0公开 1不公开
        originality: "1", // 1 原创可下载  2 原创不可下载  3非原创
        resourceDisplay: "2", // 1 教研资源  2 校本资源
        recommendation: "4", // 精品推荐  1名师推荐 2青年教师推荐  3不推荐
        resourceInfoAddr: "", // 资源地址
        resourceInfoPhysicsAddr: "", // 资源物理地址
        resourceSize: "", // 资源大小
        resourceDuration: "", // 资源时长
        uploadType: "1", // 0 大赛资源 1 工作坊资源 2平台资源
        resourceOrigin: "",
        resourceIscharge: "0", // 是否收费 （0 免费 1收费）
        resourceCharge: "0", // 价格
      },
      rules: {
        resourceInfoName: [
          { required: true, message: "请输入文章名称", trigger: "blur" },
        ],
        catalogInfoIdFk: [
          { required: true, message: "请输入文章分类", trigger: "blur" },
        ],
      },
      uploadThrottleValve: true, // 上传节流阀
      setInterval: "", // 定时器

      domFlag: true, // 元素展示
    };
  },
  created() {
    this.getOptions(); // 获取分类列表

    this.$api
      .getSelfDefinedMenuTree({ workspaceId: this.$store.getters.workspaceId })
      .then((res) => {
        this.columnList = res.data.data;
      });
  },
  mounted() {},
  methods: {
    handleChange() {},
    // 获取分类列表
    getOptions() {
      this.$http.get("/workspace/excel/findTreeBack").then((res) => {
        this.options = res.data.data;
      });
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
    // 资源上传发布
    resourceUpload() {
      this.ruleForm.workspaceId = this.$store.getters.workspaceId;
      this.$api.resourceUpload(this.ruleForm).then((res) => {
        if (res.data.code == 200) {
          this.$notify({
            title: "成功",
            message: "已提交审核",
            type: "success",
          });
          this.clearData();
        } else {
          this.$notify({
            title: "警告",
            message: "发布失败",
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
      // this.$http
      //   .post(
      //     this.$fileApi +
      //       "file/success?path=" +
      //       this.ruleForm.resourceInfoPhysicsAddr
      //   )
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       clearInterval(this.setInterval);
      this.resourceUpload(); // 资源上传发布
      //   } else {
      //     clearInterval(this.setInterval);
      //     this.setInterval = setInterval(() => {
      //       this.getSetInterval();
      //     }, 1000);
      //   }
      // })
      // .catch((err) => {
      //   clearInterval(this.setInterval);
      // });
    },
    submit() {
      this.ruleForm.resourceInfoPhysicsAddr = this.$refs.Tinymce.submitEditor();
      if (this.uploadThrottleValve) {
        if (this.submitForm()) {
          // 资源物理地址  判断上传了文件没
          if (this.ruleForm.resourceInfoPhysicsAddr == "") {
            this.$notify({
              title: "警告",
              message: "请编辑文章内容",
              type: "warning",
            });
            return;
          }
          this.uploadThrottleValve = false;
          this.getSetInterval();
        }
      }
    },
    clearData() {
      this.ruleForm = {
        workspaceId: this.$store.getters.workspaceId,
        resourceInfoName: "", // 资源名称
        resourceInfoDescription: "", // 简介
        resourceTypeIdFk: "", // 资源类型ID外键
        type: "", // 资源格式ID外键
        catalogInfoIdFk: "", // 章节外键
        openButton: "0", // 是否公开 0公开 1不公开
        originality: "1", // 1 原创可下载  2 原创不可下载  3非原创
        resourceDisplay: "1", // 1 教研资源  2 校本资源
        resourceInfoAddr: "", // 资源地址
        resourceInfoPhysicsAddr: "", // 资源物理地址
        resourceSize: "", // 资源大小
        resourceDuration: "", // 资源时长
        uploadType: "1", // 0 大赛资源 1 工作坊资源 2平台资源
        resourceOrigin: "",
        resourceIscharge: "0", // 是否收费 （0 免费 1收费）
        resourceCharge: "0", // 价格
      };
      this.chapterList = []; // 章节ID

      this.$refs.Tinymce.setContent(); // 清空富文本
    },
  },
  watch: {
    // 作品分类知识点分割
    chapterList(val) {
      if (val.length != 0) {
        var id = this.chapterList[this.chapterList.length - 1];
        this.ruleForm.catalogInfoIdFk = id.split("-")[0];
      }
    },
    "ruleForm.resourceDisplay"(val) {
      if (this.componentsFlag) {
        this.clearData(); // 清除数据
        this.ruleForm.resourceDisplay = val;
      }
    },
  },
  filters: {},
};
</script>
<style lang="less">
// .resource_type-select {
// .el-select {
// .el-scrollbar__view {
//   .el-select-dropdown__item:nth-child(2),
//   .el-select-dropdown__item:nth-child(3),
//   .el-select-dropdown__item:nth-child(4) {
//     color: red !important;
//   }
// }
// }
// }
.van-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .van-loading__text {
    color: #1989fa;
  }
}
.Article-published {
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
    margin-top: 16px;
    > .container {
      background-color: #fff;
      padding-bottom: 30px;
      .title {
        padding: 24px;
        margin-bottom: 24px;
        font-weight: 600;
        color: #1d1d1d;
        border-bottom: 1px solid rgba(29, 29, 29, 0.1);
      }
    }
  }
  > .submit {
    padding: 44px 0;
    .btn1,
    .btn2 {
      float: left;
      cursor: pointer;
      width: 166px;
      height: 43px;
      border-radius: 5px;
      line-height: 43px;
      font-size: 14px;
      text-align: center;
    }
    .btn1 {
      margin-right: 37px;
      background: #0a76d9;
      color: #ffffff;
    }
    .btn2 {
      background: #ffffff;
      border: 1px solid #e1e1e1;
    }
  }
}
</style>