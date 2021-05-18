<template>
  <div class="Online-resources-details">
    <H></H>
    <div class="container">
      <!-- top-->
      <div class="details-top">
        <img
          :src="
            require(`../../assets/images/study-file/${this.$route.query.resourcesFormat}.png`)
          "
          alt=""
        />
        <div class="details-info">
          <div>
            <!-- 标题 -->
            <span>{{ TsingmaData.title }}</span>
            <!--  -->
            <span v-if="TsingmaData.projectName">{{ TsingmaData.projectName }}</span>
          </div>
          <p>
            {{ TsingmaData.resourcesDescription }}
          </p>
        </div>
        <ul>
          <li v-if="$route.query.id">
            <div>上传老师:</div>
            <div>{{ TsingmaData.uploadName }}</div>
          </li>
          <li>
            <i class="iconfont">&#xe625;</i>
            {{ TsingmaData.browse }}
          </li>
        </ul>
      </div>
      <div class="details-main">
        <div class="details-left" :class="{ addVideo: resourcesFormat == 2 }">
          <Controls ref="Controls" />
        </div>
        <div class="details-right">
          <img src="../../assets/images/study/recommend.png" alt="" />
          <!-- 推荐 -->
          <div class="title">推荐资源</div>
          <!-- {{recommend}} -->
          <ul v-if="recommend.length > 0">
            <li
              v-for="(item, index) in recommend"
              :key="index"
              @click="jumpDetails(item)"
            >
              <img
                :src="
                  require(`../../assets/images/study-file/${item.resourcesFormat}.png`)
                "
                alt=""
              />
              <ul>
                <li>{{ item.title }}</li>
                <li>
                  <span v-if="$route.query.id"
                    >上传老师:{{ item.uploadName }}</span
                  >
                  <span><i class="iconfont">&#xe625;</i>{{ item.browse }}</span>
                </li>
              </ul>
            </li>
          </ul>
          <div v-else class="no-recommendation">
            <img
              src="../../assets/images/Activity-details/no_recommend.png"
              alt=""
            />
            <p>暂无推荐</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import H from "../../components/common/header";
import Controls from "../../components/Studio-management/Approval-notice/Dialog-study";
export default {
  components: {
    H,
    Controls,
  },
  data() {
    return {
      recommend: [],
      TsingmaData: {},
      resourcesFormat: this.$route.query.resourcesFormat,
      resourse: "",
      id: "",
      projectName: "",
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    
  },
  mounted() {
    this.getRecommendResource();
    this.getResourceDetails();
  },
  methods: {
    // 获取诗词及或探索详情
    getResourceDetails() {
      this.$api.getResourceDetails({ id: this.id }).then((res) => {
        if (res.data.code == 200) {
          this.TsingmaData = res.data.data;
          this.resourse = res.data.data.previewAddress;
          this.$refs.Controls.getData(this.resourse, this.resourcesFormat);
        }
      });
    },
    jumpDetails(item) {
      this.$fun.openPage(
        "Online-resources-details",
        `?resourcesFormat=${item.resourcesFormat}&id=${item.id}`
      );
    },
    // 获取专题推荐
    getRecommendResource() {
      this.$api.getRecommendResource({ id: this.id }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length > 7) {
            this.recommend = res.data.data.slice(0, 7);
          } else {
            this.recommend = res.data.data;
          }
        }
      });
    },
  },
  watch: {},
};
</script>
<style lang="less">
.Online-resources-details {
  background: #f6f6f6;
  > .container {
    > .details-top {
      background: #ffffff;
      height: 160px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      padding: 0 71px 0 47px;
      > img {
        width: 89px;
        height: 101px;
      }
      > .details-info {
        position: relative;
        width: 671px;
        margin-left: 37px;

        > div {
          display: flex;
          > span:first-child {
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: left;
            color: #333333;
          }
          > span:last-child {
            display: block;
            width: 76px;
            height: 26px;
            background: rgba(198, 0, 0, 0.1);
            border-radius: 4px;
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            color: #c60000;
            line-height: 26px;
            margin-left: 22px;
          }
        }
        > p {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 22px;
          margin-top: 14px;
        }
      }
      > ul {
        margin-left: 129px;
        display: flex;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 1px;
          height: 60px;
          left: -61px;
          background: #000;
        }
        > li {
          font-size: 18px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: center;
          color: #333333;
          margin-right: 53px;
          i {
            color: #5f5e5e;
          }
          > div:first-child {
            width: 70px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            color: #999999;
            margin-bottom: 5px;
          }
        }
        > li:last-child {
          i {
            margin-bottom: 5px;
          }
        }
      }
    }
    > .details-main {
      height: 584px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-top: 15px;
      > .addVideo {
        background: #000;
      }
      > .details-left {
        width: 900px;
        height: 584px;
      }
      > .details-right {
        width: 250px;
        padding: 0 17px;
        height: 584px;
        background: #ffffff;
        position: relative;
        > img {
          position: absolute;
          top: 0;
          left: 0;
        }
        > .title {
          width: 80px;
          font-size: 20px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #000000;
          border-bottom: 3px solid #c60000;
          padding-bottom: 5px;
          margin: 14px 0 36px 53px;
        }
        > ul {
          > li {
            display: flex;
            flex-flow: row nowrap;
            padding-bottom: 16px;
            border-bottom: 1px solid #e0e0e0;
            margin-bottom: 16px;
            cursor: pointer;
            > img {
              width: 35px;
              height: 39px;
            }
            > ul {
              margin-left: 18px;
              > li:first-child {
                font-size: 14px;
                font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
                font-weight: 600;
                text-align: left;
                color: #111110;
                line-height: 21px;
              }
              > li:last-child {
                font-size: 12px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: left;
                color: #999999;
                overflow: hidden;
                > span:last-child {
                  margin-left: 25px;
                  i {
                    margin-right: 1px;
                  }
                }
              }
            }
          }
        }
        > .no-recommendation {
          > img {
            width: 250px;
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
      }
    }
  }
}
</style>