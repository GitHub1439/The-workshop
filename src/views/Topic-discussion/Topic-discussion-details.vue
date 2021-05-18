<template>
  <div class="topicDetails">
    <header-img title="话题详情" />
    <div class="container">
      <!-- <el-page-header @back="goBack" content="话题讨论"> </el-page-header> -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="padding: 36px 0 10px 0"
      >
        <el-breadcrumb-item :to="{ path: '/Teaching-activities' }"
          >教研活动</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/Topic-discussion-list' }"
          >话题列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>话题详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
        <div class="main-left">
          <!-- 话题简介 -->
          <div class="topic-info">
            <img
              src="../../assets/images/Teaching-activities/topicIcon.png"
              alt=""
            />
            <div class="topic-content">
              <div class="title">{{ topics.topicName }}</div>
              <p>{{ topics.topicDetails }}</p>
              <ul>
                <li class="fa" @click="handelLiked">
                  <i
                    class="iconfont"
                    :style="{
                      color: topics.topicLikeChoose == 1 ? '#f8d214' : '',
                    }"
                    >&#xe60e;</i
                  >
                  {{ topics.topicLikeChoose == 1 ? "已点赞" : "点赞" }}({{
                    topics.likenum
                  }})
                </li>
                <li class="fa" @click="handelComment">
                  <i class="iconfont">&#xe614;</i>
                  评论({{ topics.discussnum }})
                </li>
              </ul>
              <div class="likedPeople" v-if="topics.avatarList">
                <img
                  :src="item"
                  alt=""
                  v-for="(item, index) in topics.avatarList"
                  :key="index"
                  :style="{
                    transform: `translate(-${index * 8}px, 0)`,
                  }"
                />
                等{{ topics.topicParticipationNumber }}人已点赞
              </div>
            </div>
          </div>
          <!-- 用户评论 -->
          <Comment
            :focus="focus"
            @back="back($event)"
            @refresh="refresh($event)"
          />
        </div>
        <div class="main-right">
          <!-- 参与成员 -->
          <div class="members-participate">
            <div class="title">参与成员</div>

            <ul>
              <li v-for="(item, index) in members" :key="index">
                <div>
                  <img :src="item.avatar" alt="" />
                  <div>{{ item.nickName }}</div>
                </div>

                <p>{{ item.recentlyVisited }}</p>
              </li>
            </ul>
            <span class="fa left-arrow" @click="handelLeft"></span>
            <span class="fa right-arrow" @click="handelRight"></span>
            <div class="member-page">
              {{ tableForm.pageNum }}/{{
                Math.ceil(total / tableForm.pageSize)
              }}
            </div>
          </div>
          <!-- 推荐话题 -->
          <div class="list">
            <div class="title">相关话题</div>
            <ul>
              <li
                v-for="(item, index) in TopicList"
                :key="index"
                @click="
                  $fun.openPage('Topic-discussion-details', `?id=${item.id}`)
                "
              >
                <div class="box">
                  <div class="topic-name">
                    <i class="iconfont">&#xe654;</i>
                    <span>
                      话题主题丨{{ item.topicName | stringCutting(25) }}
                    </span>
                  </div>
                  <div class="topic-details">
                    {{ item.topicDetails | stringCutting(60) }}
                  </div>
                  <div class="time">发起时间丨{{ item.createTime }}</div>
                  <!-- <div class="user">
                    <ul>
                      <li
                        v-for="(item2, index2) in item.avatarList"
                        :key="index2"
                        :style="{
                          transform: `translate(-${index2 * 8}px, 0)`,
                        }"
                      >
                        <img :src="item2" alt="" />
                      </li>
                    </ul>
                    <span>等{{ item.topicParticipationNumber }}人已参与</span>
                  </div> -->
                </div>
                <ul>
                  <li>
                    <i class="iconfont">&#xe60e;</i>
                    <span>点赞（{{ item.likenum }}）</span>
                  </li>
                  <li>
                    <i class="iconfont">&#xe614;</i>
                    <span>评论（{{ item.discussnum }}）</span>
                  </li>
                </ul>
                <div class="cover">
                  <div class="topic-name">
                    话题主题丨{{ item.topicName | stringCutting(25) }}
                  </div>
                  <img
                    src="../../assets/images/Topic-discussion-list/spot.png"
                    alt=""
                  />
                  <div class="btn">
                    <div>
                      <i class="el-icon-edit"></i>
                      参与话题
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Comment from "../../components/Activity-comments/Details-Comments";
import headerImg from "../../components/Index/Teaching-activities/Header-img";
export default {
  name: "About",
  components: {
    Comment,
    headerImg,
  },
  data() {
    return {
      // 话题详情
      topics: {},
      // 参与人员总数
      total: 100,
      // 参与人员当前页
      current: 1,
      // 参与人员列表
      members: [],
      // 推荐话题列表
      TopicList: [],
      // 点击评论使输入框获取焦点
      focus: false,
      // 参与人员页码
      tableForm: {
        pageSize: 12,
        pageNum: 1,
        topicId: this.$route.query.id,
      },
      // 话题点赞/取消参数
      topicLikedParameter: {
        topicId: this.$route.query.id,
        workspaceId: this.$store.getters.workspaceId,
        type: 1,
      },
    };
  },
  created() {},
  mounted() {
    this.getTopic();
    this.getTopicmember();
    this.getTopicList();
  },

  methods: {
    goBack() {
      console.log("go back");
    },
    // 获取话题详情
    getTopic() {
      this.$api
        .getTopicDetails({ topicId: this.$route.query.id })
        .then((res) => {
          if (res.data.code == 200) {
            this.topics = res.data.data;
          }
        });
    },
    // 获取参与人员
    getTopicmember() {
      this.$api.getTopicmember(this.tableForm).then((res) => {
        if (res.data.code == 200) {
          this.members = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    },
    // 参与成员列表左指示箭头
    handelLeft() {
      if (this.tableForm.pageNum > 1) {
        this.tableForm.pageNum--;
        this.getTopicmember();
      }
    },
    // 参与成员列表右指示箭头
    handelRight() {
      if (this.tableForm.pageNum < this.total / this.tableForm.pageSize) {
        this.tableForm.pageNum++;
        this.getTopicmember();
      }
    },
    // 获取推荐话题
    getTopicList() {
      this.$api
        .getTopicList({
          pageSize: 2,
          topicId: this.$route.query.id,
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.TopicList = res.data.data.rows;
          }
        });
    },
    // 点赞按钮
    handelLiked() {
      if (this.topics.topicLikeChoose == 1) {
        this.$api.TopicCancelThumbUp(this.topicLikedParameter).then((res) => {
          if (res.data.code == 200) {
            this.getTopic();
            this.getTopicmember();
          }
        });
      } else {
        this.$api.TopicThumbUp(this.topicLikedParameter).then((res) => {
          if (res.data.code == 200) {
            this.getTopicmember();
            this.getTopic();
          }
        });
      }
    },
    handelComment() {
      this.focus = true;
    },
    // 失去焦点
    async back(item) {
      this.focus = item;
    },
    // 评论后刷新话题详情
    async refresh() {
      this.getTopic();
      this.getTopicmember();
    },
  },
};
</script>
<style lang="less" scoped>
.topicDetails {
  background: #f6f6f6;
  > .container {
    > .el-page-header {
      padding-top: 25px;
    }
    .main {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      > .main-left {
        width: 900px;
        margin-top: 31px;
        /*
        *话题简介
        */
        > .topic-info {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          padding: 34px 43px;
          background: #fff;
          border-radius: 8px;
          > img {
            width: 59px;
            height: 59px;
            vertical-align: middle;
          }
          > .topic-content {
            margin-left: 21px;
            > .title {
              font-size: 24px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
              line-height: 22px;
              line-height: 34px;
            }
            > p {
              font-size: 16px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #999999;
              line-height: 25px;
              margin: 12px 0 33px 0;
            }
            > ul {
              height: 51px;
              background: #f6f6f6;
              border: 1px solid #e5e5e5;
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-start;
              align-items: center;
              > li {
                width: 369px;
                text-align: center;
                line-height: 51px;
                font-size: 12px;
                font-weight: 400;
                color: #a4a4a4;
                cursor: pointer;
              }
              > li:first-child {
                border-right: 1px solid #e5e5e5;
              }
              > li:last-child {
              }
            }
            > .likedPeople {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #a4a4a4;
              margin-top: 23px;
              > img {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                vertical-align: middle;
              }
            }
          }
        }
      }
      > .main-right {
        width: 280px;
        margin-top: 31px;
        margin-left: 20px;
        > .members-participate {
          background: #fff;
          position: relative;
          border-radius: 8px;
          > .title {
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #2a2a2a;
            border-bottom: 1px solid #e5e5e5;
            padding: 15px 0 14px 14px;
          }
          > ul {
            margin: 18px 14px;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            &::after {
              content: "";
              width: 69px;
            }
            > li {
              margin-bottom: 10px;
              > div {
                position: relative;
                text-align: center;
                /* 头像 */
                > img {
                  width: 69px;
                  height: 69px;
                  border-radius: 50%;
                }
                /**姓名 */
                > div {
                  text-align: center;
                  position: absolute;
                  bottom: 10px;
                  margin-left: 20px;
                  font-size: 10px;
                  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                  font-weight: 400;
                  text-align: center;
                  color: #ffffff;
                }
              }
              /*时间 */
              > p {
                font-size: 10px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: left;
                color: #242424;
              }
            }
          }
          > .left-arrow {
            position: absolute;
            top: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0;
            &::before {
              content: "\f053";
              width: 50px;
              height: 50px;
              color: rgb(170, 170, 170);
            }
          }
          &:hover {
            > .left-arrow {
              opacity: 1;
            }
            > .right-arrow {
              opacity: 1;
            }
          }
          > .member-page {
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            color: #242424;
            padding-bottom: 10px;
          }
          > .right-arrow {
            position: absolute;
            top: 50%;
            right: 0;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0;
            &::before {
              content: "\f054";
              width: 50px;
              height: 50px;
              color: rgb(170, 170, 170);
            }
          }
        }
        > .list {
          > .title {
            padding-top: 20px;
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            color: #2a2a2a;
          }
          > ul {
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            > li {
              float: left;
              margin-top: 10px;
              cursor: pointer;
              position: relative;
              width: 280px;
              height: 310px;
              background: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-sizing: border-box;
              background: url("../../assets/images/Topic-discussion-list/bg-01.png")
                no-repeat;
              background-size: 100% 100%;
              &:hover {
                > .cover {
                  display: block;
                  animation: fadeInUp 0.3s;
                }
              }
              > .box {
                padding: 28px 28px 0 28px;
                > .topic-name {
                  min-height: 44px;
                  padding-left: 44px;
                  position: relative;
                  margin-bottom: 17px;
                  font-weight: 700;
                  line-height: 22px;
                  > i {
                    position: absolute;
                    top: 11px;
                    left: 0;
                    font-size: 37px;
                    color: #5688ff;
                  }
                  > span {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                  }
                }
                > .topic-details {
                  font-size: 14px;
                  color: #333333;
                  line-height: 22px;
                }
                > .time {
                  padding: 12px 0 15px 0;
                  font-size: 12px;
                  color: #3270f7;
                }
                > .user {
                  > ul {
                    display: inline-block;
                    > li {
                      width: 25px;
                      height: 25px;
                      display: inline-block;
                      border: 1px solid #fff;
                      border-radius: 50%;
                      overflow: hidden;
                      box-sizing: border-box;
                      > img {
                        width: 100%;
                        height: 100%;
                      }
                    }
                  }
                  > span {
                    display: inline-block;
                    transform: translateY(-7px);
                    font-size: 12px;
                    color: #a4a4a4;
                  }
                }
              }
              > ul {
                position: absolute;
                right: 14px;
                bottom: 20px;
                height: 35px;
                > li {
                  margin-right: 14px;
                  height: 100%;
                  line-height: 35px;
                  float: left;
                  box-sizing: border-box;
                  text-align: center;
                  color: #302d2d;
                  > i {
                    margin-right: 4px;
                    vertical-align: middle;
                    font-size: 19px;
                  }
                  > span {
                    font-size: 12px;
                  }
                }
                > li:nth-last-child(1) {
                  border: none;
                }
              }
              > .cover {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 9;
                width: 100%;
                height: 100%;
                background: url(../../assets/images/Topic-discussion-list/bg-02.jpg)
                  no-repeat;
                background-size: 100% 100%;
                > .topic-name {
                  padding: 75px 51px 22px 51px;
                  line-height: 22px;
                }
                > img {
                  display: block;
                  margin: 0 auto 52px auto;
                  width: 33px;
                  height: 7px;
                }
                > .btn {
                  text-align: center;
                  > div {
                    display: inline-block;
                    cursor: pointer;
                    background: #5688ff;
                    border-radius: 2px;
                    padding: 6px 12px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #ffffff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>