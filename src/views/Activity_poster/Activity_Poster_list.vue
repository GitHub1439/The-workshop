<template>
  <div class="Activity_Poster_list">
    <header-img title="活动海报" />
    <div class="container">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="padding: 36px 0 33px 0"
      >
        <el-breadcrumb-item :to="{ path: '/Teaching-activities' }"
          >教研活动</el-breadcrumb-item
        >
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div class="activity-menu">
        <ul>
          <li
            :class="activity_menu_index == index ? 'activity_menu_active' : ''"
            v-for="(item, index) in activity_menu"
            :key="index"
            @click="activity_menu_index = index"
          >
            {{ item }}
          </li>
        </ul>
      </div> -->
      <!-- <activity-box /> -->
      <div class="list clearfix">
        <ul>
          <li v-for="(item, index) in Activity_Poster_list" :key="index">
            <router-link
              tag="div"
              :to="{
                path: 'Poster-details',
                query: { posterDetailId: item.posterDetailId },
              }"
              class="box"
            >
              <div class="cover">
                <img :src="item.activityImgUrl" alt="" />
                <div
                  class="flag"
                  :style="{
                    background:
                      item.activityState == 0
                        ? '#5688ff'
                        : item.activityState == 1
                        ? '#50cf7b'
                        : item.activityState == 2
                        ? '#999999'
                        : '',
                  }"
                >
                  {{ item.activityState | activityState }}
                </div>
              </div>
              <div class="activity-name">
                {{ item.activityTitle | stringCutting(25) }}
              </div>
              <div class="time">
                <img
                  src="../../assets/images/Teaching-activities/time.png"
                  alt=""
                />
                <span>{{ item.activityStartTime }}</span>
              </div>
              <div class="position">
                <img
                  src="../../assets/images/Teaching-activities/position.png"
                  alt=""
                />
                <span>{{ item.activityPlace | stringCutting(25) }}</span>
              </div>
              <div class="mask">
                <div class="time">
                  <img
                    src="../../assets/images/Teaching-activities/time.png"
                    alt=""
                  />
                  <span>{{ item.activityStartTime }}</span>
                </div>
                <div class="position">
                  <img
                    src="../../assets/images/Teaching-activities/position.png"
                    alt=""
                  />
                  <span>{{ item.activityPlace }}</span>
                </div>
                <div class="details">
                  {{ item.activityDescription | stringCutting(115) }}
                </div>
              </div>
            </router-link>
            <ul>
              <li @click="addLike(item)">
                <i
                  class="iconfont"
                  :style="{ color: item.liked ? '#f8d214' : '' }"
                  >&#xe60e;</i
                >
                <span>点赞</span>
              </li>
              <li
                @click="
                  $router.push({
                    path: 'Poster-details',
                    query: {
                      posterDetailId: item.posterDetailId,
                      signUp: true,
                    },
                  })
                "
              >
                <i
                  class="iconfont"
                  :style="{ color: item.signUpd ? '#f8d214' : '' }"
                  >&#xe60d;</i
                >
                <span>报名</span>
              </li>
              <li>
                <i class="iconfont">&#xe72f;</i>
                <span>分享</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 暂无数据 -->
      <no-data
        v-if="Activity_Poster_list.length == 0"
        style="border-radius: 8px"
        :data="{
          img: require('../../assets/images/Index/none2.png'),
          width: '517px',
          height: '371px',
          titleList: ['抱歉！', '暂无话题'],
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
  name: "Activity_Poster_list",
  components: { headerImg, NoData },
  data() {
    return {
      activity_menu: ["全部", "线上活动", "线下活动"],
      activity_menu_index: 0,
      Activity_Poster_list: [], // 活动海报列表
      pageForm: {
        workspaceId: this.$store.getters.workspaceId,
        pageNum: 1,
        pageSize: 16,
        total: 0,
      },
    };
  },
  created() {
    this.getActivity_Poster_list(); // 活动海报
  },
  mounted() {},
  methods: {
    // 点赞
    addLike(item) {
      this.$api
        .addLike({ associatedId: item.posterDetailId, associatedType: 0 })
        .then((res) => {
          if (res.data.code == 200) {
            item.liked ? (item.liked = false) : (item.liked = true);
          }
        });
    },
    // 活动海报
    getActivity_Poster_list() {
      this.$api.Activity_Poster_list(this.pageForm).then((res) => {
        this.Activity_Poster_list = res.data.data.records;
        this.pageForm.total = res.data.data.total;
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getActivity_Poster_list(); // 活动海报
      scrollTo(0, 0);
    },
  },
  filters: {},
};
</script>
<style lang="less" scoped>
.Activity_Poster_list {
  > .container {
    > .activity-menu {
      margin-bottom: 40px;
      > ul {
        > li {
          cursor: pointer;
          position: relative;
          padding: 0 23px;
          display: inline-block;
          color: #333333;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            height: 17px;
            width: 1px;
            background-color: #e5e5e5;
          }
          &::before {
            display: none;
            content: "";
            position: absolute;
            top: 150%;
            left: 50%;
            transform: translate(-50%, 0);
            width: 32px;
            height: 4px;
            opacity: 1;
            background: #5688ff;
          }
        }
        > li:nth-child(1) {
          padding-left: 0;
          &::before {
            left: 28%;
          }
        }
        > li:nth-last-child(1) {
          &::after {
            display: none;
          }
        }
        > .activity_menu_active {
          color: #5688ff;
          &::before {
            display: block;
          }
        }
      }
    }
    > .list {
      > ul {
        > li {
          float: left;
          margin: 0 26px 31px 0;
          cursor: pointer;
          position: relative;
          width: 280px;
          height: 347px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
          box-sizing: border-box;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          > .box {
            > .cover {
              position: relative;
              height: 160px;
              > img {
                width: 100%;
                height: 100%;
              }
              > .flag {
                position: absolute;
                right: 6px;
                bottom: 6px;
                display: inline-block;
                padding: 5px 11px;
                font-size: 12px;
                font-weight: 600;
                color: #ffffff;
                background: #5688ff;
                border-radius: 2px;
              }
            }
            > .activity-name {
              padding: 9px 14px 0 14px;
              color: #000000;
              line-height: 18px;
            }
            .time,
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
                color: #a4a4a4;
              }
            }

            > .mask {
              display: none;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 9;
              width: 280px;
              height: 347px;
              background: rgba(0, 0, 0, 0.8);
              > .time,
              > .position {
                > span {
                  color: #fff;
                }
              }
              > .position {
                position: relative;
                &::after {
                  content: "";
                  position: absolute;
                  left: 14px;
                  bottom: -25px;
                  width: 26px;
                  height: 5px;
                  background: #ffffff;
                }
              }
              > .details {
                padding: 40px 14px 0 14px;
                font-size: 14px;
                color: #ffffff;
                line-height: 25px;
                letter-spacing: 2px;
              }
            }
            &:hover {
              .mask {
                display: none;
                animation: fadeInUp 0.3s;
              }
            }
          }
          > ul {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 35px;
            border-top: 1px solid #e5e5e5;
            user-select: none;
            > li {
              width: 33.33333%;
              height: 100%;
              line-height: 35px;
              float: left;
              border-right: 1px solid #e5e5e5;
              box-sizing: border-box;
              text-align: center;
              &:hover {
                > i {
                  color: #fff;
                }
              }
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
              &:hover {
                background: #5688ff;
                > span {
                  color: #fff;
                }
              }
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