<template>
  <div class="Upload-resources" v-loading.fullscreen.lock="loading">
    <div class="container">
      <div class="header-column">资源类型</div>
      <div class="resource-type">
        <el-radio
          :disabled="!componentsFlag"
          v-model="ruleForm.resourceDisplay"
          label="1"
          >教研资源</el-radio
        >
		<el-radio
		  :disabled="!componentsFlag"
		  v-model="ruleForm.resourceDisplay"
		  label="3"
		  >研修成果</el-radio
		>
        <el-radio
          :disabled="!componentsFlag"
          v-model="ruleForm.resourceDisplay"
          label="2"
          >专题资源</el-radio
        >
      </div>
      <div class="information">
        <el-row>
          <el-col>
            <div class="title">作品信息</div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="作品名称" prop="resourceInfoName">
                <el-input
                  class="suffix"
                  type="text"
                  placeholder="请输入作品名称"
                  v-model="ruleForm.resourceInfoName"
                  maxlength="30"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                label="作品分类"
                prop="catalogInfoIdFk"
                v-if="ruleForm.resourceDisplay == 1 || ruleForm.resourceDisplay == 3"
              >
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
              <el-form-item label="作品限制" prop="openButton">
                <el-radio v-model="ruleForm.openButton" label="0"
                  >公开</el-radio
                >
                <el-radio v-model="ruleForm.openButton" label="1"
                  >不公开</el-radio
                >
              </el-form-item>
              <el-form-item label="原创" prop="originality">
                <el-radio v-model="ruleForm.originality" label="1"
                  >可下载</el-radio
                >
                <el-radio v-model="ruleForm.originality" label="2"
                  >不可下载</el-radio
                ><el-radio v-model="ruleForm.originality" label="3"
                  >非原创</el-radio
                >
              </el-form-item>
              <el-form-item
                label="精品推荐"
                prop="recommendation"
                v-if="
                  !componentsFlag && ruleForm.resourceDisplay == 1 && comFlag || !componentsFlag && ruleForm.resourceDisplay == 3 && comFlag
                "
              >
                <el-radio v-model="ruleForm.recommendation" label="1"
                  >精品课例推荐</el-radio
                >
                <el-radio v-model="ruleForm.recommendation" label="2"
                  >精品研修推荐</el-radio
                >
                <el-radio v-model="ruleForm.recommendation" label="3"
                  >不推荐</el-radio
                >
              </el-form-item>
              <el-form-item
                class="resource_type-select"
                label="资源类型"
                prop="resourceTypeIdFk"
                v-if="ruleForm.resourceDisplay == 1 || ruleForm.resourceDisplay == 3"
              >
                <el-select
                  v-model="ruleForm.resourceTypeIdFk"
                  placeholder="请选择"
                >
                  <el-option
                    v-show="item.resourceTypeName !== '全部'"
                    v-for="item in resourcesTypeList"
                    :key="item.resourceTypeId"
                    :label="item.resourceTypeName"
                    :value="item.resourceTypeId"
                  ></el-option>
                </el-select>
              </el-form-item>
			  <el-form-item
			    class="resource_type-select"
			    label="信息化能力点"
			    prop="abilityPoint"
			    v-if="ruleForm.resourceDisplay == 1 || ruleForm.resourceDisplay == 3"
			  >
			    <el-select
			      v-model="ruleForm.abilityPoint"
			      placeholder="请选择"
			    >
			      <el-option
			        v-show="item.remark !== '全部'"
			        v-for="item in dictList"
			        :key="item.dictId"
			        :label="item.remark"
			        :value="item.dictId"
			      ></el-option>
			    </el-select>
			  </el-form-item>
              <el-form-item
                label="栏目类型"
                prop="catalogInfoIdFk"
                v-if="ruleForm.resourceDisplay == 2"
              >
                <el-cascader
                  :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children',
                  }"
                  :key="keyIndex + 1"
                  v-model="chapterList"
                  :options="columnList"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="简介" prop="resourceInfoDescription">
                <el-input
                  class="suffix"
                  type="text"
                  placeholder="请输入简介"
                  v-model="ruleForm.resourceInfoDescription"
                  maxlength="2000"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                label="封面"
                prop="coverPlan"
                v-if="
                  (ruleForm.resourceDisplay == 1 &&
                    ruleForm.recommendation != 3 &&
                    componentsFlag == false &&
                    comFlag) ||
                  (ruleForm.recommendation != 3 && componentsFlag == false)
                "
              >
                <div class="upload">
                  <el-upload
                    class="avatar-uploader"
                    :headers="{
                      eduCheck: 'eduCheck',
                      token: $store.getters.token,
                    }"
                    :action="`${$fileApi}/file/handelImgFiles/`"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="ruleForm.coverPlan || ruleForm.fl"
                      :src="ruleForm.coverPlan || ruleForm.fl"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="upload-file">
      <div class="container">
        <div class="title">
          上传作品
          <span>单个作品大小不超过700M</span>
        </div>
        <div class="upload-btn">
          <el-upload
            v-show="uploadBtnFlag"
            class="upload-demo"
            ref="uploadFile"
            :headers="{ eduCheck: 'eduCheck', token: $store.getters.token }"
            :action="$fileApi + 'file/handelResource?index=2'"
            multiple
            :show-file-list="false"
            :on-success="fileHandleAvatarSuccess"
            :before-upload="fileBeforeAvatarUpload"
            :on-progress="fileProgress"
          >
            <div class="btn">点击上传</div>
          </el-upload>
          <el-row v-if="!uploadBtnFlag">
            <el-col class="fileName" :span="8">
              <img src="../assets/images/fileType/11.png" alt />
              <span>{{
                ruleForm.resourceOrigin || ruleForm.resourceInfoName | fileName
              }}</span>
            </el-col>
            <el-col class="progress" :span="10">
              <el-progress
                v-if="filePercentageFlag"
                :text-inside="true"
                :stroke-width="20"
                :percentage="filePercentage"
              ></el-progress>
              <!-- <span v-if="!filePercentageFlag">上传成功</span> -->
            </el-col>
            <el-col class="clear-ico" :span="2">
              <i class="el-icon-error" @click="clearFile"></i>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="submit" v-if="componentsFlag">
      <div class="container">
        <div class="btn" @click="submit">提交发布</div>
      </div>
    </div>
    <van-loading v-if="loading2" color="#1989fa" size="30px" vertical
      >解析中请稍等...</van-loading
    >
  </div>
