<template>
  <div class="Personal-resource">
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
            共有<span> {{ pageForm.total }} </span>个资源
          </div>
        </div>
        <div class="resource-list">
          <!-- 列表 -->
          <el-row
            class="list"
            v-for="(item, index) in resourcesList"
            :key="index"
          >
            <el-col :xs="24" :sm="6" :md="19" :lg="19" :xl="19">
              <div class="box-top clearfix">
                <img
                  :src="
                    require(`../../assets/images/fileType2/${item.resourceFormatIdFk}.png`)
                  "
                  alt
                />
                <div class="resources-name">{{ item.resourceInfoName }}</div>
                <div class="resources-classification">
                  {{ item.resourceInfoDescription | resourceInfoDescription }}
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
            <el-col
              :xs="24"
              :sm="6"
              :md="3"
              :lg="3"
              :xl="3"
              style="float: right"
            >
              <div class="see-resources-btn" @click="resourcesJump(item)">
                查看资源
              </div>
            </el-col>
          </el-row>
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
      <div class="right-box">
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
            最新资源
          </div>
        </div>
        <ul>
          <li
            v-for="(item, index) in resourcesList2"
            :key="index"
            @click="resourcesJump(item)"
          >
            <div class="resource-name">{{ item.resourceInfoName }}</div>
            <div
              class="resource-classification"
              v-if="item.resourceDisplay == 1"
            >
              {{
                `${item.sname}${item.subjectName}（${item.spublishers}） | ${item.stitle}${item.catalogName}`
              }}
            </div>
            <div
              class="resource-classification"
              v-else-if="item.resourceDisplay == 2"
            >
              {{ item.catalogName }}
            </div>
          </li>
        </ul>
        <div
          :style="{ padding: '20px 0 40px 0', textAlign: 'center' }"
          v-if="resourcesList2.length == 0"
        >
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Personal-resource",
  components: {},
  data() {
    return {
      resourcesList: [], // 资源列表
      resourcesList2: [], // 资源列表
      pageForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        hotNewDownload: 1,
        workspaceId: this.$store.getters.workspaceId,
        memberId: this.$route.query.memberId,
      },
      pageForm2: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
        hotNewDownload: 2,
        workspaceId: this.$store.getters.workspaceId,
        memberId: this.$route.query.memberId,
      },
      none: false,
    };
  },
  created() {
    this.getList(); // 获取列表
    this.$api.personalResources(this.pageForm2).then((res) => {
      this.resourcesList2 = res.data.data.rows;
    });
  },
  mounted() {},
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
    },
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
};
</script>
<style lang="less" scoped>
.Personal-resource {
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

    font-weight: 600;
    color: #5b920b;
    line-height: 45px;
    > span {
      font-size: 18px;
    }
  }
  .left-box {
    margin-right: 20px;
    width: 900px;
    background-color: #fff;
    > .box {
      border: 1px solid #e1e1e1;
      border-radius: 4px 4px 0 0;
      border-bottom: none;
    }
    // 资源列表
    > .resource-list {
      padding: 24px 22px 0 22px;
      box-sizing: border-box;
      background-color: #fff;
      > .list {
        margin-bottom: 24px;
        box-sizing: border-box;
        padding: 16px 20px;
        border: 1px solid #dbdbdb;
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
  .right-box {
    box-sizing: border-box;
    width: 280px;
    background-color: #fff;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    > .box {
    }
    > ul {
      padding-top: 20px;
      > li {
        cursor: pointer;
        position: relative;
        padding: 0 19px 0 24px;
        margin-bottom: 24px;
        > .resource-name {
          margin-bottom: 8px;
          font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
          font-weight: 600;
          color: #111110;
        }
        > .resource-classification {
          line-height: 14px;
          font-size: 12px;
          color: rgba(61, 61, 61, 0.6);
        }
      }
      > li::before {
        content: "";
        position: absolute;
        top: 4px;
        left: 11px;
        width: 6px;
        height: 6px;
        background-color: #5b920b;
        border-radius: 50%;
      }
    }
  }
}
</style>