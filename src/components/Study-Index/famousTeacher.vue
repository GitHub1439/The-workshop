<template>
  <div>
    <div class="container Tsingma">
      <div class="commonTitle">
        <!-- 标题 -->
        <div>青马在线</div>
        <!-- 查看更多 -->
        <div @click="jumpMore(0)">
          <span>查看更多</span>
          <img src="../../assets/images/study/more.png" alt="" />
        </div>
      </div>

      <div class="contents">
        <div v-for="(item, index) in goodData" :key="index">
          <div class="works-name">{{ item.qingmaOnlineSubjectName }}</div>
          <div class="view-btn">
            <img
              @click="jumpMore(index+1)"
              src="../../assets/images/study/live.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.Tsingma {
  > .commonTitle {
    > div:first-child {
      opacity: 1;
      font-size: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #000000;
    }
    > div:nth-child(2) {
      > img {
        width: 25px;
        height: 25px;
      }
    }
  }
  .contents {
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    margin-bottom: 50px;
    > div:first-child {
      background: url("../../assets/images/study/tsingma1.png") no-repeat;
    }
    > div:nth-child(2) {
      background: url("../../assets/images/study/tsingma2.png") no-repeat;
    }
    > div:nth-child(3) {
      background: url("../../assets/images/study/tsingma3.png") no-repeat;
    }
    > div:last-child {
      background: url("../../assets/images/study/tsingma4.png") no-repeat;
    }
    > div {
      width: 285px;
      height: 185px;
      cursor: pointer;
      text-align: center;
      border-radius: 5px;
      position: relative;
      margin-right: 11px;
      &:hover {
        > .view-btn {
          opacity: 1;
          > img {
            opacity: 1;
          }
        }
      }

      > .works-name {
        font-size: 42px;
        font-family: Adobe Kaiti Std, Adobe Kaiti Std-R;
        font-weight: R;
        margin-top: 25px;
        text-align: center;
        color: #f5e4b2;
        text-shadow: 0px 3px 6px 0px #200101;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      > .view-btn {
        position: absolute;
        top: 0;
        left: 0;
        width: 285px;
        height: 185px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 5px;
        transition: all 0.5s ease;
        opacity: 0;
        text-align: center;
        > img {
          width: 53px;
          height: 48px;
          opacity: 0;
          transition: all 1s ease;
          cursor: pointer;
          margin-top: 68px;
        }
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      tableForm: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      goodData: [],
    };
  },
  methods: {
    // 获取青马在线专题

    getTsingmaSubject() {
      this.$api.TsingmaSubject().then((res) => {
        if (res.data.code == 200) {
          this.goodData = res.data.data;
        }
      });
    },

    
    jumpMore(tabIndex) {
      this.$router.push({
        path: "Tsingma-list",
        query: { tabIndex: tabIndex },
      });
    },
  },
  created() {},
  mounted() {
    this.getTsingmaSubject();
  },
  filters: {
    time(val) {
      if (val) {
        return `${val.substring(0, 10)}`;
      }
    },
  },
};
</script>


