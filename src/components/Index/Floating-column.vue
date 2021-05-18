<template>
  <!-- 悬浮栏目 -->
  <div class="Floating_column">
    <ul v-if="$store.getters.personalDetails.workspaceMember">
      <li
        v-for="(item, index) in $store.getters.floatingColumn_List"
        :key="index"
        :class="floatingColumn_Index == index ? 'Floating_column_active' : ''"
        @click="
          (floatingColumn_Index = -1),
            (floatingColumn_Index = index),
            columnClick(item, index)
        "
        v-show="item.isShow"
      >
        <img
          :src="
            require(`../../assets/images/Index/column-${
              floatingColumn_Index == index ? 't' : 'f'
            }-0${index + 1}.png`)
          "
          alt=""
        />
        <div>{{ item.title }}</div>
      </li>
    </ul>
    <div class="Suspension Suspension_box1" v-show="floatingColumn_Index == 0">
      <div class="column_title">
        风格设置
        <i class="el-icon-close" @click="floatingColumn_Index = -1"></i>
      </div>
      <div class="style-list scrollbar-none">
        <ul>
          <li
            :class="item.usingDressUp == 2 ? 'select-active' : ''"
            v-for="(item, index) in styleList"
            :key="index"
          >
            <div class="img-box">
              <img :src="item.dressUpPreview" alt="" />
              <div class="flag">
                <i class="el-icon-check"></i>
              </div>
              <div class="Use-it-now">
                <div @click="useItNow(item)">立即使用</div>
              </div>
            </div>
            <div class="style-name">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="Suspension Suspension_box4" v-if="floatingColumn_Index == 3">
      <div class="column_title">
        消息通知
        <i class="el-icon-close" @click="floatingColumn_Index = -1"></i>
      </div>
      <ul class="scrollbar-none">
        <li
          v-for="(item, index) in messageList"
          :key="index"
          @click="messageDetails(item, index)"
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="none" v-if="messageList.length == 0">
        <img src="../../assets/images/Index/none2.png" alt />
        <span>暂无消息通知</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Floating_column",
  data() {
    return {
      floatingColumn_Index: -1, // 悬浮列表选中
      styleList: [], // 风格列表
      messageList: [], // 消息列表
    };
  },
  created() {
    // 风格列表
    this.$api
      .styleList({ workspaceId: this.$store.getters.workspaceId })
      .then((res) => {
        this.styleList = res.data.data.rows;
        this.$store.commit("SET_STYLE", this.styleList[0]);
      });
  },
  mounted() {
    if (document.body.clientWidth > 1400) {
      document.querySelector(".Floating_column").style.transform =
        "translate(700px, -50%)";
    }
  },
  methods: {
    // 立即使用
    useItNow(item) {
      this.$api
        .setStyle({
          dressUpId: item.id,
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.styleList.forEach((el) => {
              if (el.usingDressUp == 2) {
                el.usingDressUp = 1;
              }
            });
            this.$store.commit("SET_STYLE", item);
            item.usingDressUp = 2;
          }
        });
    },
    // 栏目点击
    columnClick(item, index) {
      if (item.title == "资源上传") {
        this.floatingColumn_Index = -1;
        this.$router.push("Upload-resources"); // 跳转上传资源
      } else if (item.title == "文章发表") {
        this.floatingColumn_Index = -1;
        this.$router.push("Article-published"); // 跳转文章发表
      } else if (item.title == "消息通知") {
        this.getMessageList(); // 消息列表
      }
    },
    // 获取消息列表
    getMessageList() {
      this.$api
        .messageList({ workspaceId: this.$store.getters.workspaceId })
        .then((res) => {
          this.messageList = res.data.data.rows;
        });
    },
    // 消息详情
    messageDetails(item, index) {
      this.$router.push({
        path: "Message-List",
        query: { id: item.id },
      });
      this.floatingColumn_Index = -1;
    },
  },
  watch: {},
  filters: {},
};
</script>
<style lang="less">
// 悬浮栏目
.Floating_column {
  position: fixed;
  z-index: 10;
  top: 50%;
  right: 50%;
  transform: translate(600px, -50%);
  width: 75px;
  > ul {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 9px;
    overflow: hidden;
    > li {
      position: relative;
      cursor: pointer;
      width: 100%;
      height: 75px;
      box-sizing: border-box;
      background-color: #fff;
      > img {
        padding-top: 14px;
        margin: 0 auto 6px auto;
        display: block;
        width: 32px;
        height: 32px;
      }
      > div {
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: #8b856b;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 17.5px;
        width: 40px;
        height: 1px;
        background-color: #d9d9d9;
      }
    }
    > li:nth-last-child(1) {
      &::after {
        display: none;
      }
    }
    > .Floating_column_active {
      background-color: #5688ff;
      animation: flipInX 1.3s;
      > div {
        color: #fff;
      }
      &::after {
        display: none;
      }
    }
  }
  .scrollbar-none {
    scrollbar-width: none !important; /* firefox */
    -ms-overflow-style: none !important; /* IE 10+ */
    overflow-x: hidden !important;
    overflow-y: auto !important;
  }
  .column_title {
    position: relative;
    font-weight: 600;
    text-align: center;
    color: #1d1d1d;
    padding: 20px 0;
    > i {
      position: absolute;
      top: 13px;
      right: 13px;
      cursor: pointer;
      color: #bbbbbb;
      font-size: 24px;
    }
  }
  > .Suspension {
    position: absolute;
    animation: fadeInRight 0.5s;
    background: #ffffff;
    box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.38);
  }
  > .Suspension_box1 {
    top: -120px;
    left: -659px;
    width: 634px;
    height: 513px;
    > .style-list {
      padding-top: 30px;
      margin: 0 40px;
      box-sizing: border-box;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      overflow-y: scroll;
      height: 420px;
      > ul {
        > li {
          cursor: pointer;
          float: left;
          margin-bottom: 40px;
          > .img-box {
            width: 240px;
            height: 135px;
            border-radius: 5px;
            overflow: hidden;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          > .style-name {
            padding-top: 15px;
            color: rgba(29, 29, 29, 0.6);
          }
          &:hover {
            > .img-box {
              position: relative;
              > .Use-it-now {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(86, 136, 255, 0.8);
                > div {
                  margin: 53px auto 0 auto;
                  width: 128px;
                  height: 29px;
                  line-height: 29px;
                  text-align: center;
                  border: 1px solid #ffffff;
                  border-radius: 16px;
                  font-size: 14px;
                  color: #ffffff;
                }
              }
            }
          }
        }
        > li:nth-child(2n) {
          float: right;
        }
        > .select-active {
          > .img-box {
            position: relative;
            border: 1px solid #5688ff;
            box-sizing: border-box;
            > .flag {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 30px;
              height: 20px;
              text-align: center;
              background: #5688ff;
              > i {
                font-weight: 700;
                font-size: 20px;
                color: #fff;
              }
            }
          }
          > .style-name {
            color: #5688ff;
          }
        }
      }
    }
  }
  > .Suspension_box4 {
    top: -50px;
    left: -348px;
    width: 323px;
    height: 403px;
    > ul {
      height: 330px;
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
  .none {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    text-align: center;
    > img {
      display: block;
      margin: 0 auto;
      width: 230px;
      height: 165px;
    }
    > span {
      font-size: 20px;
      font-weight: 600;
      color: #6a7588;
      letter-spacing: 3px;
    }
  }
}
</style>