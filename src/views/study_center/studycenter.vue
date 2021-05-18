<template>
  <div class="home">
    <H></H>
    <div class="top"></div>
    <div class="container video_box">
      <div class="content_box">
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <div class="grid-content">
              <img
                @click="
                  go(
                    'https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=d2f9baef-f31c-4f7d-8dea-e9385b9451f1&dd_nav_bgcolor=FF2C2D2F#/public/d2f9baef-f31c-4f7d-8dea-e9385b9451f1'
                  )
                "
                class="play"
                src="../../assets/images/study/play.png"
                alt=""
              />
              <img
                class="pic"
                src="../../assets/images/study/video-third.jpg"
                alt=""
              />
              <div class="bottom">
                <el-row type="flex">
                  <el-col :offset="1" :span="7"
                    ><div class="grid-content">
                      <img
                        class="player2"
                        src="../../assets/images/study/player2.png"
                        alt=""
                      />
                      <span>2365人想收看该栏目</span>
                      1
                    </div></el-col
                  >
                  <el-col :offset="8" :span="8"
                    ><div class="grid-content">
                      <img
                        class="clock"
                        src="../../assets/images/study/clock.png"
                        alt=""
                      />
                      <span>播出时间:4月15日 周四 20:00</span>
                    </div></el-col
                  >
                </el-row>
              </div>
            </div></el-col
          >
          <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5">
            <div class="grid-content bg-purple-light">
              <div>“我是接班人”网络大课堂</div>
              <p>
                “我是接班人”网络大课堂，高举网络立德树人旗帜，面向全省学生直推思政德育、心理健康、生命安全、法治精神、传统文化、科学创新、劳动教育、家庭教育等育人大课。借鉴影视大片和网红IP的制作方式，打造富于感
                染力和吸引力的网络育人新课程、新名师、新模式，引导全省学生改“追明星”为“追名师”、改“追网红”为“追网课”。
              </p>
              <img
                @click="details"
                src="../../assets/images/study/video-player.png"
                alt=""
              />
            </div>
          </el-col>
        </el-row>
        <div class="title">
          <span>[我是接班人]-《国家安全 我们在一起》</span>
        </div>

        <div class="recommde_title">
          <span>相关视频</span>
          <ul></ul>
        </div>
        <div class="recommde">
          <div
            @click="go(item.url)"
            v-for="(item, index) in videoData"
            :key="index"
          >
            <img :src="item.pic" alt="" />
            <p>{{ item.title }}</p>
            <p>{{ item.createTime }}</p>
          </div>
        </div>
      </div>
    </div>
    <Famous />
    <SelectCourse />
    <SmallClass />
    <!--名师课例 -->
  </div>
