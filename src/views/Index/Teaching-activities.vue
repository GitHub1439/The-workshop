<template>
  <div class="Teaching-activities">
    <!-- <div class="none-box">
      <img src="../../assets/images/Index/none3.png" alt="" />
      <p>功能开发中，敬请期待...</p>
    </div> -->
    <div class="column-title">
      活动海报
      <router-link tag="div" to="Activity_Poster_list" class="more">
        更多
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
    <div class="activity-list clearfix">
      <ul v-if="Activity_Poster_list.length > 0">
        <li v-for="(item, index) in Activity_Poster_list" :key="index">
          <router-link
            tag="div"
            class="box"
            :to="{
              path: 'Poster-details',
              query: { posterDetailId: item.posterDetailId },
            }"
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
                  src="../../assets/images/Teaching-activities/time-f.png"
                  alt=""
                />
                <span>{{ item.activityStartTime }}</span>
              </div>
              <div class="position">
                <img
                  src="../../assets/images/Teaching-activities/position-f.png"
                  alt=""
                />
                <span>{{ item.activityPlace }}</span>
              </div>
              <div class="details">
                {{ item.activityShortDesc | stringCutting(115) }}
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
            <li @click="signUp(item)">
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
      <!-- 暂无数据 -->
      <no-data
        v-else
        :style="{ borderRadius: '8px' }"
        :data="{
          img: require('../../assets/images/Index/none2.png'),
          width: '324px',
          height: '232px',
          titleList: ['抱歉！', '暂无活动海报'],
        }"
      />
    </div>
    <div class="column-title">
      话题讨论
      <router-link tag="div" to="Topic-discussion-list" class="more">
        更多
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
    <div class="Topic-discussion">
      <div class="hot-topic">
        <div class="topic-title"># 热门话题发布</div>
        <div class="topic-time">共同探讨</div>
        <div class="topic-publisher">名师汇聚丨共同探讨丨智慧大聚合</div>
        <div class="topic-topic">
          <i class="iconfont">&#xe614;</i>
          <span>#快点来发布话题讨论吧~</span>
        </div>
        <div class="title">
          话题
          <br />
          讨论
        </div>
        <div
          class="btn"
          v-if="$store.getters.personalDetails.workspaceMember"
          @click="$fun.openPage('Publish-topic')"
        >
          # 发布话题
          <i class="el-icon-edit"></i>
        </div>
      </div>
      <div class="topic-list clearfix">
        <ul v-if="Topic_list.length > 0">
          <router-link
            tag="li"
            :to="{ path: 'Topic-discussion-details', query: { id: item.id } }"
            v-for="(item, index) in Topic_list"
            :key="index"
            :style="`border-right: ${index == 2 || index == 5 ? 'none' : ''}`"
          >
            <div class="topic-title">
              <span>#</span>
              {{ item.topicName | stringCutting(27) }}
            </div>
            <div class="topic-details">
              {{ item.topicDetails | stringCutting(30) }}
            </div>
            <div class="topic-publisher">
              <img :src="item.avatar" alt="" />
              <span>{{ item.nickName }}</span>
              <div class="flag">
                <img
                  v-if="index == 0"
                  src="../../assets/images/Teaching-activities/hot.png"
                  alt=""
                />
                <img
                  v-else-if="item.labelRecommendation == 1"
                  src="../../assets/images/Teaching-activities/new.png"
                  alt=""
                />
                <img
                  v-else-if="item.labelRecommendation == 2"
                  src="../../assets/images/Teaching-activities/recommendation.png"
                  alt=""
                />
              </div>
            </div>
          </router-link>
        </ul>
        <!-- 暂无数据 -->
        <no-data
          v-else
          :data="{
            img: require('../../assets/images/Index/none2.png'),
            width: '324px',
            height: '232px',
            titleList: ['抱歉！', '暂无话题讨论'],
          }"
        />
      </div>
    </div>
    <div class="column-title">
      活动集锦
      <router-link tag="div" to="Game-foto" class="more">
        更多
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
    <div class="Achievement-display">
      <div class="box-border" v-if="$store.getters.lwStudio"></div>
      <el-carousel
        :interval="2000"
        arrow="always"
        v-if="Game_foto_list.length > 0"
      >
        <el-carousel-item v-for="(item, index) in Game_foto_list" :key="index">
          <ul>
            <router-link
              tag="li"
              :to="{
                path: 'Game_foto_details',
                query: { activitiesPhotoId: item2.activitiesPhotoId },
              }"
              v-for="(item2, index2) in item"
              :key="index2"
            >
              <div class="img_box">
                <img :src="item2.activitiesImage" alt="" />
                <div class="box1"></div>
                <div class="box2"></div>
              </div>
              <div class="title">
                {{ item2.activitiesTitle | stringCutting(30) }}
              </div>
              <div class="position">
                <img
                  src="../../assets/images/Teaching-activities/position.png"
                  alt=""
                />
                <span>{{
                  item2.relatedActivitiesId
                    ? "线上活动"
                    : item2.activitiesAddress | stringCutting(13)
                }}</span>
              </div>
            </router-link>
          </ul>
        </el-carousel-item>
      </el-carousel>
      <!-- 暂无数据 -->
      <no-data
        v-else
        :style="{ borderRadius: '8px' }"
        :data="{
          img: require('../../assets/images/Index/none2.png'),
          width: '324px',
          height: '232px',
          titleList: ['抱歉！', '暂无活动集锦'],
        }"
      />
    </div>
  </div>
