<template>
  <div class="Album-list">
    <div class="list">
      <ul>
        <li v-for="(item, index) in albumList" :key="index">
          <div class="flag" v-if="item.isShow == 1"></div>
          <img class="cover-photo" :src="item.imgAddr[0]" alt="" />
          <div class="album-name">{{ item.teachingAtlas }}</div>
          <div class="img-count">{{ item.imgAddr.length }}张</div>
          <div class="edit">
            <div class="btn">
              <div @click="changeAlbumFlag(item)">
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
                    <el-dropdown-item @click.native="edit(item, 1, index)"
                      >删除</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="edit(item, 2, index)"
                      >设为轮播</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </li>
        <li
          v-if="albumList.length < 10"
          class="add-album"
          @click="dialogVisible = true"
        >
          <i class="el-icon-plus"></i>
          <div>添加风采集</div>
        </li>
      </ul>
    </div>

    <el-dialog
      title="添加新的相册"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input
        placeholder="请输入相册名称"
        class="suffix"
        type="text"
        v-model="form.teachingAtlas"
        maxlength="20"
        show-word-limit
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAlbum">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Album-list",
  components: {},
  data() {
    return {
      albumList: [],
      albumDetails: {},
      form: {
        teachingAtlas: "", // 图集名称
        isShow: 2, // 1 展示 2不展示
        imgAddr: '[]', // 图片地址(集合)
        workspaceId: this.$store.getters.workspaceId,
      },
      dialogVisible: false,
    };
  },
  created() {
    this.getAlbumList(); // 获取相册列表
  },
  mounted() {},
  methods: {
    getAlbumList() {
      this.$api
        .getAlbumList({
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          this.albumList = res.data.data;
          this.albumList.forEach((item) => {
            item.imgAddr = JSON.parse(item.imgAddr);
          });
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
		item.imgAddr = JSON.stringify(item.imgAddr)
        this.$api.AddAlbum(item).then((res) => {
          if (res.data.code == 200) {
            this.getAlbumList(); // 获取相册列表
          }
        });
      }
    },
    changeAlbumFlag(item) {
      this.albumDetails = item;
      this.$emit("setAlbumDetails", this.albumDetails);
      this.$emit("changeAlbumFlag", false);
    },
    // 新增相册
    addAlbum() {
      this.$api.AddAlbum(this.form).then((res) => {
        if (res.data.code == 200) {
          this.dialogVisible = false;
          this.getAlbumList(); // 获取相册列表
          this.$notify({
            title: "成功",
            message: "添加成功",
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
  },
};
</script>
<style lang="less" scoped>
.Album-list {
  padding: 0 28px;
  > .list {
    > ul {
      padding-top: 16px;
      > li {
        position: relative;
        cursor: pointer;
        float: left;
        margin: 0 64px 32px 0;
        width: 236px;
        height: 176px;
        > .flag {
          position: absolute;
          top: 0;
          left: -5px;
          z-index: 1;
          width: 51px;
          height: 22px;
          background: url(../../../assets/images/studio-management/flag.png)
            no-repeat;
          background-size: 100% 100%;
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
}
</style>