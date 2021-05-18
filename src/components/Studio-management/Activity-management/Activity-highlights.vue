<template>
  <div class="Album-list">
    <div class="list">
      <ul>
        <li
          v-if="albumList.length < 6"
          class="add-album"
          @click="handelAddPoster"
        >
          <i class="el-icon-plus"></i>
          <div>添加活动集锦</div>
        </li>
        <li v-for="(item, index) in albumList" :key="index">
          <!-- <div class="flag" v-if="item.isShow == 1"></div> -->
          <img
            class="flag"
            src="../../../assets/images/studio-management/highlights.png"
            alt=""
          />
          <img class="cover-photo" :src="item.activitiesImage" alt="" />
          <img
            class="album-name"
            v-if="item.operate == 1"
            src="../../../assets/images/studio-management/draft.png"
            alt=""
          />
          <img
            class="album-name"
            v-else
            src="../../../assets/images/studio-management/submit.png"
            alt=""
          />
          <!-- <div class="img-count">{{ item.imgAddr.length }}张</div> -->
          <div class="edit">
            <div class="btn">
              <div @click="changeActivity(item)">
                <img
                  src="../../../assets/images/studio-management/edit.png"
                  alt=""
                />
                编辑
              </div>
              <div>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link"
                    ><img
                      src="../../../assets/images/studio-management/setUp.png"
                      alt=""
                    />
                    设置
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="delActivity(item)"
                      >删除</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="submitHighlights(item)"
                      >发布</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="page">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="pageForm.pageNum"
        :page-size="pageForm.pageSize"
        layout="prev, pager, next"
        :total="pageForm.total"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="新建文章"
      :visible.sync="dialogVisible"
      width="810px"
      :close-on-click-modal="false"
      center
      class="activity-dialog"
    >
      <el-form
        :model="ruleForm"
        :hide-required-asterisk="false"
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item label="封面图" prop="activitiesImage">
          <el-upload
            :action="`${$fileApi}/file/handelResource/?index=${2}`"
            list-type="picture-card"
            :headers="header"
            :on-remove="handleRemove"
            :on-success="fileHandleAvatarSuccess"
            :before-upload="fileBeforeAvatarUpload"
            :limit="1"
            :file-list="ruleForm.activitiesImage"
            :on-exceed="fileLimite"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="文章标题" prop="activitiesTitle">
          <el-input
            v-model="ruleForm.activitiesTitle"
            placeholder="文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="editorAuthor">
          <el-input
            v-model="ruleForm.editorAuthor"
            placeholder="作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动形式" prop="activitiesMode">
          <el-radio-group
            v-model="ruleForm.activitiesMode"
            @change="activitiesModeChange"
          >
            <el-radio :label="1">线下活动</el-radio>
            <el-radio :label="2">线上活动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="线下地址"
          prop="activitiesAddress"
          v-if="ruleForm.activitiesMode == 1"
        >
          <el-input
            v-model="ruleForm.activitiesAddress"
            placeholder="请输入线下地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="关联活动" v-if="ruleForm.activitiesMode == 2">
          <el-select
            v-model="ruleForm.relatedActivitiesId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.posterDetailId"
              :label="item.activityTitle"
              :value="item.posterDetailId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章导读" prop="activityGuideToReading">
          <el-input
            type="textarea"
            v-model="ruleForm.activityGuideToReading"
            placeholder="请输入文章导读"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="文章正文" prop="activitiesContent">
          <Tinymce
            ref="Tinymce"
            :activitiesContent="ruleForm.activitiesContent"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHighlights(1)" type="info">保存为草稿</el-button>
        <el-button type="primary" @click="addHighlights(2)">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from "../../Index/Tinymce";
