<template>
  <div class="posterDetails">
    <header-img title="活动详情" />
    <div class="container">
      <!-- <el-page-header @back="goBack" content="活动详情"> </el-page-header> -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="padding: 36px 0 5px 0"
      >
        <el-breadcrumb-item :to="{ path: '/Teaching-activities' }"
          >教研活动</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/Activity_Poster_list' }"
          >活动列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>活动海报详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 顶部  -->
      <div class="main-top">
        <div class="activity-info">
          <img :src="posters.activityImgUrl" alt="" />
          <div>
            <div class="title">
              {{ posters.activityTitle }}
            </div>
            <p>{{ posters.activityShortDesc }}</p>
            <div class="organizers">
              <span>活动主办人</span>
              <span>丨{{ posters.activityCreatorName }}</span>
            </div>
          </div>
        </div>
        <div class="activity-option">
          <div class="time">
            <i class="iconfont">&#xe7a2;</i> {{ posters.activityStartTime }}
          </div>
          <div>
            <svg
              class="icon"
              aria-hidden="true"
              :style="{ fontSize: '19px', transform: 'translateX(-3px)' }"
            >
              <use xlink:href="#icon-icon-test2-copy"></use></svg
            >{{ posters.activityPlace }}
          </div>
          <div class="options">
            <div
              class="sign-btn"
              :class="{ isSign: posters.signUpd || posters.activityState == 2 }"
              @click="handleSign"
            >
              我要报名
            </div>
            <div class="activity-icons">
              <span class="fa" @click="handelLiked">
                <i
                  class="iconfont"
                  :style="{ color: posters.liked ? '#f8d214' : '' }"
                  >&#xe60e;</i
                >
                {{ posters.liked ? "已点赞" : "点赞" }}({{
                  posters.likesCount
                }})</span
              >
              <span class="fa" @click="handelComment">
                <i class="iconfont">&#xe614;</i>
                评论({{ posters.commentCount }})</span
              >
              <span class="fa"
                ><i class="el-icon el-icon-share"></i>分享到
                <span>
                  <i class="fa fa-weixin"></i>
                </span>
                <span>
                  <i class="fa fa-link"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="main">
        <div class="main-left">
          <!-- 活动内容 -->
          <div class="activity-content">
            <div class="title">
              <span>活动内容</span>
              <span @click="unfold = !unfold">
                <i class="fa fa-chevron-circle-up" v-if="unfold"></i>
                <i class="fa fa-chevron-circle-down" v-else></i>
                {{ !unfold ? "展开" : "收起" }}</span
              >
            </div>
            <div class="info">
              <div class="activity-organizers">
                活动主办人 | {{ posters.activityCreatorName }}
              </div>
              <div v-html="posters.activityDescription"></div>
              <!-- <div class="activity-custom">活动嘉宾丨汪娟 蒋涛 何勇 常平</div> -->
              <p v-show="unfold">{{ posters.activityShortDesc }}</p>
            </div>
          </div>
          <!-- 活动标签 -->
          <div class="activity-label">
            <div class="title">活动标签</div>
            <ul>
              <li v-for="(item, index) in posters.activityTags" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <!-- 这些人想参加 -->
          <div class="activity-members">
            <div class="title">已报名</div>
            <ul>
              <li v-for="(item, index) in members" :key="index">
                <img :src="item.user.avatar" alt="" />
                <p>{{ item.createTime | time }}</p>
              </li>
            </ul>
          </div>
          <!-- 您可能感兴趣的 -->
          <div class="activity-interest">
            <div class="title">您可能感兴趣的</div>
            <ul v-if="interest">
              <li
                v-for="(item, index) in interest"
                :key="index"
                @click="seeRecommend(item)"
              >
                <img :src="item.activityImgUrl" alt="" />
                <p>{{ item.activityTitle }}</p>
              </li>
              <li class="pick"></li>
            </ul>
          </div>
          <!-- 用户评论 -->
          <Comment
            :focus="focus"
            @back="back($event)"
            @refresh="refresh($event)"
            :key="key"
          />
        </div>
        <div class="main-right">
          <!-- 推荐海报 -->
          <div
            v-if="interest.length > 0"
            class="recommended-Poster"
            @click="seeRecommend(interest[0])"
          >
            <div class="img-box">
              <img :src="interest[0].activityImgUrl" alt="" />
              <div>{{ interest[0].activityState | activityState }}</div>
            </div>
            <div class="title">
              {{ interest[0].activityTitle }}
            </div>
            <div class="time">
              <i class="iconfont">&#xe7a2;</i> {{ interest[0].createTime }}
            </div>
          </div>
          <div v-else class="no-recommendation">
            <img
              src="../../assets/images/Activity-details/no_recommend.png"
              alt=""
            />
            <p>暂无推荐</p>
          </div>
          <!-- 活动主办方 -->
          <div class="activity-organizers">
            <div class="title">活动主办方</div>
            <div class="info">
              <div>活动主办人丨{{ posters.activityCreatorName }}</div>
              <p>{{ posters.activityShortDesc }}</p>
            </div>
          </div>
          <!-- 微信扫一扫 -->
          <div class="weixin">
            <img src="../../assets/images/study/weixin.png" alt="" />
            <div>
              <div>微信扫一扫</div>
              <div>分享此活动到朋友圈</div>
            </div>
          </div>
          <!-- 日历 -->
          <CalendarComponent class="calendar" />
        </div>
      </div>
    </div>
    <el-dialog title="活动报名" :visible.sync="dialogVisible" width="1250px"
      ><ActivitySignUp @saveSignUp="saveSignUp" />
    </el-dialog>
  </div>
