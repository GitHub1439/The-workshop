<template>
  <div class="Game-foto">
    <header-img title="活动集锦" />
    <div class="container">
      <!-- <div class="go-back" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        活动列表
      </div>
      -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="padding: 36px 0 33px 0"
      >
        <el-breadcrumb-item :to="{ path: '/Teaching-activities' }"
          >教研活动</el-breadcrumb-item
        >
        <el-breadcrumb-item>活动集锦</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="list clearfix">
        <ul>
          <router-link
            tag="li"
            :to="{
              path: 'Game_foto_details',
              query: { activitiesPhotoId: item.activitiesPhotoId },
            }"
            v-for="(item, index) in Game_foto_list"
            :key="index"
          >
            <div class="box">
              <div class="cover">
                <img :src="item.activitiesImage" alt="" />
              </div>
              <div class="activity-name">
                {{ item.activitiesTitle | stringCutting(26) }}
              </div>
              <div class="position">
                <img
                  src="../../assets/images/Teaching-activities/position2.png"
                  alt=""
                />
                <span>{{
                  item.relatedActivitiesId
                    ? "线上活动"
                    : item.activitiesAddress | stringCutting(13)
                }}</span>
              </div>
            </div>
            <ul>
              <li>
                <i class="iconfont">&#xe7a2;</i>
                <span>{{ item.createTime.substring(0, 10) }}</span>
              </li>
              <li>
                <i class="iconfont">&#xe625;</i>
                <span>{{ item.activitiesVisitCount }}</span>
              </li>
            </ul>
          </router-link>
        </ul>
      </div>
      <!-- 暂无数据 -->
      <no-data
        v-if="Game_foto_list.length == 0"
        style="border-radius: 8px"
        :data="{
          img: require('../../assets/images/Index/none2.png'),
          width: '517px',
          height: '371px',
          titleList: ['抱歉！', '暂无活动集锦'],
        }"
      />
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageForm.pageNum"
        :page-size="pageForm.pageSize"
        :total="pageForm.total"
        background
        hide-on-single-page
        layout="prev, pager, next"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import headerImg from "../../components/Index/Teaching-activities/Header-img";
import NoData from "../../components/No_data";
export default {
  name: "Game-foto",
  components: { headerImg, NoData },
  data() {
    return {
      Game_foto_list: [], // 活动集锦列表
      pageForm: {
        workspaceId: this.$store.getters.workspaceId,
        pageNum: 1,
        pageSize: 16,
        total: 0,
        topicName: "",
      },
    };
  },
  created() {
    this.getGame_foto(); // 活动集锦
  },
  mounted() {},
  methods: {
    // 活动集锦
    getGame_foto() {
      this.$api.Game_foto(this.pageForm).then((res) => {
        this.Game_foto_list = res.data.data.records;
        this.pageForm.total = res.data.data.total;
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getGame_foto(); // 活动集锦
      scrollTo(0, 0);
    },
  },
};
</script>
<style lang="less" scoped>
.Game-foto {
  > .container {
    > .go-back {
      cursor: pointer;
      padding: 25px 0 21px 0;
      font-size: 24px;
      color: #2a2a2a;
    }
    > .list {
      > ul {
        > li {
          float: left;
          margin: 0 26px 31px 0;
          cursor: pointer;
          position: relative;
          width: 280px;
          height: 302px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
          box-sizing: border-box;
          > .box {
            > .cover {
              position: relative;
              > img {
                width: 100%;
                height: 160px;
              }
            }
            > .activity-name {
              padding: 9px 14px 0 14px;
              color: #000000;
              line-height: 18px;
            }
            .position {
              padding: 15px 0 0 14px;
              > img {
                width: 26px;
                height: 26px;
                vertical-align: middle;
              }
              > span {
                margin-left: 8px;
                display: inline-block;
                transform: translate(0, 2px);
                color: #5688ff;
              }
            }
          }
          > ul {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 35px;
            border-top: 1px solid #e5e5e5;
            > li {
              width: 50%;
              height: 100%;
              line-height: 35px;
              float: left;
              border-right: 1px solid #e5e5e5;
              box-sizing: border-box;
              text-align: center;
              > i {
                margin-right: 4px;
                vertical-align: middle;
                font-size: 19px;
                color: #a4a4a4;
              }
              > span {
                font-size: 12px;
                color: #a4a4a4;
              }
              // &:hover {
              //   background: #5688ff;
              // > i {
              //   color: #fff;
              // }
              //   > span {
              //     color: #fff;
              //   }
              // }
            }
            > li:nth-last-child(1) {
              border: none;
            }
          }
        }
        > li:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
  // 分页
  /deep/.el-pagination .btn-prev,
  /deep/ .el-pagination .btn-next {
    width: 96px;
    height: 44px;
    // opacity: 0.16;
    background: rgba(61, 120, 255, 0.16);
    border-radius: 4px;
  }
  /deep/ .el-pager li {
    width: 64px;
    height: 44px;
    border: 1px solid #bbbbbb;
    border-radius: 5px;
    line-height: 44px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
    margin: 0 10px;
  }
  /deep/ .el-pager li.active {
    background: #3d78ff;
    color: #fff;
  }
}
</style>