export default {
  components: {
    Tinymce,
  },
  data() {
    return {
      activeName: "0",
      albumList: [],
      header: {
        token: this.$store.getters.token,
        eduCheck: 111,
      },
      ruleForm: {
        workspaceId: this.$store.getters.workspaceId, //	工作坊id
        editorAuthor: "", //活动发起人姓名
        activitiesTitle: "", // 活动名称
        activitiesImage: [], //活动宣传图片
        activitiesContent: "", //活动内容
        activitiesMode: 1, //活动形式
        relatedActivitiesId: "", //关联活动id
        activityGuideToReading: "", //文章导读
        operate: 1, //草稿/发布
        activitiesAddress: "", //线下地址
      },
      ruleForm2: {
        workspaceId: this.$store.getters.workspaceId, //	工作坊id
        editorAuthor: "", //活动发起人姓名
        activitiesTitle: "", // 活动名称
        activitiesImage: [], //活动宣传图片
        activitiesContent: "", //活动内容
        activitiesMode: 1, //活动形式
        relatedActivitiesId: "", //关联活动id
        activityGuideToReading: "", //文章导读
        operate: 1, //草稿/发布
        activitiesAddress: "", //线下地址
      },
      // 文件信息
      fileData: {
        absolutePath: "",
        addr: "",
        fileName: "",
      },
      //  关联活动
      options: [],
      // form 表单规则
      rules: {
        editorAuthor: [
          {
            required: true,
            message: "作者姓名不能为空",
            trigger: "blur",
          },
        ],
        activitiesTitle: [
          { required: true, message: "文章标题不能为空", trigger: "blur" },
        ],

        activitiesMode: [
          { required: true, message: "活动形式不能为空", trigger: "change" },
        ],
        activityGuideToReading: [
          { required: true, message: "文章导读不能为空", trigger: "blur" },
        ],
        activitiesAddress: [
          { required: true, message: "线下活动地址不能为空", trigger: "blur" },
        ],
        // relatedActivitiesId: [
        //   { required: true, message: "请选择关联活动", trigger: "change" },
        // ],
      },
      albumDetails: {},
      form: {
        teachingAtlas: "", // 图集名称
        isShow: 2, // 1 展示 2不展示
        imgAddr: [], // 图片地址(集合)
        workspaceId: this.$store.getters.workspaceId,
      },
      // 是否为集锦新增
      PostIsNew: true,
      // 新增弹窗
      dialogVisible: false,
      // 集锦列表参数
      pageForm: {
        workspaceId: this.$store.getters.workspaceId,
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      flag:true,
      timer:null,
    };
  },
  created() {
    this.getGame_foto(); //获取集锦列表
    this.getAssociatedActivities(); //获取关联活动
  },
  mounted() {},
  methods: {
    // 活动集锦
    getGame_foto() {
      this.$api.Game_foto(this.pageForm).then((res) => {
        this.albumList = res.data.data.records;
        this.pageForm.total = res.data.data.total;
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getGame_foto();
    },
    // 编辑集锦
    changeActivity(item) {
      this.ruleForm = JSON.parse(JSON.stringify(item));
      this.ruleForm.activitiesImage = [{ url: item.activitiesImage }];

      this.PostIsNew = false;
      this.dialogVisible = true;
      setTimeout(() => {
        this.$refs.Tinymce.content = this.ruleForm.activitiesContent;
        this.$refs.Tinymce.editContent();
      }, 10);
    },
    // 获取关联活动
    getAssociatedActivities() {
      this.$api
        .getAssociatedActivities({
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.options = res.data.data;
          }
        });
    },
    // 发布操作按钮
    submitHighlights(item) {
      this.ruleForm = JSON.parse(JSON.stringify(item));
      delete this.ruleForm.createTime;
      delete this.ruleForm.modifyTime;
      this.ruleForm.operate = 2;
      this.$api.highlightsUpdate(this.ruleForm).then((res) => {
        if (res.data.code == 200) {
          this.$notify({
            title: "成功",
            message: "发布成功",
            type: "success",
          });
          this.getGame_foto();
        } else {
          this.$notify.error({
            title: "错误",
            message: "更新失败，请重试",
          });
        }
      });
    },
    // 新增集锦
    addHighlights(operate) {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 图片地址
          this.ruleForm.activitiesImage = this.ruleForm.activitiesImage[0].url;

          //活动内容
          this.ruleForm.activitiesContent = this.$refs.Tinymce.submitEditor();
          this.ruleForm.operate = operate;
          if (this.flag) {
            this.flag = false;
          if (this.PostIsNew) {
            // 活动集锦新增
            this.$api.highlightsSignUp(this.ruleForm).then((res) => {
              if (res.data.code == 200) {
                this.$notify({
                  title: "成功",
                  message: operate == 1 ? "保存草稿成功" : "发布成功",
                  type: "success",
                });
                this.dialogVisible = false;
                this.getGame_foto();
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "报名失败，请重试",
                });
              }
            });
          } else {
            delete this.ruleForm.createTime;
            delete this.ruleForm.modifyTime;
            this.$api.highlightsUpdate(this.ruleForm).then((res) => {
              if (res.data.code == 200) {
                this.$notify({
                  title: "成功",
                  message: operate == 1 ? "保存草稿成功" : "发布成功",
                  type: "success",
                });
                this.dialogVisible = false;
                this.getGame_foto();
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "更新失败，请重试",
                });
              }
            });
          }
           this.timer = setTimeout(() => {
            this.flag = true;
          }, 2000);
          }
        }
      });
    },
    // 线上线下切换change事件
    activitiesModeChange(val) {
      this.ruleForm.activitiesAddress = "";
      this.ruleForm.relatedActivitiesId = "";
    },
    // 打开新增弹框按钮
    handelAddPoster() {
      this.dialogVisible = true;
      this.PostIsNew = true;
     this.ruleForm = Object.assign({}, this.ruleForm2);
     setTimeout(() => {
        this.$refs.Tinymce.content = '';
        this.$refs.Tinymce.editContent();
      }, 10);
    },
    // 删除集锦
    delActivity(item) {
      let delData = {
        activitiesPhotoId: item.activitiesPhotoId,
      };
      this.$api.highlightsDel(delData).then((res) => {
        if (res.data.code == 200) {
          this.$notify({
            title: "成功",
            message: "删除集锦成功",
            type: "success",
          });
          this.getGame_foto();
        }
      });
    },
    //删除预览图片
    handleRemove(file, fileList) {
      this.ruleForm.activitiesImage = [];
      this.$api
        .delResource({
          path: file.url,
          token: this.$store.getters.token,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
            });
          }
        });
    },
    // 上传的文件
    fileHandleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.$notify({
          title: "成功",
          message: "上传成功",
          type: "success",
        });
        if (res.code == 200) {
          this.fileData.absolutePath = res.data[0].absolutePath;
          this.$api
            .OnlineResource({
              resourceUrl: res.data[0].absolutePath,
            })
            .then((res) => {
              this.ruleForm.activitiesImage.push({
                url: res.data.data.fileAddress,
              });
            });
        }
      } else {
        this.$notify({
          title: "警告",
          message: "上传失败",
          type: "warning",
        });
      }
    },
    // 控制上传类型
    fileBeforeAvatarUpload(file) {
      const fileType = ["png", "jpg"];
      var flag = true;
      if (fileType.indexOf(file.name.split(".")[1]) == -1) {
        flag = false;
      }

      if (!flag) {
        this.$notify({
          title: "警告",
          message: `系统暂不支持此格式上传，支持格式（${fileType}）`,
          type: "warning",
        });
      }
      return flag;
    },
    // 超出限制
    fileLimite(files, fileList) {
      this.$notify({
        title: "警告",
        message: "上传文件超出限制",
        type: "warning",
      });
    },
  },
};
</script>
<style lang="less">
.v-modal {
  z-index: 998 !important;
}
</style>
<style lang="less" scoped>
.Album-list {
  padding: 0 28px;
  /deep/ .el-dialog__wrapper {
    z-index: 999 !important;
  }
  > .page {
    float: right;
  }
  .list {
    > ul {
      padding-top: 16px;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      > li {
        position: relative;
        cursor: pointer;
        margin: 0 64px 32px 0;
        width: 236px;
        height: 176px;
        // overflow: hidden;
        > .flag {
          position: absolute;
          top: 8px;
          left: -5px;
          z-index: 1;
          width: 66px;
          height: 29px;
        }
        > .cover-photo {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
        > .album-name {
          position: absolute;

          top: 0;
          right: 0;
          z-index: 1;
        }
        > .img-count {
          position: absolute;
          right: 0;
          bottom: 0;
          padding: 0 14px;
          height: 25px;
          background: #5688ff;
          border-radius: 0px 0px 4px 0px;
          line-height: 25px;
          font-size: 13px;
          text-align: center;
          color: #ffffff;
        }
        > .edit {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 4px;
          > .btn {
            display: none;
            position: absolute;
            bottom: 11px;
            width: 100%;
            padding: 0 32.5px;
            color: #ffffff;
            > div {
              float: left;
              width: 74px;
              height: 30px;
              border: 1px solid #ffffff;
              border-radius: 15px;
              line-height: 30px;
              font-size: 13px;
              text-align: center;
              img {
                margin-right: 4px;
                width: 16px;
                height: 16px;
                vertical-align: middle;
                transform: translateY(-2px);
              }
              > .el-dropdown {
                color: #ffffff;
                .el-dropdown-menu__item {
                  text-align: center !important;
                }
              }
            }
            > div:nth-child(2) {
              margin-left: 22px;
            }
          }
        }
      }
      > li:hover {
        > .edit {
          > .btn {
            display: block;
          }
        }
      }
      > .add-album {
        border: 1px solid #e1e1e1;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        color: #919191;
        > i {
          margin-top: 45px;
          font-size: 60px;
        }
        > div {
          margin-top: 10px;
        }
      }
      > li:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .activity-dialog {
    .activity-content {
      /deep/ textarea {
        height: 367px;
      }
    }
    /deep/ .el-form-item__label {
      font-size: 14px;
      color: #5688ff;
      float: none;
    }
    /*标签样式 */
    .keys {
      width: 20%;
      position: relative;
      float: left;
      margin-right: 10px;
      > .el-input {
        width: 100%;
      }
      > i {
        position: absolute;
        right: 0;
      }
    }
    .addBtn {
      clear: both;
    }
  }
}
</style>