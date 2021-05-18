<template>
  <div class="Game_foto_details">
    <header-img title="活动集锦详情" />
    <div class="container">
      <!-- <div class="go-back" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        活动集锦详情
      </div> -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="padding: 36px 0 33px 0"
      >
        <el-breadcrumb-item :to="{ path: '/Teaching-activities' }"
          >教研活动</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/Game-foto' }"
          >活动集锦</el-breadcrumb-item
        >
        <el-breadcrumb-item>活动集锦详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="left-box">
        <div class="title">
          {{ details.activitiesTitle }}
        </div>
        <div class="studio">
          <div class="time">
            {{ $store.getters.personalDetails.workspaceName }}
            {{ details.createTime }}
            <span>{{
              details.relatedActivitiesId ? "线上活动" : "线下活动"
            }}</span>
          </div>
        </div>
        <router-link
          tag="div"
          :to="{
            path: 'Poster-details',
            query: { posterDetailId: details.relatedActivitiesId },
          }"
          class="Related_activities"
          :style="{ cursor: 'pointer' }"
          v-if="details.relatedActivitiesId"
        >
          关联活动：{{ details.relatedActivitiesName }}
        </router-link>
        <div class="Related_activities" v-else>
          活动地点丨<span>{{ details.activitiesAddress }}</span>
        </div>
        <div class="Reading_guide">
          <div class="title">导读</div>
          <div class="details">
            {{ details.activityGuideToReading }}
          </div>
        </div>
        <div
          class="ql-snow ql-editor html-details"
          v-html="details.activitiesContent"
        ></div>
      </div>
      <div class="right-box">
        <div class="title">相关活动</div>
        <div class="list clearfix">
          <ul>
            <li
              v-for="(item, index) in Game_foto_list"
              :key="index"
              v-show="index < 3"
            >
              <div class="box" @click="seeRecommend(item)">
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import merge from "webpack-merge";
import headerImg from "../../components/Index/Teaching-activities/Header-img";
export default {
  name: "Game_foto_details",
  components: { headerImg },
  data() {
    return {
      details: {},
      Game_foto_list: [],
    };
  },
  created() {
    this.getGame_foto_details(this.$route.query.activitiesPhotoId); // 活动集锦详情
    this.getGame_foto_recommend(); // 活动集锦推荐
  },
  mounted() {},
  methods: {
    // 活动集锦详情
    getGame_foto_details(id) {
      this.$api.Game_foto_details({ activitiesPhotoId: id }).then((res) => {
        this.details = res.data.data;
      });
    },
    // 活动集锦推荐
    getGame_foto_recommend() {
      this.$api.Game_foto_recommend({ pageNum: 1, pageSize: 3 }).then((res) => {
        this.Game_foto_list = res.data.data;
      });
    },
    // 查看推荐
    seeRecommend(item) {
      this.getGame_foto_details(item.activitiesPhotoId);
      this.getGame_foto_recommend();
      this.$router.push({
        query: merge(this.$route.query, {
          activitiesPhotoId: item.activitiesPhotoId,
        }),
      });
      scrollTo(0, 0);
    },
  },
};
</script>
<style lang="less">
.Game_foto_details {
  padding-bottom: 50px;
  > .container {
    > .go-back {
      cursor: pointer;
      padding: 25px 0 21px 0;
      font-size: 24px;
      color: #2a2a2a;
    }
    > .left-box {
      float: left;
      width: 900px;
      > .title {
        font-size: 24px;
        color: #2a2a2a;
      }
      > .studio {
        > .time {
          padding: 12px 0 45px 0;
          color: #999999;
          > span {
            margin-left: 19px;
            padding: 0 8px;
            display: inline-block;
            border: 1px solid #5688ff;
            border-radius: 3px;
            width: 56px;
            font-size: 14px;
            color: #5688ff;
          }
        }
      }
      > .Related_activities {
        margin-bottom: 25px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        color: #5688ff;
        > span {
          color: #999999;
        }
      }
      > .Reading_guide {
        margin-bottom: 30px;
        padding: 31px 27px 71px 31px;
        border: 1px solid #e5e5e5;
        > .title {
          margin-bottom: 31px;
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          color: #2a2a2a;
        }
        > .details {
          position: relative;
          text-indent: 2em;
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          color: #999999;
          line-height: 25px;
          &::after {
            content: "";
            position: absolute;
            bottom: -31px;
            left: 0px;
            width: 31px;
            height: 4px;
            background: #999999;
          }
        }
      }
      .html-details {
        img {
          max-width: 100% !important;
        }
        p {
          margin-right: 20px;
          line-height: 24px;
        }
      }
    }
    > .right-box {
      float: right;
      > .title {
        font-size: 24px;
        color: #2a2a2a;
        margin-bottom: 12px;
      }
      > .list {
        > ul {
          > li {
            margin: 0 0 31px 0;
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
                //   > i {
                //     color: #fff;
                //   }
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
  }
}
</style>