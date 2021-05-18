<template>
  <div class="Topic-discussion-list">
    <header-img title="#话题讨论" />
    <div class="container">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="padding: 36px 0 33px 0"
      >
        <el-breadcrumb-item :to="{ path: '/Teaching-activities' }"
          >教研活动</el-breadcrumb-item
        >
        <el-breadcrumb-item>话题列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="search">
        <el-input
          v-model="pageForm.topicName"
          placeholder="请输入您想要搜索的内容"
        ></el-input>
        <div class="submit" @click="submit">
          站内搜索
          <i class="el-icon-search"></i>
        </div>
      </div>
      <div class="list clearfix">
        <ul>
          <router-link
            tag="li"
            :to="{ path: 'Topic-discussion-details', query: { id: item.id } }"
            v-for="(item, index) in Topic_list"
            :key="index"
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
          </router-link>
        </ul>
      </div>
      <!-- 暂无数据 -->
      <no-data
        v-if="Topic_list.length == 0"
        style="border-radius: 8px"
        :data="{
          img: require('../../assets/images/Index/none2.png'),
          width: '517px',
          height: '371px',
          titleList: ['抱歉！', '暂无活动'],
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
  name: "Topic-discussion-list",
  components: { headerImg, NoData },
  data() {
    return {
      Topic_list: [], // 话题列表
      pageForm: {
        workspaceId: this.$store.getters.workspaceId,
        pageNum: 1,
        pageSize: 15,
        total: 0,
        topicName: "",
      },
    };
  },
  created() {
    this.getTopic_list(); // 话题
  },
  mounted() {},
  methods: {
    submit() {
      this.pageForm.pageNum = 1;
      this.getTopic_list();
    },
    // 话题
    getTopic_list() {
      this.$api.Topic_list(this.pageForm).then((res) => {
        this.Topic_list = res.data.data.rows;
        this.pageForm.total = res.data.data.total;
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getTopic_list(); // 话题
      scrollTo(0, 0);
    },
  },
  filters: {},
};
</script>
<style lang="less" scoped>
.Topic-discussion-list {
  > .container {
    > .search {
      margin: 22px 0 41px 0;
      padding: 23px 17.5px;
      background: #f6f6f6;
      /deep/ .el-input {
        height: 55px;
        width: 884px;
        .el-input__inner {
          height: 100%;
          border-radius: 0;
          font-size: 24px;
        }
      }
      > .submit {
        float: right;
        cursor: pointer;
        width: 281px;
        height: 55px;
        line-height: 55px;
        background: #5688ff;
        font-size: 24px;
        text-align: center;
        color: #ffffff;
        > i {
          margin-left: 37px;
          font-size: 23px;
        }
      }
    }
    > .list {
      > ul {
        > li {
          float: left;
          margin: 0 30px 31px 0;
          cursor: pointer;
          position: relative;
          width: 380px;
          height: 310px;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-sizing: border-box;
          background: url(../../assets/images/Topic-discussion-list/bg-01.png)
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
        > li:nth-child(3n) {
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