</template>
<script>
import Comment from "../../components/Activity-comments/Post-Comments.vue";
import headerImg from "../../components/Index/Teaching-activities/Header-img";
import CalendarComponent from "../CalendarComponent";
import ActivitySignUp from "./Activity-sign-up";
import merge from "webpack-merge";
export default {
  name: "About",
  components: {
    Comment,
    CalendarComponent,
    headerImg,
    ActivitySignUp,
  },
  data() {
    return {
      labels: [],
      posters: {},
      members: [],
      interest: [],
      focus: false,
      dialogVisible: false,
      // 海报点赞/取消参数
      PosterLikedParameter: {
        associatedId: "", //海报id
        workspaceId: this.$store.getters.workspaceId,
        associatedType: 0,
      },

      // 是否展开
      unfold: false,
      //评论key刷新
      key: 1,
    };
  },
  created() {
    this.PosterLikedParameter.associatedId = this.$route.query.posterDetailId;
    this.getActivityDetail();
    if (this.$route.query.signUp) {
      this.dialogVisible = this.$route.query.signUp;
    }
  },
  mounted() {
    this.recommendActivity();
    this.ActivitySignUpPeople();
  },
  methods: {
    goBack() {
      console.log("go back");
    },
	saveSignUp(){//报名成功后刷新页面
		this.ActivitySignUpPeople()
	},
    // 获取海报详情
    getActivityDetail() {
      this.$api
        .getActivityDetail({
          posterDetailId: this.PosterLikedParameter.associatedId, //海报id
        })
        .then((res) => {
          if (res.data.code == 200) {
            if (res.data.data.activityTags) {
              res.data.data.activityTags = res.data.data.activityTags.split(
                ","
              );
            }

            this.posters = res.data.data;
            console.log(this.posters);
          }
        });
    },
    // 查询海报已报名人
    ActivitySignUpPeople() {
      this.$api
        .ActivitySignUpPeople({
          activityId: this.PosterLikedParameter.associatedId, //海报id
          pageSize: 7,
          pageNum: 1,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.members = res.data.data.records;
          }
        });
    },
    // 推荐海报
    recommendActivity() {
      let data = {
        workspaceId: this.$store.getters.workspaceId,
        posterDetailId: this.PosterLikedParameter.associatedId, //海报id
        pageSize: 8,
      };
      this.$api.recommendActivity(data).then((res) => {
        if (res.data.code == 200) {
          this.interest = res.data.data.records;
        }
      });
    },
    // 海报点赞
    handelLiked() {
      this.$api.ActivityThumbUp(this.PosterLikedParameter).then((res) => {
        if (res.data.code == 200) {
          this.getActivityDetail();
        }
      });
    },
    // 点击评论
    handelComment() {
      this.focus = true;
    },
    // 失去焦点
    async back(item) {
      if (item) this.focus = item;
    },
    // 查看推荐
    seeRecommend(item) {
      this.PosterLikedParameter.associatedId = item.posterDetailId;
      this.key += 1;
      this.getActivityDetail();
      this.recommendActivity();
      this.$router.push({
        query: merge(this.$route.query, {
          posterDetailId: item.posterDetailId,
        }),
      });
      scrollTo(0, 0);
    },
    // 点击报名
    handleSign() {
      if (!this.posters.signUpd && this.posters.activityState !== 2) {
        this.dialogVisible = true;
      } else {
        if (this.posters.signUpd) {
          this.$notify({
            title: "提示",
            message: "您已报名",
            type: "warning",
          });
        }
        if (this.posters.activityState == 2) {
          this.$notify({
            title: "提示",
            message: "该活动已结束",
            type: "warning",
          });
        }
      }
    },
    // 评论后刷新话题详情
    async refresh() {
      this.getTopic();
    },
  },
  filters: {
    time(val) {
      return `${val.substring(0, 10)}`;
    },
    activityState(val) {
      return `${val == 0 ? "预告" : val == 1 ? "进行中" : "历史"}`;
    },
  },
  watch: {
    // route(to, from) {
    //   console.log(to,from)
    //   if (to.sign) {
    //     this.dialogVisible = to.signUp;
    //   }
    // },
  },
};
</script>
<style lang="less" scoped>
.posterDetails {
  background: #f6f6f6;
  > .container {
    > .el-page-header {
      padding-top: 25px;
    }
    > .el-breadcrumb {
      margin-top: 15px;
    }
    .main-top {
      // height: 466px;
      background: #ffffff;
      border-radius: 8px;
      margin-top: 55px;
      > .activity-info {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        padding-top: 31px;
        margin: 0 79px 0 37px;
        border-bottom: 1px solid #e5e5e5;
        > img {
          width: 473px;
          height: 266px;
          border-radius: 8px;
          position: relative;
          left: -67px;
          top: -60px;
        }
        > div {
          margin-left: -30px;
          > .title {
            font-size: 24px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            line-height: 24px;
          }
          > p {
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
            line-height: 25px;
            margin: 28px 0 18px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
          }
          > .organizers {
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: left;
            color: #2a2725;
          }
        }
      }
      > .activity-option {
        padding: 25px 79px 37px 37px;
        > .time {
          margin-bottom: 12px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #5688ff;
          margin-left: -2px;
          > i {
            width: 15px;
            height: 19px;
            margin-right: -1px;
          }
        }
        > .address {
          opacity: 1;
          font-size: 16px;
          font-weight: 400;
          text-align: left;
          color: #a4a4a4;
          display: block;
          margin: 12px 0 34px 0;
          &::before {
            content: "\f041";
            width: 15px;
            height: 19px;
            margin-right: 8px;
          }
        }
        > .options {
          margin-top: 24px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          > .isSign {
            background: #6e7074;
          }
          > .sign-btn {
            background: #5688ff;
            border-radius: 23px;
            opacity: 1;
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            padding: 10px 29px;
            margin-left: -15px;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
              background: #2565fa;
            }
          }
          > .activity-icons {
            font-size: 12px;
            font-weight: 400;
            text-align: left;
            color: #a4a4a4;
            display: flex;
            align-items: center;
            > span {
              margin-left: 28px;
            }
            > span:first-child {
              cursor: pointer;
            }
            > span:nth-child(2) {
              cursor: pointer;
            }
            > span:last-child {
				.el-icon{
					font-size: 16px;
				}
              &::before {
                // content: "\f064";
                margin-right: 4px;
                font-size: 16px;
              }
              display: flex;
              align-items: center;
              > span:nth-child(2) {
                background: #09bb07;
                width: 30px;
                height: 30px;
                display: block;
                border-radius: 50%;
                text-align: center;
                line-height: 31px;
                margin: 0 6px 0 11px;
                cursor: pointer;
                > i {
                  font-size: 16px;
                  color: #fff;
                }
              }
              > span:last-child {
                background: #000;
                width: 30px;
                height: 30px;
                display: block;
                border-radius: 50%;
                text-align: center;
                line-height: 34px;
                cursor: pointer;
                > i {
                  font-size: 16px;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    .main {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      > .main-left {
        width: 900px;
        /***
        *活动内容
        */
        > .activity-content {
          > .title {
            display: flex;
            justify-content: space-between;
            margin: 32px 0 14px 0;
            align-items: center;
            > span:first-child {
              font-size: 20px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
            }
            > span:last-child {
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #a4a4a4;
              cursor: pointer;
            }
          }
          > .info {
            background: #fff;
            padding: 49px 45px 39px 45px;
            border-radius: 8px;
            > div {
              margin-bottom: 15px;
            }
            > div:nth-child(2) {
              text-indent: 2em;
              // line-height: 24px;
              img {
                width: 100%;
              }
            }
            > .activity-organizers {
              font-size: 16px;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: 700;
              text-align: left;
              color: #333333;
            }
            > .activity-custom {
              font-size: 16px;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: 700;
              text-align: left;
              color: #333333;
            }
            > p {
              font-size: 14px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 24px;
            }
          }
        }
        /***
        *活动标签
        */
        > .activity-label {
          > .title {
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin: 30px 0 15px 0;
          }
          > ul {
            background: #ffffff;
            border-radius: 8px;
            padding: 40px 31px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            > li {
              background: #ffffff;
              border: 1px solid rgba(164, 164, 164, 0.33);
              border-radius: 26px;
              font-size: 20px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: center;
              color: #000000;
              margin-right: 54px;
              height: 49px;
              line-height: 49px;
              padding: 0 30px;
              cursor: pointer;
            }
          }
        }
        /***
        *这些人想参加 
        */
        > .activity-members {
          > .title {
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin: 30px 0 15px 0;
          }
          > ul {
            background: #ffffff;
            border-radius: 8px;
            padding: 39px 55px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            > li {
              margin-right: 51px;
              > img {
                width: 69px;
                height: 69px;
                border-radius: 50%;
              }
              > p {
                font-size: 10px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: center;
                color: #242424;
              }
            }
          }
        }
        /***
        *您可能感兴趣的 
        */
        > .activity-interest {
          > .title {
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin: 30px 0 15px 0;
          }
          > ul {
            background: #ffffff;
            border-radius: 8px;
            padding: 32px 30px;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;
            &::after {
              content: "";
              width: 195px;
            }
            > li {
              margin-bottom: 21px;
              cursor: pointer;
              > img {
                width: 195px;
                height: 115px;
                border-radius: 8px;
                transition: all 0.3s ease;
                &:hover {
                  box-shadow: 0 10px 30px 0 rgb(202, 202, 202);
                }
              }
              > p {
                width: 195px;
                font-size: 16px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: left;
                color: #333333;
                line-height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
            }
            .pick {
              width: 195px;
              overflow: hidden;
              border: 1px solid transparent;
            }
          }
        }
      }
      > .main-right {
        width: 280px;
        margin-top: 72px;
        margin-left: 20px;
        > .recommended-Poster {
          width: 280px;
          height: 264px;
          background: #fff;
          border-radius: 8px;
          cursor: pointer;
          > .img-box {
            position: relative;
            > img {
              width: 280px;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
              height: 160px;
            }
            > div {
              position: absolute;
              bottom: 10px;
              right: 10px;
              width: 45px;
              height: 20px;
              background: #5688ff;
              border-radius: 2px;
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
              font-weight: 600;
              text-align: center;
              color: #ffffff;
              line-height: 20px;
            }
          }
          > .title {
            opacity: 1;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin: 9px 20px 15px 14px;
          }
          > .time {
            margin-left: 14px;
            font-size: 16px;
            font-weight: 400;
            text-align: left;
            color: #5688ff;
          }
        }
        > .no-recommendation {
          > img {
            width: 290px;
            height: 180px;
          }
          > p {
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            line-height: 24px;
            color: #9e9d9d;
          }
        }
        > .activity-organizers {
          > .title {
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin: 36px 0 19px 0;
          }
          > .info {
            background: #ffffff;
            border-radius: 8px;
            padding: 25px 21px 14px 17px;
            > div {
              margin-bottom: 20px;
              font-size: 16px;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: 700;
              text-align: left;
              color: #000000;
            }
            > p {
              font-size: 14px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #a4a4a4;
              line-height: 25px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 9;
              -webkit-box-orient: vertical;
            }
          }
        }
        > .weixin {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          padding: 5px 28px 11px 20px;
          align-items: center;
          background: #fff;
          margin-top: 20px;
          border-radius: 8px;
          > img {
            width: 86px;
            height: 88px;
          }
          > div {
            margin-left: 20px;
            > div:first-child {
              font-size: 24px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
              letter-spacing: 0px;
            }
            > div:last-child {
              font-size: 14px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
              margin-top: 4px;
            }
          }
        }
        > .calendar {
          margin-top: 23px;
          border-radius: 8px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>