</template>
<script>
export default {
  name: "Upload-resources",
  components: {},
  data() {
    return {
      keyIndex: 1,
      loading: false,
      loading2: false,
      chapterList: [], // 章节ID
      options: [], // 分类列表
      resourcesTypeList: [], // 资源类型列表
      columnList: [], // 栏目列表
	  dictList:[],//信息化能力点
      ruleForm: {
        workspaceId: this.$store.getters.workspaceId,
        resourceInfoName: "", // 资源名称
        resourceInfoDescription: "", // 简介
        resourceTypeIdFk: "", // 资源类型ID外键
        type: "", // 资源格式ID外键
        catalogInfoIdFk: "", // 章节外键
        openButton: "0", // 是否公开 0公开 1不公开
        originality: "1", // 1 原创可下载  2 原创不可下载  3非原创
        resourceDisplay: "1", // 1 教研资源  2 校本资源
        recommendation: "3", // 精品推荐  1精品课例推荐 2精品研修推荐  3不推荐
        coverPlan: "", // 封面图
        resourceInfoAddr: "", // 资源地址
        resourceInfoPhysicsAddr: "", // 资源物理地址
        resourceSize: "", // 资源大小
        resourceDuration: "", // 资源时长
        uploadType: "1", // 0 大赛资源 1 工作坊资源 2平台资源
        resourceOrigin: "",
        resourceIscharge: "0", // 是否收费 （0 免费 1收费）
        resourceCharge: "0", // 价格
		abilityPoint:""
      },
      rules: {
        resourceInfoName: [
          { required: true, message: "请输入作品名称", trigger: "blur" },
        ],
        catalogInfoIdFk: [
          { required: true, message: "请输入作品分类", trigger: "blur" },
        ],
        resourceTypeIdFk: [
          { required: true, message: "请输入资源类型", trigger: "blur" },
        ],
        resourceInfoDescription: [
          { required: true, message: "请输入简介", trigger: "blur" },
        ],
		abilityPoint: [
		  { required: true, message: "请输入信息化能力点", trigger: "blur" },
		],
      },
      filePercentage: 0, // 文件进度条
      fileName: "", // 文件名称
      filePercentageFlag: false, // 文件进度条显示
      uploadBtnFlag: true, // 上传按钮
      uploadThrottleValve: true, // 上传节流阀
      setInterval: "", // 定时器

      componentsFlag: true, // 元素展示
      comFlag: false,
    };
  },
  created() {
    this.getOptions(); // 获取分类列表
    this.getTypeList(); // 获取类型列表
	this.getDictList(); // 获取信息化能力点

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
    // 获取信息化能力点
    getDictList() {
      this.$api.dict().then((res) => {
        this.dictList = res.data.data;
      });
    },
	// 获取类型列表
	getTypeList() {
	  this.$http.get("workspace/resourceType/findTypeAll").then((res) => {
	    this.resourcesTypeList = res.data.data;
	  });
	},
    // 获取视频信息
    getVideoPlayerInfo(file) {
      return new Promise((resolve) => {
        let videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(file);
        videoElement.addEventListener("loadedmetadata", function () {
          resolve({
            duration: videoElement.duration,
            width: videoElement.videoWidth,
            height: videoElement.videoHeight,
          });
        });
      });
    },
    // 控制上传类型
    fileBeforeAvatarUpload(file) {
      this.ruleForm.resourceOrigin = file.name; // 文件名称
      const fileType = ["xlsx", "xls"];
      const isLt700M = file.size / (1024 * 1024) < 700;
      var flag = true;
      // if (fileType.indexOf(file.name.split(".")[1]) == -1) {
      //   flag = false;
      // }
      // 获取视频信息 限制视频分辨率
      // this.getVideoPlayerInfo(file).then((videoInfo) => {
      //   const { duration, width, height } = videoInfo;
      //   // console.log(duration, width, height);
      //   if ((width, height)) {
      //     if (width < 1200 && height < 700) {
      //       this.$notify({
      //         title: "警告",
      //         message: "请上传1280*720分辨率视频文件",
      //         type: "warning",
      //       });
      //       this.clearFile(); // 删除文件
      //     }
      //   }
      // });

      if (!isLt700M) {
        this.$notify({
          title: "警告",
          message: `单个作品大小不超过700M`,
          type: "warning",
        });
      } else if (!flag) {
        this.$notify({
          title: "警告",
          message: `系统暂不支持此格式上传，支持格式（${fileType}）`,
          type: "warning",
        });
      }
      if (flag && isLt700M) {
        this.uploadBtnFlag = false; // 隐藏上传按钮
      }
      return flag && isLt700M;
    },
    // 上传的文件
    fileHandleAvatarSuccess(res, file) {
      if (res.code == 200) {
        // this.$notify({
        //   title: "成功",
        //   message: "上传成功",
        //   type: "success",
        // });
        this.loading2 = false;
        this.ruleForm.resourceSize = res.data[0].size; // 文件大小
        this.ruleForm.resourceInfoPhysicsAddr = this.ruleForm.resourceInfoAddr =
          res.data[0].absolutePath; // 资源物理地址 // 资源地址

        this.ruleForm.resourceDuration = res.data[0].time; // 资源时长
        this.ruleForm.type = res.data[0].type; // 资源格式
      } else {
        this.$notify({
          title: "警告",
          message: res.msg,
          type: "warning",
        });
      }
      // this.filePercentageFlag = false; // 隐藏进度条
    },
    // 文件上传进度
    fileProgress(event, file, fileList) {
      this.filePercentage = 0; // 清空上一次的进度条记录
      this.filePercentageFlag = true;
      this.filePercentage = parseFloat(
        Math.round((event.loaded / event.total) * 10000) / 100.0
      );
      if (this.filePercentage == 100) {
        this.loading2 = true;
      }
    },
    // 删除文件
    clearFile() {
      this.$refs.uploadFile.abort(); // 阻止上传
      this.filePercentage = 0; // 文件进度条清空
      this.filePercentageFlag = false; // 隐藏进度条
      this.uploadBtnFlag = true; // 显示上传按钮
      if (this.ruleForm.resourceInfoPhysicsAddr !== "") {
        this.$http
          .post(this.$fileApi + "file/handleFlieResourcesDelete", {
            path: this.ruleForm.resourceInfoPhysicsAddr,
          })
          .then((res) => {})
          .catch((err) => {});
      }
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      // this.form.imageUrl = URL.createObjectURL(file.raw);
      let formData = new FormData();
      formData.append("file", file.raw);
      this.ruleForm.coverPlan = res.data.addr; // 获取头像
      this.$forceUpdate();
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
    // 资源上传发布
    resourceUpload() {
      this.ruleForm.workspaceId = this.$store.getters.workspaceId;
      this.$api.resourceUpload(this.ruleForm).then((res) => {
        if (res.data.code == 200) {
          this.loading = false; // 不执行getSetInterval()方法加的
          this.$notify({
            title: "成功",
            message: "发布成功",
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
      if (this.uploadThrottleValve) {
        if (this.submitForm()) {
          // 资源物理地址  判断上传了文件没
          if (this.ruleForm.resourceInfoPhysicsAddr == "") {
            this.$notify({
              title: "警告",
              message: "请上传资源文件",
              type: "warning",
            });
            return;
          }
          this.uploadThrottleValve = false;
          //this.getSetInterval();
          this.loading = true;
          this.resourceUpload(); // 资源上传发布
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
      this.filePercentage = 0; // 文件进度条
      this.fileName = ""; // 文件名称
      this.filePercentageFlag = false; // 文件进度条显示
      this.uploadBtnFlag = true; // 上传按钮
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
    // 设置默认封面图
    "ruleForm.recommendation"(val) {
      this.ruleForm.fl =
        this.ruleForm.recommendation == 1
          ? "https://oss.hnedu.cn/img/profilePicture/2021-03-24/1616569802355.png"
          : "https://oss.hnedu.cn/img/profilePicture/2021-03-24/1616569901015.png";
    },
  },
  filters: {
    fileName(val) {
      if (val) {
        if (val.length > 12) {
          return `${val.substring(0, 12)}...`;
        } else {
          return val;
        }
      }
    },
  },
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
.Upload-resources {
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
  .resource-type {
    margin-bottom: 35px;
    padding-left: 24px;
    background-color: #fff;
    line-height: 60px;
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
          // 图片上传
          .upload {
            text-align: center;
            margin-bottom: 24px;
            .avatar-uploader .el-upload {
              float: left;
              border: 1px dashed #d9d9d9;
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
              width: 280px;
              height: 180px;
              line-height: 180px;
              text-align: center;
            }
            .avatar {
              width: 280px;
              height: 180px;
              display: block;
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
      .title {
        padding: 24px;
        margin-bottom: 24px;
        font-weight: 600;
        color: #1d1d1d;
        border-bottom: 1px solid rgba(29, 29, 29, 0.1);
        > span {
          margin-left: 30px;
          opacity: 0.4;
          font-size: 12px;
          color: rgba(29, 29, 29, 0.4);
        }
      }
      .upload-btn {
        padding: 24px;
        .btn {
          cursor: pointer;
          width: 104px;
          height: 43px;
          background-color: #0a76d9;
          border-radius: 4px;
          line-height: 43px;
          text-align: center;
          font-size: 14px;
          color: #ffffff;
        }
        .el-row {
          > .fileName {
            > img {
              margin-right: 14px;
              width: 43px;
              height: 48px;
              vertical-align: middle;
            }
            > span {
              font-size: 18px;
              font-weight: 600;
              color: #1d1d1d;
            }
          }
          > .progress {
            line-height: 48px;
            height: 48px;
            .el-progress {
              margin-top: 14px;
            }
          }
          > .clear-ico {
            i {
              cursor: pointer;
              color: rgba(29, 29, 29, 0.5);
              margin: 17px 0 0 10px;
            }
          }
        }
      }
    }
  }
  > .submit {
    padding: 44px 0;
    .btn {
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