</template>
<script>
import NoData from "../../components/No_data";
export default {
  name: "Teaching-activities",
  components: { NoData },
  data() {
    return {
      Activity_Poster_list: [], // 活动海报列表
      Topic_list: [], // 话题列表
      Game_foto_list: [], // 活动集锦列表
    };
  },
  created() {
    this.getActivity_Poster_list(); // 活动海报
    this.getTopic_list(); // 话题
    this.getGame_foto(); // 活动集锦
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
    // 报名
    signUp(item) {
      if (!item.signUpd) {
        this.$router.push({
          path: "Poster-details",
          query: {
            posterDetailId: item.posterDetailId,
            signUp: true,
          },
        });
      }
    },
    // 活动海报
    getActivity_Poster_list() {
      this.$api
        .Activity_Poster_list({
          workspaceId: this.$store.getters.workspaceId,
          pageNum: 1,
          pageSize: 6,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.Activity_Poster_list = res.data.data.records;
          }
        });
    },
    // 话题
    getTopic_list() {
      this.$api
        .Topic_list({
          workspaceId: this.$store.getters.workspaceId,
          pageNum: 1,
          pageSize: 6,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.Topic_list = res.data.data.rows;
          }
        });
    },
    // 活动集锦
    getGame_foto() {
      this.$api
        .Game_foto({ workspaceId: this.$store.getters.workspaceId })
        .then((res) => {
          if (res.data.code == 200) {
            this.Game_foto_list = this.group(res.data.data.records, 3);
          }
        });
    },
    // 切割数组
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
  },
  filters: {},
};
</script>
<style lang="less">
.Teaching-activities {
  margin-top: 20px;
  min-height: 637px;
  // background-color: #fff;
  .column-title {
    padding: 24px 0 16px 0;
    font-size: 24px;
    font-weight: 700;
    color: #2a2a2a;
    > .more {
      font-weight: 400;
      cursor: pointer;
      float: right;
      font-size: 16px;
      color: #2a2725;
      transform: translateY(8px);
    }
  }
  // 活动列表
  > .activity-list {
    position: relative;
    min-height: 200px;
    > ul {
      > li {
        float: left;
        margin: 0 30px 31px 0;
        cursor: pointer;
        position: relative;
        width: 280px;
        height: 347px;
        background: #ffffff;
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
              > img {
                width: 16px;
                height: 16px;
              }
              > span {
                color: #fff;
              }
            }
            > .position {
              > img {
                width: 15px;
                height: 19px;
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
              display: block;
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
      > li:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  // 话题讨论
  > .Topic-discussion {
    > .hot-topic {
      position: relative;
      padding: 27px 0 0 31px;
      box-sizing: border-box;
      height: 261px;
      background: url("../../assets/images/Teaching-activities/bg.png")
        no-repeat;
      background-size: 100% 100%;
      > div {
        color: #fff;
      }
      > .topic-title {
        margin-bottom: 28px;
        font-size: 24px;
        font-weight: 600;
      }
      > .topic-time {
        position: relative;
        font-size: 20px;
        font-weight: 700;
        &::after {
          content: "";
          position: absolute;
          bottom: -15px;
          left: 0;
          width: 32px;
          height: 5px;
          background: #ffffff;
        }
      }
      > .topic-publisher {
        padding: 27px 0 32px 0;
        font-size: 14px;
      }
      > .topic-topic {
        font-size: 14px;
        line-height: 22px;
        > i {
          margin-right: 5px;
          font-size: 22px;
          vertical-align: middle;
        }
      }
      > .title {
        position: absolute;
        top: 27px;
        right: 95px;
        width: 125px;
        height: 125px;
        border: 2px solid #ffffff;
        line-height: 62.5px;
        font-size: 40px;
        font-weight: 700;
        text-align: center;
      }
      > .btn {
        cursor: pointer;
        position: absolute;
        top: 182px;
        right: 105px;
        background: #ffffff;
        border-radius: 17px;
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 600;
        color: #b36969;
      }
    }
    > .topic-list {
      border-radius: 0px 0px 8px 8px;
      overflow: hidden;
      > ul {
        > li {
          position: relative;
          cursor: pointer;
          float: left;
          width: 33.33333%;
          height: 186px;
          background: #fff;
          padding: 40px 25px 0 49px;
          box-sizing: border-box;
          border: 1px solid rgba(229, 229, 229, 0.31);
          border-top: none;
          border-left: none;
          > .topic-title {
            position: relative;
            font-size: 14px;
            line-height: 21px;
            > span {
              position: absolute;
              left: -20px;
              font-size: 22px;
              color: #5688ff;
            }
          }
          > .topic-details {
            position: absolute;
            top: 90px;
            width: 225px;
            line-height: 16px;
            font-size: 12px;
            color: #a4a4a4;
          }
          > .topic-publisher {
            position: absolute;
            top: 135px;
            width: 225px;
            > img {
              margin-right: 7px;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              vertical-align: middle;
            }
            > span {
              font-size: 12px;
              color: #333333;
            }
            > .flag {
              float: right;
              width: 23px;
              height: 23px;
              > img {
                width: 100%;
                height: 100%;
              }
            }
          }
          &:hover {
            background: #f6f6f6;
          }
        }
        > .li:nth-last-child(1),
        > .li:nth-last-child(2),
        > .li:nth-last-child(3) {
          border-bottom: none;
        }
      }
    }
  }
  // 活动集锦
  > .Achievement-display {
    position: relative;
    min-height: 340px;
    background: #ffffff;
    border-radius: 8px;
    .el-carousel {
      height: 340px;
      border-radius: 8px;
      overflow: hidden;
      .el-carousel__container {
        height: 100%;
        .el-carousel__item {
          padding: 31px 51px 0 51px;
          box-sizing: border-box;
          ul {
            > li {
              float: left;
              margin-right: 24px;
              width: 250px;
              > .img_box {
                position: relative;
                > img {
                  position: relative;
                  z-index: 9;
                  width: 100%;
                  cursor: pointer;
                  height: 190px;
                  border-radius: 2px;
                }
                > div {
                  position: absolute;
                  width: 100%;
                  height: 190px;
                  border: 0.5px solid rgba(153, 153, 153, 0.4);
                  background-color: #fff;
                }
                > .box1 {
                  z-index: 2;
                  top: -3px;
                  right: -3px;
                }
                > .box2 {
                  top: -6px;
                  right: -6px;
                }
              }
              > .title {
                padding: 15px 0;
              }
              > .position {
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
            }
            > li:nth-child(3n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  > .none-box {
    margin: 0 auto;
    height: 590px;
    text-align: center;
    padding-top: 223px;
    height: 100%;
    > img {
      margin: 0 auto 34px auto;
      display: block;
      width: 186px;
      height: 69px;
    }
    > p {
      font-size: 18px;
      color: #a8a8a8;
    }
  }
}
</style>