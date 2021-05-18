<template>
  <div class="Album-list">
    <!-- tabs -->
    <ul class="tabs">
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ select: index == pageForm.activityState }"
        @click="changeTabs(item, index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="list">
      <ul>
        <li
          v-if="albumList.length < 6"
          class="add-album"
          @click="handelAddPoster"
        >
          <i class="el-icon-plus"></i>
          <div>添加海报</div>
        </li>
        <li v-for="(item, index) in albumList" :key="index">
          <img
            class="flag"
            src="../../../assets/images/studio-management/poster.png"
            alt=""
          />
          <img class="cover-photo" :src="item.activityImgUrl" alt="" />
          <!-- <div class="album-name">{{ item.teachingAtlas }}</div> -->
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
      title="新建活动"
      :visible.sync="dialogVisible"
      width="50%"
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
        <el-form-item label="活动海报" prop="activityImgUrl">
          <el-upload
            :action="`${$fileApi}/file/handelResource/?index=${2}`"
            list-type="picture-card"
            :headers="header"
            :on-remove="handleRemove"
            :on-success="fileHandleAvatarSuccess"
            :before-upload="fileBeforeAvatarUpload"
            :limit="1"
            :file-list="ruleForm.activityImgUrl"
            :on-exceed="fileLimite"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="活动标题" prop="activityTitle">
          <el-input
            v-model="ruleForm.activityTitle"
            placeholder="活动标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动发起人" prop="activityCreatorName">
          <el-input
            v-model="ruleForm.activityCreatorName"
            placeholder="活动发起人"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动设置-时间选择" prop="activityStartTime">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.activityStartTime"
              style="width: 100%"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.time"
              style="width: 100%"
              value-format="HH:mm:ss"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动形式" prop="activityType">
          <el-radio-group
            v-model="ruleForm.activityType"
            @change="activitiesModeChange"
          >
            <el-radio :label="1">线下活动</el-radio>
            <el-radio :label="0">线上活动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="活动地址"
          prop="activityPlace"
          v-if="ruleForm.activityType == 1"
        >
          <el-input
            v-model="ruleForm.activityPlace"
            placeholder="例：湖南省长沙市开福区××中学"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动标签">
          <div class="keys" v-for="(item, index) in inputs" :key="index">
            <el-input v-model="item.keys" placeholder="活动标签"></el-input>
            <i @click="delInput(item, index)" class="fa fa-times-circle-o"></i>
          </div>
          <div class="addBtn">
            剩余可添加4个
            <el-button
              :disabled="inputs.length > 3"
              type="text"
              @click="addInput"
              >添加</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="活动简介" prop="activityShortDesc">
          <el-input
            type="textarea"
            class="textarea"
            v-model="ruleForm.activityShortDesc"
            placeholder="请输入活动简介"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="活动内容">
          <Tinymce
            ref="Tinymce"
            :activitiesContent="ruleForm.activityDescription"
          />
        </el-form-item>

        <el-form-item label="活动公开设置" prop="isPublic">
          <label>此活动是否仅工作坊内成员可见</label>
          <el-radio-group v-model="ruleForm.isPublic">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAlbum">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from "../../Index/Tinymce";
