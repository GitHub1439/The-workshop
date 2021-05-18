<template>
  <div class="Personal-home">
    <div class="container">
      <div class="left-box">
        <div class="box">
          <div
            class="column"
            :style="
              $store.getters.lwStudio
                ? {
                    background:
                      'linear-gradient(90deg,#d39c6c, rgba(245,106,66,0.00))',
                    color: '#91201D',
                  }
                : {}
            "
          >
            个人简介
          </div>
          <div class="details">
            {{
              isShowMore
                ? memberDetails.memberIntroduce
                : memberDetails.memberIntroduce2
            }}
            <div
              :style="{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textIndent: '0em',
              }"
              v-if="memberDetails.memberIntroduce == null"
            >
              暂无简介
            </div>
            <span
              v-if="
                memberDetails.memberIntroduce &&
                memberDetails.memberIntroduce.length > 95
              "
              @click="isShowMore = !isShowMore"
              >{{ isShowMore ? "[详情]" : "[收起]" }}</span
            >
          </div>
        </div>
        <div class="box">
          <div
            class="column"
            :style="
              $store.getters.lwStudio
                ? {
                    background:
                      'linear-gradient(90deg,#d39c6c, rgba(245,106,66,0.00))',
                    color: '#91201D',
                  }
                : {}
            "
          >
            资源贡献统计
          </div>
          <Statistics-Echart />
          <el-row class="today-Statistics">
            <el-col :span="12">
              <div>浏览总量</div>
              <div>{{ memberDetails.resourceViewCount }}</div>
            </el-col>
            <el-col :span="12">
              <div>下载总量</div>
              <div>{{ memberDetails.resourceDownloadCount }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="right-box">
        <div
          class="column column2"
          :style="
            $store.getters.lwStudio
              ? {
                  background:
                    'linear-gradient(90deg,#d39c6c, rgba(245,106,66,0.00))',
                  color: '#91201D',
                }
              : {}
          "
        >
          最新动态
        </div>
        <div class="list">
          <ul>
            <li
              class="clearfix"
              v-for="(item, index) in resourcesList"
              :key="index"
              @click="
                resourcesJump(item)
              "
            >
              <div class="top">
                <img class="head-portrait" :src="memberDetails.avatar" alt="" />
                <div class="name">{{ item.resourceAuthorName }}</div>
                <div class="resource-type">上传了</div>
                <img
                  class="type-img"
                  :src="
                    require(`../../assets/images/fileType/${item.resourceFormatIdFk}.png`)
                  "
                  alt=""
                />
                <div class="resource-name">{{ item.resourceInfoName }}</div>
                <div class="time">{{ item.uploadTime }}</div>
              </div>
              <div class="bottom">
                <el-row class="list">
                  <el-col :xs="24" :sm="6" :md="19" :lg="19" :xl="19">
                    <div class="box-top clearfix">
                      <img
                        :src="
                          require(`../../assets/images/fileType2/${item.resourceFormatIdFk}.png`)
                        "
                        alt
                      />
                      <div class="resources-name">
                        {{ item.resourceInfoName }}
                      </div>
                      <div class="resources-classification">
                        {{
                          item.resourceInfoDescription | resourceInfoDescription
                        }}
                      </div>
                      <ul>
                        <li>{{ item.catalogName }}</li>
                        <li v-if="item.uploadType == 0">大赛资源</li>
                        <li v-else-if="item.uploadType == 1">工作坊资源</li>
                        <li v-else-if="item.uploadType == 2">平台资源</li>
                      </ul>
                    </div>
                    <div class="box-bottom">
                      <ul>
                        <li>
                          <span>时间：</span>
                          <span>{{ item.uploadTime }}</span>
                        </li>
                        <li>
                          <span>下载：</span>
                          <span>{{ item.resourceDownload }}次</span>
                        </li>
                        <li>
                          <span>浏览：</span>
                          <span>{{ item.resourceInfoViewnumber }}次</span>
                        </li>
                        <li>
                          <span>大小：</span>
                          <span>{{ item.resourceSize }}</span>
                        </li>
                        <li>
                          <span>评分：</span>
                          <span>{{ item.resourceScore }}</span>
                        </li>
                        <li>
                          <span>上传老师：</span>
                          <span>{{ item.resourceAuthorName }}</span>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageForm.pageNum"
          :page-size="pageForm.pageSize"
          layout="prev, pager, next, total, jumper"
          :total="pageForm.total"
          hide-on-single-page
        ></el-pagination>
        <!-- 暂无数据 -->
        <div class="none" v-if="none">
          <img src="../../assets/images/Index/none2.png" alt />
          <span>暂无资源</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StatisticsEchart from "./Statistics-echart";
export default {
  name: "Personal-home",
  props: ["memberDetails"],
  components: {
    StatisticsEchart,
  },
  data() {
    return {
      resourcesList: [], // 资源列表
      pageForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        hotNewDownload: 2,
        workspaceId: this.$store.getters.workspaceId,
        memberId: this.$route.query.memberId,
        type: 6,
      },
      isShowMore: true,
      none: false,
    };
  },
  created() {
    this.getList(); // 获取列表
  },
  mounted() {
    setTimeout(() => {
      if (
        this.memberDetails.memberIntroduce &&
        this.memberDetails.memberIntroduce.length > 95
      ) {
        this.isShowMore = true;
      } else {
        this.isShowMore = false;
      }
    }, 100);
  },
  methods: {
    // 获取列表
    getList() {
      this.$api.personalResources(this.pageForm).then((res) => {
        this.pageForm.total = res.data.data.total;
        this.resourcesList = res.data.data.rows;
        if (this.resourcesList.length == 0) {
          this.none = true;
        } else {
          this.none = false;
        }
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getList(); // 获取列表
      scrollTo(0, 390);
    },
    // 资源跳转
    resourcesJump(item) {
      var data = {
        id: item.resourceInfoId,
        sversionId: item.sversionId,
        resourceFormatIdFk: item.resourceFormatIdFk,
        token: this.$store.getters.token,
      };
      this.$fun.resourcesJump(data);
      /*if(item.recommendation != 4) {
        this.$http.post(this.$fileApi + "onlineFile/checkResource", {
          resourceUrl: item.resourceInfoAddr,
        })
        .then((res) => {
          if (res.data.code == 200) {
            if (res.data.data.code == "2") {
              this.$message({
                type: "success",
                message: res.data.data.msg,
              });
              var data = {
                id: item.resourceInfoId,
                sversionId: item.sversionId,
                resourceFormatIdFk: item.resourceFormatIdFk,
                token: this.$store.getters.token,
              };
              this.$fun.resourcesJump(data);
            } else {
              this.$message({
                type: "info",
                message: res.data.data.msg,
              });
            }
          }
        })
        .catch((err) => {});
      } else {
        var data = {
          id: item.resourceInfoId,
          sversionId: item.sversionId,
          resourceFormatIdFk: item.resourceFormatIdFk,
          token: this.$store.getters.token,
        };
        this.$fun.resourcesJump(data);
      }*/
    }
  },
  filters: {
    resourceInfoDescription(val) {
      if (val) {
        if (val.length > 40) {
          return `${val.substring(0, 40)}...`;
        } else {
          return val;
        }
      }
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.Personal-home {
  .left-box,
  .right-box {
    float: left;
  }
  .column {
    padding-left: 16px;
    height: 45px;
    background: linear-gradient(
      90deg,
      rgba(116, 176, 29, 0.35) 1%,
      rgba(116, 176, 29, 0.14) 100%
    );
    border-radius: 4px 4px 0px 0px;

    font-size: 18px;
    font-weight: 600;
    color: #5b920b;
    line-height: 45px;
  }
  .column2 {
    border-radius: 4px;
    margin-bottom: 14px;
  }

  .left-box {
    margin-right: 20px;
    width: 280px;
    > .box {
      background-color: #fff;
      border: 1px solid #e1e1e1;
      border-radius: 4px 4px 0 0;
      > .details {
        position: relative;
        padding: 16px;
        font-size: 14px;
        color: rgba(17, 17, 16, 0.8);
        line-height: 21px;
        height: 100%;
        text-indent: 2em;
        > span {
          // position: absolute;
          // bottom: 16px;
          // right: 16px;
          // background-color: #fff;
          cursor: pointer;
          padding: 0 4px;
          // display: inline-block;
          color: rgba(86, 136, 255, 0.8);
        }
      }
    }
    > .box:nth-child(1) {
      margin-bottom: 32px;
    }
    .today-Statistics {
      padding: 24px 0;
      border-top: 1px solid #e4e4e4;
      > .el-col {
        text-align: center;
        > div:nth-child(1) {
          margin-bottom: 16px;
          font-size: 12px;
          color: #313131;
        }
        > div:nth-child(2) {
          font-size: 24px;
          font-weight: 600;
          color: #ee4f26;
        }
      }
      > .el-col:nth-child(1) {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 12.5px;
          width: 1px;
          height: 31px;
          background-color: rgba(29, 29, 29, 0.2);
        }
      }
      > .el-col:nth-child(2) {
        > div:nth-child(2) {
          color: #0a76d9;
        }
      }
    }
  }
  .right-box {
    width: 900px;
    > .list {
      > ul {
        > li {
          cursor: pointer;
          margin-bottom: 16px;
          padding: 24px;
          box-sizing: border-box;
          width: 100%;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          > .top {
            > div {
              float: left;
              font-size: 14px;
              line-height: 44px;
            }
            > .head-portrait {
              float: left;
              display: block;
              width: 44px;
              height: 44px;
              border-radius: 50%;
            }
            > .name {
              padding: 0 10px 0 24px;
              color: #000000;
            }
            > .resource-type {
              color: #858585;
            }
            > .type-img {
              padding: 0 12px 0 23px;
              float: left;
              display: block;
              width: 20px;
              height: 22px;
              transform: translateY(11px);
            }
            > .resource-name {
              font-weight: 700;
              color: #000000;
            }
            > .time {
              float: right;
              color: #858585;
            }
          }
          > .bottom {
            > .list {
              margin-left: 67px;
              > .el-col {
                > .box-top {
                  > img {
                    margin-right: 13px;
                    float: left;
                    display: block;
                    height: 96px;
                    width: 96px;
                  }
                  > .resources-name {
                    padding-top: 5px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #191919;
                  }
                  > .resources-classification {
                    margin: 15px 0;
                    font-size: 12px;
                    color: rgba(25, 25, 25, 0.6);
                  }
                  > ul {
                    > li {
                      margin-right: 15px;
                      float: left;
                      padding: 4px 12px;
                      background-color: rgba(0, 0, 0, 0.06);
                      font-size: 12px;
                      color: rgba(25, 25, 25, 0.87);
                      border-radius: 2px;
                    }
                    > li:nth-child(1) {
                      color: rgba(230, 121, 0, 0.87);
                      background: rgba(230, 121, 0, 0.06);
                    }
                    > li:nth-child(2) {
                      color: #14a72f;
                      background: rgba(20, 167, 47, 0.1);
                    }
                  }
                }
                > .box-bottom {
                  padding-top: 8px;
                  > ul {
                    > li {
                      margin-right: 20px;
                      float: left;
                      font-size: 12px;
                      > span:nth-child(1) {
                        color: rgba(25, 25, 25, 0.4);
                      }
                      > span:nth-child(2) {
                        color: rgba(25, 25, 25, 0.6);
                      }
                    }
                  }
                }
                > .see-resources-btn {
                  cursor: pointer;
                  margin-top: 39.5px;
                  height: 37px;
                  background-color: #0a76d9;
                  border-radius: 2px;
                  line-height: 37px;
                  text-align: center;
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
</style>