</template>
<script>
import H from "../../components/common/header";
import Famous from "../../components/Study-Index/famousTeacher";
import SelectCourse from "../../components/Study-Index/selectCourse";
import SmallClass from "../../components/Study-Index/smallClass";
export default {
  components: {
    H,
    Famous,
    SmallClass,
    SelectCourse,
  },
  data() {
    return {
      num1: 0,
      num2: 0,
      btnName: "必修",
      videoData: [
        {
          pic: require("../../assets/images/study/video-third.jpg"),
          title: "【我是接班人】《国家安全 我们在一起》",
          createTime: "4月15日 周四 20:00",
          url:
            "https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=d2f9baef-f31c-4f7d-8dea-e9385b9451f1&dd_nav_bgcolor=FF2C2D2F#/public/d2f9baef-f31c-4f7d-8dea-e9385b9451f1",
        },
        {
          pic: require("../../assets/images/study/video-second.jpg"),
          title: "【我是接班人】《信仰之光》",
          createTime: "4月3日 周六 20:00",
          url:
            "https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=802108f1-edf0-47d2-8215-668e653258de&dd_nav_bgcolor=FF2C2D2F#/public/802108f1-edf0-47d2-8215-668e653258de",
        },
        {
          pic: require("../../assets/images/study/video-first.jpg"),
          title: "【我是接班人】《雷锋的“朋友圈”》",
          createTime: "3月6日 周六 20:00",
          url:
            "https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=5630a205-7075-491e-a4aa-ccc735737078&dd_nav_bgcolor=FF2C2D2F#/public/5630a205-7075-491e-a4aa-ccc735737078",
        },
        {
          pic: require("../../assets/images/study/video001.jpg"),
          title: "【我是接班人】欢喜过大年",
          createTime: "2月6日 周六 20:00",
          url:
            "https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=494fd98a-e161-4613-a462-858459f806a0&dd_nav_bgcolor=FF2C2D2F#/public/494fd98a-e161-4613-a462-858459f806a0",
        },
        {
          pic: require("../../assets/images/study/video01.jpg"),
          title: "【我是接班人】上九天揽月",
          createTime: "1月2日 周六 20:00",
          url:
            "https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=ffee9b5a-ec67-4108-bb5e-922e9239368c&dd_nav_bgcolor=FF2C2D2F#/public/ffee9b5a-ec67-4108-bb5e-922e9239368c",
        },
        // {
        //   pic: require("../../assets/images/study/video1.jpg"),
        //   title: "【我是接班人】致敬2020",
        //   createTime: "12月5日 周六 20:00",
        //   url:
        //     "https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=1e875922-9cb6-4ea5-af0b-0397cb23f617&dd_nav_bgcolor=FF2C2D2F#/public/1e875922-9cb6-4ea5-af0b-0397cb23f617",
        // },
        // {
        //   pic: require("../../assets/images/study/video2.jpg"),
        //   title: "【我是接班人】绿水青山的呼唤",
        //   createTime: "11月7日 周六 20:00",
        //   url:
        //     "https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=d11b128d-e67f-4e50-9191-a1bfbe8f67cb&dd_nav_bgcolor=FF2C2D2F#/public/d11b128d-e67f-4e50-9191-a1bfbe8f67cb",
        // },
        // {
        //   pic: require("../../assets/images/study/video3.jpg"),
        //   title: "【我是接班人】大国点名",
        //   createTime: "10月7日 周三 20:00",
        //   url:'https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=f369028b-b2f4-497d-a740-f722618c69fa&dd_nav_bgcolor=FF2C2D2F#/public/f369028b-b2f4-497d-a740-f722618c69fa'
        // },
        // {
        //   pic: require("../../assets/images/study/video4.png"),
        //   title: "【我是接班人】长成参天大树",
        //   createTime: "10月2日 周五 20:00",
        //   url:'https://h5.dingtalk.com/group-live-share/index.htm?type=2&liveUuid=5b503975-f18b-4013-9221-bb38f4d47c44&dd_nav_bgcolor=FF2C2D2F#/public/5b503975-f18b-4013-9221-bb38f4d47c44'
        // },
      ],
      fastclasstabs: [
        {
          title: "热门课程top50",
        },
        {
          title: "防溺水专题",
        },
        {
          title: "消防专题",
        },
      ],
      Tsingmatabs: [
        {
          title: "推荐",
        },
        {
          title: "政治理论 ",
        },
        {
          title: "时政热点",
        },
        {
          title: "团建指南",
        },
        {
          title: "文化素养",
        },
      ],
      TsingmaData: [
        // {
        //   pic: require("../../assets/images/study/qm1.png"),
        //   desc: "深刻理解习近平新时代中国特色社会主义思想",
        //   watch: 688,
        //   collection: 688,
        // },
        // {
        //   pic: require("../../assets/images/study/qm2.png"),
        //   desc: "深刻理解习近平新时代中国特色社会主义思想",
        //   watch: 688,
        //   collection: 688,
        // },
        // {
        //   pic: require("../../assets/images/study/qm3.png"),
        //   desc: "深刻理解习近平新时代中国特色社会主义思想",
        //   watch: 688,
        //   collection: 688,
        // },
        // {
        //   pic: require("../../assets/images/study/qm4.png"),
        //   desc: "深刻理解习近平新时代中国特色社会主义思想",
        //   watch: 688,
        //   collection: 688,
        // },
        // {
        //   pic: require("../../assets/images/study/qm5.png"),
        //   desc: "深刻理解习近平新时代中国特色社会主义思想",
        //   watch: 688,
        //   collection: 688,
        // },
        // {
        //   pic: require("../../assets/images/study/qm6.png"),
        //   desc: "深刻理解习近平新时代中国特色社会主义思想",
        //   watch: 688,
        //   collection: 688,
        // },
        // {
        //   pic: require("../../assets/images/study/qm7.png"),
        //   desc: "深刻理解习近平新时代中国特色社会主义思想",
        //   watch: 688,
        //   collection: 688,
        // },
        // {
        //   pic: require("../../assets/images/study/video.jpg"),
        //   desc: "深刻理解习近平新时代中国特色社会主义思想",
        //   watch: 688,
        //   collection: 688,
        // },
      ],
      fastclassData: [],
      // 页码页数总数
      tableForm: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      tableForm2: {
        pageSize: 8,
        pageNum: 1,
        total: 0,
        qingmaOnlineSubjectID: 1,
      },
      tableForm3: {
        pageSize: 7,
        pageNum: 1,
        total: 0,
        shortVedioSubjectID: 1,
      },
      // @上好课数据
      goodData: [],
    };
  },
  created() {
    if (this.$route.query.token) {
      this.$store.commit("SET_TOKEN", this.$route.query.token); // 设置token
    }
  },
  mounted() {
    // this.getfastclass();
    // this.getGoodClass();
    // this.getQingma();
    // this.getQingmaSubject();
    // this.getFastclassSubject();
  },
  methods: {
    noPage() {
      this.$notify.info({
        title: "消息",
        message: "敬请期待",
      });
    },
    go(url) {
      location.href = url;
    },
    details() {
      location.href = "http://class.hnedu.cn/";
    },
    // 快课秀
    getfastclass() {
      this.$http
        .get("/workspace/shortVedio/findShortVedioByVisitCount", {
          params: this.tableForm3,
        })
        .then((res) => {
          this.fastclassData = res.data.data.rows;
          console.log(this.fastclassData);
        });
    },
    // 快课秀专题资源查询
    getFastclassSubject() {
      this.$http
        .get("/workspace/shortVedioSubject/selectShortVedioSubject")
        .then((res) => {
          this.fastclasstabs = res.data.data;
        });
    },
    // 快课秀专题切换
    FastclassTab(index, shortVedioSubjectID) {
      this.num1 = index;
      this.tableForm3.shortVedioSubjectID = shortVedioSubjectID;
      this.getfastclass();
    },
    // 获取@上好课数据
    getGoodClass() {
      this.$http
        .get("/workspace/interestingClass/findInterestingClassByVisitCount", {
          params: this.tableForm,
        })
        .then((res) => {
          this.goodData = res.data.data.rows;
        });
    },
    // 青马在线资源
    getQingma() {
      this.$http
        .get("/workspace/qingmaOnline/findQingmaOnlineByVisitCount", {
          params: this.tableForm2,
        })
        .then((res) => {
          this.TsingmaData = res.data.data.rows;
        });
    },
    // 青马专题查询
    getQingmaSubject() {
      this.$http
        .get("/workspace/qingmaOnlineSubject/selectQingmaOnlineSubject")
        .then((res) => {
          this.Tsingmatabs = res.data.data;
        });
    },
    // 青马在线专题切换
    qingmaTab(index, qingmaOnlineSubjectID) {
      this.num2 = index;
      this.tableForm2.qingmaOnlineSubjectID = qingmaOnlineSubjectID;
      this.getQingma();
    },
  },
  watch: {},
};
</script>
<style lang="less">
.home {
  background-image: url("../../assets/images/study/bg-left.png");
  background-repeat: no-repeat;
  background-position: 5% 234px;
  background-size: 647px;
  > .top {
    height: 185px;
    background-image: url("../../assets/images/study/bg-right.png");
    background-position: 100% 0;
    background-repeat: no-repeat;
  }
}
.video_box {
  width: 1200px;
  height: 806px;
  background: rgba(37, 37, 37, 0.8);

  border-radius: 10px;
  .content_box {
    width: 1150px;
    height: 720px;
    margin: 0 auto;
    .title {
      font-size: 22px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
      line-height: 53px;
      letter-spacing: 3px;
    }

    .grid-content {
      position: relative;
      border-radius: 4px;
      min-height: 36px;
      &:hover {
        > .play {
          opacity: 1;
        }
      }
      .pic {
        width: 100%;
        height: 100%;
      }
      .play {
        position: absolute;
        left: 50%;
        margin-left: -48px;
        top: 50%;
        margin-top: -48px;
        width: 97px;
        height: 97px;
        cursor: pointer;
        transition: all 0.5s ease;
        opacity: 0;
      }
      .bottom {
        width: 100%;
        height: 40px;
        background: rgba(0, 0, 0, 0.8);
        .grid-content {
          margin-top: 8px;
          img {
            vertical-align: middle;
          }
          .player2 {
            width: 18px;
            height: 20px;
          }
          .clock {
            width: 25px;
            height: 25px;
          }
        }
        span {
          margin-left: 11px;
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          letter-spacing: 0px;
        }
      }
    }
    .recommde_title {
      font-size: 20px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #ffffff;
      line-height: 53px;
      > ul {
        li {
          width: 23px;
          height: 23px;
        }
      }
    }
    .recommde {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      > div {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.83);
        border-radius: 0px 0px 5px 5px;
        > img {
          width: 200px;
          height: 120px;
        }
        > p {
          opacity: 0.7;
          font-size: 12px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          padding: 3px 0;
        }
      }
    }
  }
}
.goodclass {
  > .goodclass_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 23px 0 15px 0;
    > div:first-child {
      font-size: 34px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #373737;
      line-height: 53px;
    }
    > div:last-child {
      cursor: pointer;
      opacity: 0.6;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #191919;
      > img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        margin-left: 16px;
      }
    }
  }
  > .contents {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .el-col {
      margin-right: 20px;

      &:hover {
        > .mask {
          display: block;
        }
        > .content_title {
          display: none;
        }
      }

      position: relative;
      width: 220px;
      height: 284px;
      border-radius: 10px;
      > img {
        width: 100%;
        height: 100%;
      }
      > .mask {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);

        > div {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-around;
          align-items: center;
          margin-top: 30px;
          height: 70%;
          > img {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
          > p {
            width: 172px;
            height: 60px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Light;
            font-weight: 300;
            text-align: center;
            color: #ffffff;
            line-height: 21px;
            letter-spacing: 0px;
          }
        }
      }
      > .content_title {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 28px;
        background: #1c1c1c;
        font-size: 14px;
        font-family: Source Han Sans CN, Source Han Sans CN-Bold;
        font-weight: 700;
        text-align: center;
        color: #ffffff;
        line-height: 28px;
      }
    }
  }
}
.fastclass {
  > .contents {
    .top {
      width: 100%;
      height: 100%;
    }
    .back4 {
      background: #eeeefe;
    }
    .back5 {
      background: #dcf0ee;
    }
    .back6 {
      background: #fff4e5;
    }
    .back7 {
      background: #f1d3f3;
    }

    .minheight {
      height: 366px;
      position: relative;
      border-radius: 0px 0px 0px 5px;
      .more {
        position: absolute;
        bottom: 23px;
        right: 20px;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Light;
        font-weight: 300;
        text-align: left;
        color: #0a0a0a;
        line-height: 40px;
        letter-spacing: 1px;
        > img {
          width: 22px;
          height: 22px;
          vertical-align: middle;
        }
      }
      .tops {
        position: absolute;
        left: 0;
        top: 0;
        width: 300px;
        > .title {
          font-size: 32px;
          font-family: Source Han Sans CN, Source Han Sans CN-Bold;
          font-weight: 700;
          text-align: center;
          color: #111111;
          line-height: 24px;
          margin-top: 56px;
        }
        > p {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: center;
          color: #5d5d5d;
          line-height: 24px;
          margin-top: 29px;
          padding: 0 20px;
        }
        > .watch {
          text-align: center;
          margin-top: 120px;
          > img {
            width: 26px;
            height: 15px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
// .Tsingma {
//   > .commonTitle {
//     > .tabs {
//       > div:first-child {
//         > div {
//           width: 137px;
//           margin-right: 10px;
//         }
//       }
//     }
//   }
//   .contents {
//     display: flex;
//     justify-content: flex-start;
//     flex-flow: row wrap;
//     margin-bottom: 50px;
//     > div {
//       width: 287px;
//       height: 338px;
//       background: #ffffff;
//       border: 1px solid #cfcfcf;
//       border-radius: 5px;
//       position: relative;
//       margin-left: 10px;
//       margin-top: 15px;
//       > p {
//         font-size: 18px;
//         font-family: Source Han Sans CN, Source Han Sans CN-Light;
//         font-weight: 300;
//         text-align: center;
//         color: #000000;
//         line-height: 24px;
//         margin-top: 30px;
//       }
//       > button {
//         cursor: pointer;
//         width: 146px;
//         height: 35px;
//         background: #ffc046;
//         border-radius: 5px;
//         border: 0;
//         margin: 12px 0 0 72px;
//       }
//       > img {
//         width: 287px;
//         height: 124px;
//       }
//       > .bottom {
//         position: absolute;
//         bottom: 0;
//         > div:first-child {
//           width: 140px;
//           float: left;
//         }
//         > div:last-child {
//           float: right;
//           width: 140px;
//         }
//         > div {
//           border: 1px solid #cfcfcf;
//           padding: 11px 0 12px 1px;
//           > img {
//             margin-right: 5px;
//             margin-left: 50px;
//           }
//         }
//       }
//     }
//   }
// }
.commonTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 43px 0 16px 0;
  > div:first-child {
    font-size: 34px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #373737;
    line-height: 53px;
  }
  > .tabs {
    position: relative;
    .add {
      font-size: 16px !important;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700 !important;
      text-align: center !important;
      color: #ffffff !important;
      background: #373737 !important;
    }

    > div:first-child {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      background-color: #fff;
      margin-left: -200px;
      > div {
        margin-right: 80px;
        cursor: pointer;
        width: 157px;
        height: 38px;
        background: #f0f0f0;
        border-radius: 19px;
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
        font-weight: 600;
        text-align: center;
        color: #000000;
        line-height: 38px;
      }
    }
  }
  > div:last-child {
    cursor: pointer;
    opacity: 0.6;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #191919;
    > img {
      width: 25px;
      height: 25px;
      vertical-align: middle;
      margin-left: 16px;
    }
  }
}
.row-bg {
  padding-top: 33px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  margin-left: 30px;
  width: 342px;
  height: 479px;
  background-image: url("../../assets/images/study/class-bg.png");
  background-repeat: no-repeat;
  > div {
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #000000;
    line-height: 30px;
    padding: 55px 43px 22px 43px;
  }
  > p {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #000000;
    line-height: 30px;
    padding: 0 21px;
  }
  > img {
    margin-left: 170px;
    margin-top: -20px;
    box-shadow: 1 1 10px 10px;
    cursor: pointer;
  }
}
</style>