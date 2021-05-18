<template>
  <div class="Album-details">
    <el-page-header @back="goBack" :content="albumDetails.teachingAtlas">
      <div class="go_back" @click="changeAlbumFlag"></div>
    </el-page-header>
    <div class="edit-column">
      <el-checkbox v-model="checked" @change="checkboxChange">全选</el-checkbox>
      <span>已选{{ selectImgList.length }}张</span>
      <div class="edit-btn">
        <div @click="del">批量删除</div>
        <el-upload
          class="avatar-uploader"
          :headers="{ eduCheck: 'eduCheck', token: $store.getters.token }"
          :action="`${$fileApi}/file/handelImgFiles/`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div>新增</div>
        </el-upload>
      </div>
    </div>
    <div class="list">
      <ul>
        <li
          v-for="(item, index) in albumDetails.imgAddr"
          :key="index"
          @click="selectChange(item)"
        >
          <img :src="item" alt="" />
          <div
            class=""
            :class="
              selectImgList.indexOf(item) !== -1
                ? 'checkbox checkbox-active'
                : 'checkbox'
            "
          ></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Album-details",
  props: ["albumDetails"],
  components: {},
  data() {
    return {
      checked: false,
      selectImgList: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 返回
    goBack() {
      this.$emit("changeAlbumFlag", true); // 关闭相册详情
    },
    // 删除图片
    del() {
      var arr = new Set(this.selectImgList);
      this.albumDetails.imgAddr = this.albumDetails.imgAddr.filter(
        (x) => !arr.has(x)
      ); // 差集
      delete this.albumDetails.createTime;
      delete this.albumDetails.updateTime;
	  let albumDetails = JSON.parse(JSON.stringify(this.albumDetails))
	  albumDetails.imgAddr = JSON.stringify(this.albumDetails.imgAddr)
      this.$api.AddAlbum(albumDetails).then((res) => {
        if (res.data.code == 200) {
          this.dialogVisible = false;
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$notify.error({
            title: "错误",
            message: res.data.message,
          });
        }
      });
    },
    // 全选框
    checkboxChange(e) {
      this.selectImgList = []; // 进来先清空数据，防止重复
      if (e) {
        this.albumDetails.imgAddr.forEach((item) => {
          this.selectImgList.push(item);
        });
      }
    },
    // 选择风采展示图片
    selectChange(item) {
      // 已选中就从数组中删除
      if (this.selectImgList.indexOf(item) != -1) {
        this.selectImgList.forEach((e, index) => {
          if (e == item) {
            this.selectImgList.splice(index, 1);
          }
        });
      } else {
        this.selectImgList.push(item); // 没有选择就添加
      }
      // 全部都选中了，选择框等于true
      if (this.selectImgList.length == this.albumDetails.imgAddr.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      // 请求上传相册
      this.albumDetails.imgAddr.push(res.data.addr);
	  let details = JSON.parse(JSON.stringify(this.albumDetails))
	  details.imgAddr = JSON.stringify(details.imgAddr)
      delete this.albumDetails.createTime;
      delete this.albumDetails.updateTime;

      this.$api.AddAlbum(details).then((res) => {});

      let formData = new FormData();
      formData.append("file", file.raw);
      // this.form.workspaceAvatar = res.data.addr; // 获取头像
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
  },
};
</script>
<style lang="less" scoped>
.Album-details {
  padding: 0 28px;
  > .edit-column {
    height: 68px;
    line-height: 68px;
    border-bottom: 1px solid #e1e1e1;
    > .go_back {
      margin-right: 60px;
      cursor: pointer;
      float: left;
      &:active {
        color: #5688ff;
      }
    }
    > span {
      margin-left: 34px;
      font-weight: 600;
      color: rgba(42, 42, 42, 0.6);
    }
    > .edit-btn {
      padding-top: 19px;
      float: right;
      > div {
        cursor: pointer;
        float: left;
        width: 91px;
        height: 33px;
        border-radius: 17px;
        font-size: 14px;
        line-height: 33px;
        font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
        font-weight: 600;
        text-align: center;
      }
      > div:nth-child(1) {
        border: 1px solid #ee4f26;
        color: #ee4f26;
      }
      > div:nth-child(2) {
        margin-left: 40px;
        background: #5688ff;
        color: #ffffff;
      }
    }
  }
  > .list {
    > ul {
      padding-top: 16px;
      > li {
        position: relative;
        cursor: pointer;
        float: left;
        margin: 0 32px 32px 0;
        width: 187px;
        height: 140px;
        > img {
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
        > .checkbox {
          position: absolute;
          right: 8px;
          bottom: 8px;
          width: 18px;
          height: 18px;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid #ffffff;
          border-radius: 50%;
        }
        > .checkbox-active {
          border: none;
          background: url(../../../assets/images/studio-management/checked.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      > li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>