export default {
  name: "Album-list",
  components: {
    Tinymce,
  },
  data() {
    return {
      albumList: [],
      header: {
        token: this.$store.getters.token,
        eduCheck: 111,
      },
      ruleForm: {
        workspaceId: this.$store.getters.workspaceId, //	工作坊id
        activityCreatorName: "", //活动发起人姓名
        activityTitle: "", // 活动名称
        activityPlace: "", //活动地点
        activityImgUrl: [], //活动宣传图片
        activityStartTime: "", //活动开始时间
        activityTags: "", //活动标签
        activityDescription: "", //活动内容
        activityType: "", //活动形式
        isPublic: "", //是否工作坊成员可见
        activityShortDesc: "", //简介
        time: "", //时间
      },
      ruleForm2: {
        workspaceId: this.$store.getters.workspaceId, //	工作坊id
        activityCreatorName: "", //活动发起人姓名
        activityTitle: "", // 活动名称
        activityPlace: "", //活动地点
        activityImgUrl: [], //活动宣传图片
        activityStartTime: "", //活动开始时间
        activityTags: "", //活动标签
        activityDescription: "", //活动内容
        activityType: 1, //活动形式
        isPublic: 1, //是否工作坊成员可见
        activityShortDesc: "", //简介
        time: "", //时间
      },
      // 海报状态
      tabs: [
        {
          name: "预告",
        },
        {
          name: "进行中",
        },
        {
          name: "已结束",
        },
      ],
      // 文件信息
      fileData: {
        absolutePath: "",
        addr: "",
        fileName: "",
      },
      inputs: [
        {
          keys: "",
        },
      ],
      // form 表单规则
      rules: {
        activityCreatorName: [
          {
            required: true,
            message: "活动发起人姓名不能为空",
            trigger: "blur",
          },
        ],
        activityTitle: [
          { required: true, message: "活动名称不能为空", trigger: "blur" },
        ],
        activityPlace: [
          { required: true, message: "活动地点不能为空", trigger: "blur" },
        ],
        activityStartTime: [
          { required: true, message: "活动开始时间不能为空", trigger: "blur" },
        ],
        activityTags: [
          { required: true, message: "活动标签不能为空", trigger: "blur" },
        ],
        // activityDescription: [
        //   { required: true, message: "活动内容不能为空", trigger: "blur" },
        // ],
        activityType: [
          { required: true, message: "活动形式不能为空", trigger: "change" },
        ],
        isPublic: [
          { required: true, message: "请选择成员可见选项", trigger: "change" },
        ],
        activityShortDesc: [
          { required: true, message: "请输入活动简介", trigger: "blur" },
        ],
      },
      albumDetails: {},
      form: {
        teachingAtlas: "", // 图集名称
        isShow: 2, // 1 展示 2不展示
        imgAddr: [], // 图片地址(集合)
        workspaceId: this.$store.getters.workspaceId,
      },
      // 是否为海报新增
      PostIsNew: true,
      // 新增弹窗
      dialogVisible: false,
      // 海报列表参数
      pageForm: {
        workspaceId: this.$store.getters.workspaceId,
        pageNum: 1,
        pageSize: 5,
        total: 0,
        activityState: 0,
      },
      flag: true,
      timer: null,
    };
  },
  created() {
    this.getActivity_Poster_list(); //获取海报列表
  },
  mounted() {},
  methods: {
    // 线上线下切换change事件
    activitiesModeChange(val) {
      this.ruleForm.activityPlace = "";
    },
    // 活动海报
    getActivity_Poster_list() {
      this.$api.Activity_Poster_list(this.pageForm).then((res) => {
        this.albumList = res.data.data.records;
        this.pageForm.total = res.data.data.total;
      });
    },
    edit(item, flag, index) {
      if (flag == 1) {
        this.$api.DelAlbum({ id: item.id }).then((res) => {
          if (res.data.code == 200) {
            this.albumList.splice(index, 1);
          } else {
            this.$notify.error({
              title: "错误",
              message: res.data.message,
            });
          }
        });
      } else {
        delete item.createTime;
        delete item.updateTime;
        item.isShow = 1;
        this.$api.AddAlbum(item).then((res) => {
          if (res.data.code == 200) {
            this.getAlbumList(); // 获取相册列表
          }
        });
      }
    },
    // 编辑海报
    changeActivity(item) {
      this.ruleForm = JSON.parse(JSON.stringify(item));

      this.ruleForm.activityImgUrl = [{ url: item.activityImgUrl }];
      this.ruleForm.activityStartTime = item.activityStartTime.substring(0, 10);
      this.ruleForm.time = item.activityStartTime.substring(11);
      setTimeout(() => {
        this.$refs.Tinymce.content = this.ruleForm.activityDescription;
        this.$refs.Tinymce.editContent();
      }, 10);
      if (item.activityTags) {
        this.inputs = [];
        let arr = item.activityTags.split(",");
        arr.forEach((item) => {
          this.inputs.push({
            keys: item,
          });
        });
      }

      this.PostIsNew = false;
      this.dialogVisible = true;
    },
    // 新增海报
    addAlbum() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 图片地址
          this.ruleForm.activityImgUrl = this.ruleForm.activityImgUrl[0].url;

          // 活动内容
          this.ruleForm.activityDescription = this.$refs.Tinymce.submitEditor();
          // 活动标签、
          let arr = [];
          this.inputs.forEach((item, index) => {
            arr.push(item.keys);
          });
          this.ruleForm.activityTags = arr.join(",");
          //活动时间
          this.ruleForm.activityStartTime =
            this.ruleForm.activityStartTime + " " + this.ruleForm.time;

          if (this.flag) {
            this.flag = false;
          
            if (this.PostIsNew) {
              // 活动海报新增

              this.$api.activitySignUp(this.ruleForm).then((res) => {
                if (res.data.code == 200) {
                  this.$notify({
                    title: "成功",
                    message: res.data.message,
                    type: "success",
                  });
                  this.dialogVisible = false;
                  this.getActivity_Poster_list();
                } else {
                  this.$notify.error({
                    title: "错误",
                    message: "报名失败，请重试",
                  });
                }
              });
            } else {
              // 活动海报修改
              delete this.ruleForm.createTime;
              delete this.ruleForm.modifyTime;
              this.$api.activityUpdate(this.ruleForm).then((res) => {
                if (res.data.code == 200) {
                  this.$notify({
                    title: "成功",
                    message: res.data.message,
                    type: "success",
                  });
                  this.dialogVisible = false;
                  this.getActivity_Poster_list();
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
    // 打开新增弹框按钮
    handelAddPoster() {
      this.dialogVisible = true;
      this.PostIsNew = true;
      this.ruleForm = Object.assign({}, this.ruleForm2);
      setTimeout(() => {
        this.$refs.Tinymce.content = "";
        this.$refs.Tinymce.editContent();
      }, 10);
      this.inputs = [
        {
          keys: "",
        },
      ];
    },

    // 删除海报
    delActivity(item) {
      let delData = {
        posterDetailIds: item.posterDetailId,
        workspaceId: this.$store.getters.workspaceId,
      };
      this.$api.delActivity(delData).then((res) => {
        if (res.data.code == 200) {
          this.$notify({
            title: "成功",
            message: "删除海报成功",
            type: "success",
          });
          this.getActivity_Poster_list();
        }
      });
    },
    // 切换tab栏
    changeTabs(item, index) {
      this.pageForm.activityState = index;
      this.getActivity_Poster_list();
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getActivity_Poster_list();
    },
    //删除预览图片
    handleRemove(file, fileList) {
      this.ruleForm.activityImgUrl = [];
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
              this.ruleForm.activityImgUrl.push({
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
    // 添加输入框
    addInput() {
      this.inputs.push({ keys: "" });
    },
    //删除输入框
    delInput(item, index) {
      if (this.inputs.length > 1) this.inputs.splice(index, 1);
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
  > .tabs {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    margin-top: 24px;
    > li {
      opacity: 1;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #2a2a2a;
      margin-right: 27px;
      cursor: pointer;
    }
    > .select {
      font-weight: 700;
      color: #5688ff;
    }
  }
  > .page {
    // position: absolute;
    // bottom: 0;
    // right: 0;
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
          top: 50%;
          left: 50%;
          z-index: 1;
          transform: translate(-50%, -50%);
          color: #fff;
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
    /deep/ .textarea {
      > textarea {
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