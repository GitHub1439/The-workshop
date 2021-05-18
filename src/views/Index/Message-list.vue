<template>
  <div class="Message-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="message-left">
      <ul>
        <li
          v-for="(item, index) in messageList"
          :key="index"
          @click="getMessageDetails(item.id)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="message-right">
      <div class="title">{{ messageDetails.title }}</div>
      <div class="brief-introduction clearfix">
        <div>发文人：{{ messageDetails.issuer }}</div>
        <div>发文时间：{{ messageDetails.createTime }}</div>
        <div>
          通知类型：{{ messageDetails.type == 1 ? "系统通知" : "公告消息" }}
        </div>
      </div>
      <div
        class="ql-snow ql-editor html-details"
        v-html="messageDetails.content"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Message-list",
  data() {
    return {
      messageList: [], // 消息列表
      messageDetails: {}, // 消息详情
    };
  },
  created() {
    // console.log(this.$fun.strCode("12341"));
    // console.log(this.$fun.strCode("我"));
    this.getMessageList(); // 获取消息列表
    this.getMessageDetails(this.$route.query.id); // 获取消息详情
  },
  mounted() {},
  methods: {
    // 获取消息列表
    getMessageList() {
      this.$api
        .messageList({ workspaceId: this.$store.getters.workspaceId })
        .then((res) => {
          this.messageList = res.data.data.rows;
        });
    },
    // 获取消息详情
    getMessageDetails(id) {
      this.$api
        .messageList({ workspaceId: this.$store.getters.workspaceId, id: id })
        .then((res) => {
          this.messageDetails = res.data.data.rows[0];
        });
    },
  },
  watch: {
    $route(to, from) {
      this.getMessageDetails(to.query.id); // 获取消息详情
    },
  },
  filters: {},
};
</script>
<style lang="less" scoped>
.Message-list {
  > .el-breadcrumb {
    padding: 36px 0 33px 0;
  }
  > .message-left,
  .message-right {
    float: left;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    box-sizing: border-box;
  }
  > .message-left {
    margin-right: 20px;
    width: 260px;
    height: 600px;
    > ul {
      height: 600px;
      overflow-y: scroll;
      padding: 0 19px;
      box-sizing: border-box;
      > li {
        cursor: pointer;
        position: relative;
        padding: 12px 0 12px 18px;
        font-size: 14px;
        color: #111110;
        border-bottom: 1px solid rgba(112, 112, 112, 0.1);
        &::after {
          content: "";
          position: absolute;
          top: 15px;
          left: 0;
          width: 8px;
          height: 8px;
          background-color: #5688ff;
          border-radius: 50%;
        }
      }
    }
  }
  > .message-right {
    width: 620px;
    height: 600px;
    padding: 29px 28px 0 28px;
    > .title {
      font-weight: 600;
      text-align: center;
      color: #111110;
    }
    > .brief-introduction {
      font-size: 12px;
      color: rgba(17, 17, 16, 0.6);
      > div {
        float: left;
        padding: 16px 0;
        margin-right: 32px;
      }
    }
    > .details {
      font-size: 14px;
      color: #111110;
      line-height: 20px;
      text-indent: 2em;
    }
  }
  .html-details {
    // .ql-align-justify {
    img {
      max-width: 100% !important;
    }
    // }
  }
}
</style>