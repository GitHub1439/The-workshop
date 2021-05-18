<template>
  <div class="comments">
    <div class="comments-top">
      <el-input
        type="textarea"
        placeholder="说点什么..."
        v-model="discuss"
        :max="2000"
        ref="mark"
        @blur="getBlur"
      ></el-input>
      <div class="comments-btn" @click="TopicComment(discuss, 1)">评论</div>
    </div>
    <!-- 评论内容 -->
    <div class="comments-content">
      <div class="title">全部评论</div>
      <div class="no_comment" v-if="comments.length == 0">
        <img src="../../assets/images/Activity-details/no_comment.png" alt="" />
        <p>暂无评论</p>
      </div>
      <ul v-else>
        <li v-for="(item, index) in comments" :key="index">
          <img :src="item.avatar" alt="" />
          <div class="info">
            <div class="critics-name">{{ item.nickName }}</div>
            <p>{{ item.discussDetails }}</p>
            <div class="comments-options">
              <!-- 时间 -->
              <span>{{ item.recentlyVisited }}</span>
              <!-- 点赞 -->
              <span class="fa" @click="handelLiked(item)">
                <i
                  class="iconfont"
                  :style="{ color: item.topicLikeChoose == 1 ? '#f8d214' : '' }"
                  >&#xe60e;</i
                >
                {{ item.topicLikeChoose == 1 ? "已点赞" : "点赞" }}({{
                  item.likenum
                }})</span
              >
              <!-- 评论 -->
              <span class="fa" @click="handelComment_first(item, index)">
                <i class="iconfont">&#xe614;</i>
                评论({{ item.discussnum }})</span
              >
              <!-- 删除 -->
              <span
                class="fa"
                @click="handelDel(item, index)"
                v-if="item.deletableLogo == 1"
              ><i class="el-icon el-icon-delete-solid"></i>删除</span>
            </div>
            <div class="input-box" v-if="commentShow_first == index">
              <el-input
                :placeholder="'回复   ' + item.nickName"
                v-model="reply"
              ></el-input>
              <!-- **
                     *reply:评论内容
                     *2:type为2 新增评论
                     *item.id 父id
                      * -->
              <div
                class="comments-btn"
                @click="TopicComment(reply, 2, item.id)"
              >
                评论
              </div>
            </div>

            <!-- 回复评论 -->
            <div class="comments-reply" v-if="item.discussList">
              <ul>
                <li v-for="(comment, i) in item.discussList" :key="i">
                  <img :src="comment.avatar" alt="" />
                  <div class="info">
                    <div class="critics-name">{{ comment.nickName }}</div>
                    <p>
                      回复 {{ comment.replyName }}:{{ comment.discussDetails }}
                    </p>
                    <div class="comments-options">
                      <!-- 时间 -->
                      <span>{{ comment.recentlyVisited }}</span>
                      <!-- 点赞 -->
                      <span class="fa" @click="handelLiked(comment)">
                        <i
                          class="iconfont"
                          :style="{
                            color:
                              comment.topicLikeChoose == 1 ? '#f8d214' : '',
                          }"
                          >&#xe60e;</i
                        >
                        {{
                          comment.topicLikeChoose == 1 ? "已点赞" : "点赞"
                        }}({{ comment.likenum }})</span
                      >
                      <!-- 评论 -->
                      <span
                        class="fa"
                        @click="handelComment_second(comment, index, i)"
                      >
                        <i class="iconfont">&#xe614;</i>
                        评论({{ comment.discussnum }})</span
                      >
                      <!-- 删除 -->
                      <span
                        class="fa"
                        @click="handelDel(comment, index)"
                        v-if="comment.deletableLogo == 1"
                      ><i class="el-icon el-icon-delete-solid"></i>删除</span>
                    </div>
                    <div
                      class="input-box"
                      v-if="commentShow_second == i && fid == index"
                    >
                      <el-input
                        :placeholder="'回复' + comment.nickName"
                        v-model="reply"
                      ></el-input>
                      <!-- **
                     *reply:评论内容
                     *2:type为2 新增评论
                     *comment.id 父id
                      * -->
                      <div
                        class="comments-btn"
                        @click="TopicComment(reply, 2, comment.id)"
                      >
                        评论
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="more"
                @click="getMore(item, index)"
                v-if="item.theRemainingAmount > 0 && haveMore !== index"
              >
                更多回复({{ item.theRemainingAmount }})
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="pageForm.pageNum"
      :page-size="pageForm.pageSize"
      :total="pageForm.total"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "About",
  components: {},
  props: {
    focus: {
      type: Boolean,
      default: false,
    },
    propA: Number,
  },
  watch: {
    // 点击评论获取焦点
    focus: {
      immediate: true,
      handler() {
        this.$refs["mark"].focus();
      },
    },
  },
  data() {
    return {
      discuss: "",
      // 评论分页
      pageForm: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
        topicId: this.$route.query.id,
        workspaceId: this.$store.getters.workspaceId,
      },
      commentShow_first: null, //评论列表回复框展示
      commentShow_second: null, //回复列表回复框展示
      fid: 0, //记录列表的父列表index，用于显示回复列表的回复框
      reply: "", //回复框 v-model
      comments: [],
      haveMore: null, //更多显示
      flag:true,
      timer:null
    };
  },
  created() {},
  mounted() {
    this.getTopicComment();
  },
  methods: {
    // 点击评论切换评论框显示
    handelComment_first(item, index) {
      /**
       * item：数据
       * index：当前列index
       */
      if (this.commentShow_first == index) {
        this.commentShow_first = null;
      } else {
        this.commentShow_first = index;
        this.commentShow_second = null;
      }
      this.reply = "";
    },
    // 点击回复列表的评论切换评论框显示
    handelComment_second(item, fid, index) {
      /**
       * item：数据
       * fid：父列表index
       * index：当前列index
       */
      this.fid = fid;
      if (this.commentShow_second == index) {
        this.commentShow_second = null;
      } else {
        this.commentShow_second = index;
        this.commentShow_first = null;
      }
      this.reply = "";
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getTopicComment();
    },
    // 失去焦点
    getBlur() {
      this.$emit("back", false);
    },
    // 获取话题评论列表
    getTopicComment() {
      this.$api.getTopicComment(this.pageForm).then((res) => {
        if (res.data.code == 200) {
          this.comments = res.data.data.rows;
          this.pageForm.total = res.data.data.total;
        }
      });
    },
    // 获取更多评论
    getMore(item, index) {
      this.$api
        .viewMoreTopicComment({
          discussId: item.id,
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.comments.forEach((element) => {
              if (element.id == item.id) {
                element.discussList = res.data.data;
              }
            });
            this.haveMore = index;
          }
        });
    },
    // 评论话题
    TopicComment(comment, type, fid) {
      if (comment) {
        let data = {
          discussDetails: comment,
          topicId: this.$route.query.id,
          type: type,
          workspaceId: this.$store.getters.workspaceId,
          fid: fid ? fid : "",
        };
        if(this.flag){
          this.flag = false;

           
        this.$api.TopicComment(data).then((res) => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "评论成功",
              type: "success",
            });
            this.discuss = "";
            this.reply = "";
            if (fid) {
              this.commentShow_second = null;
            } else {
              this.commentShow_first = null;
              this.$emit("refresh");
            }
            this.getTopicComment();
          } else {
            this.$notify({
              message: res.data.message,
              type: "error",
            });
          }
        });
        this.timer = setTimeout(() => {
            this.flag = true;
          }, 2000);
        }
      }
    },
    // 点赞按钮
    handelLiked(item) {
      // 评论点赞/取消参数
      let commentLikedParameter = {
        topicId: this.$route.query.id,
        workspaceId: this.$store.getters.workspaceId,
        type: 2,
        discussId: item.id,
      };

      if (item.topicLikeChoose == 1) {
        this.$api.TopicCancelThumbUp(commentLikedParameter).then((res) => {
          if (res.data.code == 200) {
            this.getTopicComment();
          }
        });
      } else {
        this.$api.TopicThumbUp(commentLikedParameter).then((res) => {
          if (res.data.code == 200) {
            this.getTopicComment();
          }
        });
      }
    },
    // 删除评论
    handelDel(item, index) {
      this.$confirm("此操作将永久删除该评论及回复内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api
          .delTopicComment({
            discussId: item.id,
            workspaceId: this.$store.getters.workspaceId,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$notify({
                title: "成功",
                message: "删除评论成功",
                type: "success",
              });
              this.getTopicComment();
            }
          });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.comments {
  background: #ffffff;
  border-radius: 8px;
  padding: 42px 0;

  margin-top: 40px;
  //   评论输入框
  > .comments-top {
    padding-bottom: 39px;
    margin: 0 30px 50px 30px;
    border-bottom: 1px solid #e5e5e5;
    /deep/ .el-textarea__inner {
      background: #f6f6f6;
      height: 90px;
    }
    > .comments-btn {
      width: 120px;
      height: 54px;
      opacity: 1;
      background: #f6f6f6;
      border-radius: 8px;
      float: right;
      font-size: 18px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #999999;
      line-height: 54px;
      margin-top: 24px;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: rgb(129, 166, 235);
      }
    }
    &::after {
      content: "";
      display: block;
      clear: both;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }
  > .comments-content {
    margin: 0 117px 88px 59px;
    > title {
      font-size: 20px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #000000;
    }
    > .no_comment {
      text-align: center;
      > img {
        width: 400px;
        margin-top: 20px;
      }
      > p {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: center;
        color: #000000;
        line-height: 24px;
      }
    }
    // 评论列表
    > ul {
      > li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        margin-top: 24px;
        padding-bottom: 25px;
        border-bottom: 1px solid rgba(24, 25, 26, 0.1);
        > img {
          width: 49px;
          height: 49px;
          border-radius: 50%;
        }
        > .info {
          margin-left: 17px;
          width: 100%;
          &:hover {
            > .comments-options {
              > span:nth-child(4) {
                opacity: 1;
              }
            }
          }
          > .critics-name {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
          }
          > p {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #7d7d7d;
            margin: 7px 0 21px 0;
          }
          > .comments-options {
            margin-bottom: 10px;
            > span {
              font-size: 12px;
              font-weight: 400;
              text-align: left;
              color: #ababab;
            }
            > span:first-child {
              margin-right: 47px;
            }
            > span:nth-child(2) {
              margin-right: 28px;
              cursor: pointer;
            }
            > span:nth-child(3) {
              margin-right: 28px;
              cursor: pointer;
            }
            > span:nth-child(4) {
              margin-right: 28px;
              cursor: pointer;
              transition: all 0.3s ease;
              opacity: 0;
			  .el-icon{
			  	font-size: 16px;
			  }
              &::before {
                // content: "\f014";
                margin-right: 4px;
              }
            }
          }
          > .input-box {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            margin-top: 20px;
            > .el-input {
              width: 80%;
            }
            > .comments-btn {
              width: 80px;
              height: 40px;
              opacity: 1;
              background: #f6f6f6;
              border-radius: 8px;
              // float: right;
              font-size: 16px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: center;
              color: #999999;
              line-height: 40px;
              transition: all 0.3s ease;
              cursor: pointer;
              &:hover {
                background: rgb(129, 166, 235);
                color: #fff;
              }
            }
          }

          //   评论回复
          > .comments-reply {
            width: 658px;
            background: #f6f6f6;
            margin-top: 39px;
            margin-bottom: 10px;
            border-radius: 8px;
            position: relative;
            &::before {
              content: "";
              width: 18px;
              height: 21px;
              position: absolute;
              background: #f6f6f6;
              transform: rotate(45deg);
              top: -8px;
              left: 50px;
            }
            > ul {
              margin: 0 21px 0 27px;
              padding-top: 7px;
              > li {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                margin-top: 24px;
                padding-bottom: 25px;
                border-bottom: 1px solid rgba(24, 25, 26, 0.1);
                > img {
                  width: 49px;
                  height: 49px;
                  border-radius: 50%;
                }
                > .info {
                  margin-left: 17px;
                  width: 100%;
                  > .critics-name {
                    font-size: 16px;
                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #000000;
                  }
                  > p {
                    font-size: 16px;
                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #7d7d7d;
                    margin: 7px 0 21px 0;
                  }
                  > .comments-options {
                    > span {
                      font-size: 12px;
                      font-weight: 400;
                      text-align: left;
                      color: #ababab;
                    }

                    > span:first-child {
                      margin-right: 47px;
                    }
                    > span:nth-child(2) {
                      margin-right: 28px;
                      cursor: pointer;
                    }
                    > span:nth-child(3) {
                      margin-right: 28px;
                      cursor: pointer;
                    }
                    > span:nth-child(4) {
                      margin-right: 28px;
                      cursor: pointer;
                      transition: all 0.3s ease;
                      opacity: 0;
					  .el-icon{
					  	font-size: 16px;
					  }
                      &::before {
                        // content: "\f014";
                        margin-right: 4px;
                      }
                    }
                  }
                  > .input-box {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    margin-top: 20px;
                    > .el-input {
                      width: 80%;
                    }
                    > .comments-btn {
                      width: 80px;
                      height: 40px;
                      opacity: 1;
                      background: #e2e2e2;
                      border-radius: 8px;
                      // float: right;
                      font-size: 16px;
                      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                      font-weight: 400;
                      text-align: center;
                      color: #acabab;
                      line-height: 40px;
                      transition: all 0.3s ease;
                      cursor: pointer;
                      &:hover {
                        background: rgb(129, 166, 235);
                        color: #fff;
                      }
                    }
                  }
                  &:hover {
                    > .comments-options {
                      > span:nth-child(4) {
                        opacity: 1;
                      }
                    }
                  }
                }
              }
              > li:nth-last-child(1) {
                border-bottom: none;
              }
            }
            > .more {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: center;
              color: #999999;
              height: 48px;
              line-height: 48px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
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