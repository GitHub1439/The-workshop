<template>
  <div>
    <div class="container Tsingma">
      <div class="commonTitle">
        <!-- 标题 -->
        <div>探索与发现</div>
        <!-- 查看更多 -->
        <div @click="jumpMore(4)">
          <span>查看更多</span>
          <img src="../../assets/images/study/more.png" alt="" />
        </div>
      </div>
      <div class="content">
        <div class="main-top">
          <img src="../../assets/images/study/top1.png" alt="" />
          <img src="../../assets/images/study/top2.png" alt="" />
          <img src="../../assets/images/study/top3.png" alt="" />
        </div>
        <ul>
          <li v-for="(item, index) in fastclassData" :key="index" @click="jumpMore(item.id)">
            <!-- <img :src="item.shortVedioImage" alt="" /> -->

            <div class="works-name">{{ item.projectName }}</div>
            <p>{{ item.qingmaOnlineDescribe }}</p>
            <!-- <div class="works-teacher">上传老师:郭晓峰</div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.Tsingma {
  padding-bottom: 80px;
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

  .content {
    > .main-top {
      display: flex;
      height: 366px;
      > img:first-child {
        width: 300px;
      }
      > img:nth-child(2) {
        flex: 1;
      }
      > img:last-child {
        width: 300px;
      }
    }
    ul {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      > li {
        width: 300px;
        height: 275px;
        background: rgba(238, 238, 254, 0.65);
        border-radius: 0px;
        padding: 50px 28px 39px 28px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        cursor: pointer;
        &:hover{
          > .works-name {
            &::after{
              bottom: -30px;
            }
          }
        }
        > .works-name {
          font-size: 26px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: center;
          color: #333333;
          position: relative;
          &::after {
            content: "";
            width: 30px;
            height: 5px;
            background: #000;
            position: absolute;
            bottom: -20px;
            left: 50%;
            margin-left: -15px;
            transition: all 1s ease;
            // margin-top: 22px;
          }
        }
        > .works-teacher {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: center;
          color: #373737;
          // line-height: 24px;
        }
        > p {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: center;
          color: #333333;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        > .works-num {
          font-size: 14px;
          font-family: Source Han Sans CN, Source Han Sans CN-Light;
          font-weight: 300;
          text-align: center;
          color: #000000;
          // line-height: 23px;
         
        }
      }
      > li:first-child {
        background: url("../../assets/images/study/explore1.png") no-repeat;
      }
      > li:nth-child(2) {
        background: url("../../assets/images/study/explore2.png") no-repeat;
      }
      > li:nth-child(3) {
        background: url("../../assets/images/study/explore3.png") no-repeat;
      }
      > li:last-child {
        background: url("../../assets/images/study/explore4.png") no-repeat;
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
        pageSize: 4,
        pageNum: 1,
        total: 0,
        qingmaOnlineSubjectID: 1,
      },
      fastclassData: [
       
      ],
    };
  },
  methods: {
    // 快课秀
    getfastclass() {
      this.$api.getStudyResourceSubject()
        .then((res) => {
          if(res.data.code == 200){
            this.fastclassData = res.data.data
          }
            // this.fastclassData = res.data.data.rows;
          
        });
    },
    jump(item) {
      var data = {
        id: item.qingmaOnlineId,
      };
      window.open(
        "http://research.hnedu.cn/#/tdetails?tdata=" + JSON.stringify(data)
      );
    },
    jumpMore(id) {
      this.$router.push({path:'explore-list',query:{tabIndex:id}})
    },
  },
  created() {},
  mounted() {
    this.getfastclass();
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


