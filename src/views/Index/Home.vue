<template>
  <div class="Home">
    <div class="column-title">
      精品课例
      <el-pagination
        :pager-count="5"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange1"
        :current-page.sync="lesson1Form.pageNum"
        :page-size="lesson1Form.pageSize"
        :total="lesson1Form.total"
      >
      </el-pagination>
    </div>
    <!-- 名师课例 -->
    <div class="lesson">
      <el-row :gutter="30" v-if="lesson1List.length > 0">
        <el-col
          :xs="24"
          :sm="24"
          :md="8"
          :lg="8"
          :xl="8"
          v-for="(item, index) in lesson1List"
          :key="index"
        >
          <div class="box" @click="resourcesJump(item)">
            <div class="top">
              <img
                :src="
                  item.coverPlan ||
                  'https://oss.hnedu.cn/img/profilePicture/2021-03-24/1616569802355.png'
                "
                alt=""
              />
              <div class="cover">
                <div>
                  <img src="../../assets/images/Home/views.png" alt="" />
                  <span>{{ item.viewNum }}</span>
                </div>
                <div>
                  <img src="../../assets/images/Home/download.png" alt="" />
                  <span>{{ item.resourceDownload }}</span>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="resource-name text-overflow-1">
                {{ item.resourceInfoName }}
              </div>
              <div class="teacher">
                <img :src="item.avatar" alt="" />
                <div class="text-overflow-1">{{ item.username }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 暂无数据 -->
      <no-data
        v-else
        style="border-radius: 8px"
        :data="{
          img: require('../../assets/images/Index/none2.png'),
          width: '230px',
          height: '166px',
          titleList: ['抱歉！', '暂无精品课例'],
        }"
      />
    </div>
    <div class="column-title">
     精品研修
      <el-pagination
        :pager-count="5"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange2"
        :current-page.sync="lesson2Form.pageNum"
        :page-size="lesson2Form.pageSize"
        :total="lesson2Form.total"
      >
      </el-pagination>
    </div>
    <!-- 名师课例 -->
    <div class="lesson">
      <el-row :gutter="30" v-if="lesson2List.length > 0">
        <el-col
          :xs="24"
          :sm="24"
          :md="8"
          :lg="8"
          :xl="8"
          v-for="(item, index) in lesson2List"
          :key="index"
        >
          <div class="box" @click="resourcesJump(item)">
            <div class="top">
              <img
                :src="
                  item.coverPlan ||
                  'https://oss.hnedu.cn/img/profilePicture/2021-03-24/1616569901015.png'
                "
                alt=""
              />
              <div class="cover">
                <div>
                  <img src="../../assets/images/Home/views.png" alt="" />
                  <span>{{ item.viewNum }}</span>
                </div>
                <div>
                  <img src="../../assets/images/Home/download.png" alt="" />
                  <span>{{ item.resourceDownload }}</span>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="resource-name text-overflow-1">
                {{ item.resourceInfoName }}
              </div>
              <div class="teacher">
                <img :src="item.avatar" alt="" />
                <div class="text-overflow-1">{{ item.username }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 暂无数据 -->
      <no-data
        v-else
        style="border-radius: 8px"
        :data="{
          img: require('../../assets/images/Index/none2.png'),
          width: '230px',
          height: '166px',
          titleList: ['抱歉！', '暂无精品课例'],
        }"
      />
    </div>
    <div class="column-title">研修成果</div>
    <!-- 研修成果 -->
    <div class="resources">
      <div class="box-border" v-if="$store.getters.lwStudio"></div>
      <div
        class="left-box"
        :style="$store.getters.lwStudio ? { borderRadius: '15px' } : {}"
        v-if="resourcesList1[0] && resourcesList1[0] !== undefined"
      >
        <div class="title">
          教学
          <br />
          设计
        </div>
        <div class="resource-name" @click="resourcesJump(resourcesList1[0])">
          {{ resourcesList1[0].resourceInfoName }}
        </div>
        <div class="resource-type">
          {{ resourcesList1[0].resourceDisplay | resourceDisplay }}
        </div>
        <div class="resource-teacher clearfix">
          <div>
            <img src="../../assets/images/Home/user.png" alt="" />
            <span>{{ resourcesList1[0].username }}</span>
          </div>
          <div>
            <img src="../../assets/images/Home/date.png" alt="" />
            <span>{{ resourcesList1[0].uploadTime }}</span>
          </div>
        </div>
        <router-link tag="div" :to="{
          path: '/Resources-achievement',
        }" class="more-btn">
          查看更多
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </div>
      <div class="right-box">
        <el-row
          v-for="(item, index) in resourcesList1"
          v-show="index !== 0 && index < 8"
          :key="index"
          @click.native="resourcesJump(item)"
        >
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
            <div class="resource-type">
              {{ item.resourceDisplay | resourceDisplay }}
            </div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="10" :xl="10">
            <div class="resource-name">{{ item.resourceInfoName }}</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
            <div class="resource-teacher">{{ item.username }}</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
            <div class="resource-views">{{ item.viewNum }}人观看</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
            <div class="resource-date">{{ item.uploadTime }}</div>
          </el-col>
        </el-row>
        <!-- 暂无数据 -->
        <div class="none" v-if="resourcesList1.length == 0">
          <img src="../../assets/images/Index/none2.png" alt />
          <p>抱歉！</p>
          <p>暂无资源</p>
        </div>
      </div>
    </div>
    <div class="resources resources2">
      <div class="box-border" v-if="$store.getters.lwStudio"></div>
      <div
        class="left-box"
        v-if="resourcesList2[0] && resourcesList2[0] !== undefined"
        :style="$store.getters.lwStudio ? { borderRadius: '15px' } : {}"
      >
        <div class="title">
          教学
          <br />
          反思
        </div>
        <div class="resource-name" @click="resourcesJump(resourcesList2[0])">
          {{ resourcesList2[0].resourceInfoName }}
        </div>
        <div class="resource-type">
          {{ resourcesList2[0].resourceDisplay | resourceDisplay }}
        </div>
        <div class="resource-teacher clearfix">
          <div>
            <img src="../../assets/images/Home/user.png" alt="" />
            <span>{{ resourcesList2[0].username }}</span>
          </div>
          <div>
            <img src="../../assets/images/Home/date.png" alt="" />
            <span>{{ resourcesList2[0].uploadTime }}</span>
          </div>
        </div>
        <router-link router-link tag="div" :to="{
          path: '/Resources-achievement',
        }" class="more-btn">
          查看更多
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </div>
      <div class="right-box">
        <el-row
          v-for="(item, index) in resourcesList2"
          v-show="index !== 0 && index < 8"
          :key="index"
          @click.native="resourcesJump(item)"
        >
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
            <div class="resource-type">
              {{ item.resourceDisplay | resourceDisplay }}
            </div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="10" :xl="10">
            <div class="resource-name">{{ item.resourceInfoName }}</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
            <div class="resource-teacher">{{ item.username }}</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
            <div class="resource-views">{{ item.viewNum }}人观看</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
            <div class="resource-date">{{ item.uploadTime }}</div>
          </el-col>
        </el-row>
        <!-- 暂无数据 -->
        <div class="none" v-if="resourcesList2.length == 0">
          <img src="../../assets/images/Index/none2.png" alt />
          <p>抱歉！</p>
          <p>暂无资源</p>
        </div>
      </div>
    </div>
    <div class="column-title">风采展示</div>
    <!-- 成果展示 -->
    <div class="Achievement-display">
      <div class="box-border" v-if="$store.getters.lwStudio"></div>
      <el-carousel
        :interval="2000"
        arrow="always"
        v-if="Achievement_display_List.length > 0"
      >
        <el-carousel-item
          v-for="(item, index) in Achievement_display_List"
          :key="index"
        >
          <ul>
            <li v-for="(item2, index2) in item" :key="index2">
              <img :src="item2" alt="" @click="imgClick(item2)" />
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
      <!-- 暂无数据 -->
      <no-data
        v-else
        style="border-radius: 8px"
        :data="{
          img: require('../../assets/images/Index/none2.png'),
          width: '230px',
          height: '166px',
          titleList: ['抱歉！', '暂无风采展示'],
        }"
      />
    </div>
    <div class="column-title">
      最新动态
      <router-link
        tag="div"
        to="Upload-resources"
        class="resources-upload-btn hidden-xs-only"
        v-if="$store.getters.workspaceMember"
      >
        <img
          src="../../assets/images/TeachingAndResearch-resources/upload.png"
          alt
        />
        资源上传
      </router-link>
    </div>
    <!-- 动态 -->
    <div class="dynamic">
      <div class="box-border" v-if="$store.getters.lwStudio"></div>
      <div class="list clearfix" v-if="newsDynamicList.length > 0">
        <ul class="clearfix">
          <li
            class="clearfix"
            v-for="(item, index) in newsDynamicList"
            :key="index"
            v-show="index < 5"
          >
            <div class="line"></div>
            <img :src="item.avatar" alt="" />
            <div class="userName">{{ item.username }}</div>
            <div class="time">{{ item.auditTime }}</div>
            <div class="resource-type clearfix">
              <div>发表了资源</div>
              <div>{{ item.resourcetypeName | stringCutting(3) }}</div>
            </div>
            <div class="resource" @click="resourcesJump(item)">
              <img
                :src="
                  require(`../../assets/images/fileType/${item.resourceFormatIDfk}.png`)
                "
                alt=""
              />
              <div class="resource-name">
                {{ item.resourceInfoName | stringCutting(12) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 暂无数据 -->
      <no-data
        v-else
        style="border-radius: 8px"
        :data="{
          img: require('../../assets/images/Index/none2.png'),
          width: '230px',
          height: '166px',
          titleList: ['抱歉！', '暂无风采展示'],
        }"
      />
    </div>
    <!-- 图片预览 -->
    <!-- <el-image-viewer v-if="imgShow" :on-close="imgClick" :url-list="[imgUrl]" /> -->
  </div>
</template>
<script>
// import ElImageViewer from "element-ui/packages/image/src/image-viewer.vue";
import NoData from "../../components/No_data";
export default {
  name: "Home",
  // components: { ElImageViewer },
  components: { NoData },
  data() {
    return {
      newsDynamicList: [], // 最新动态列表
      resourcesList1: [], // 资源列表
      resourcesList2: [], // 资源列表
      lesson1List: [], // 课例列表
      lesson2List: [],
      lesson1Form: {
        workspaceId: this.$store.getters.workspaceId,
        recommendation: 1,
        pageNum: 1,
        pageSize: 3,
        total: 0,
      },
      lesson2Form: {
        workspaceId: this.$store.getters.workspaceId,
        recommendation: 2,
        pageNum: 1,
        pageSize: 3,
        total: 0,
      },
      Achievement_display_List: [], // 成果展示列表
      imgUrl: "",
      picList: [],
      imgShow: false,
    };
  },
  created() {
    this.getLesson(this.lesson1Form); // 获取课例
    this.getLesson(this.lesson2Form);
    this.getResourcesList(1); // 教学设计
    this.getResourcesList(6); // 教学反思
    this.getAchievement_display(); // 获取成果展示
    this.getNewsDynamicList(); // 获取最新动态
  },
  mounted() {},
  methods: {
    // 获取最新动态
    getNewsDynamicList() {
      this.$api
        .NewsDynamic({
          pageSize: 5,
          pageNum: 1,
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.newsDynamicList = res.data.data.records;
          }
        });
    },
    // 获取课例
    getLesson(form) {
      this.$api.Lesson(form).then((res) => {
        if (form.recommendation == 1) {
          this.lesson1List = res.data.data.records;
          this.lesson1Form.total = res.data.data.total;
        } else {
          this.lesson2List = res.data.data.records;
          this.lesson2Form.total = res.data.data.total;
        }
      });
    },
    handleCurrentChange1(val) {
      this.lesson1Form.pageNum = val;
      this.getLesson(this.lesson1Form); //
    },
    handleCurrentChange2(val) {
      this.lesson2Form.pageNum = val;
      this.getLesson(this.lesson2Form); //
    },
    // 获取资源列表
    getResourcesList(resourceFormatId) {
      this.$api
        .findworkSpaceResourceByFormat({
          workspaceId: this.$store.getters.workspaceId,
          resourceFormatId: resourceFormatId,
          pageNum: 1,
          pageSize: 9,
        })
        .then((res) => {
          if (resourceFormatId == 1) {
            this.resourcesList1 = res.data.data.records;
          } else {
            this.resourcesList2 = res.data.data.records;
          }
        });
    },
    // 获取成果展示
    getAchievement_display() {
      this.$api
        .Achievement_display({ workspaceId: this.$store.getters.workspaceId })
        .then((res) => {
          if (JSON.parse(res.data.data.imgAddr).length > 0) {
            this.Achievement_display_List = this.group(
              JSON.parse(res.data.data.imgAddr),
              3
            );
          }
        });
    },
    // 图片点击
    imgClick(item) {
      // if (item == undefined) {
      //   this.imgShow = false;
      //   let m = function (e) {
      //     e.preventDefault();
      //   };
      //   // 开启页面滚动
      //   document.body.style.overflow = "auto";
      //   document.addEventListener("touchmove", m, { passive: true });
      // } else {
      //   this.imgUrl = item;
      //   this.imgShow = true;
      //   let m = function (e) {
      //     e.preventDefault();
      //   };
      //   // 停止页面滚动
      //   document.body.style.overflow = "hidden";
      //   document.addEventListener("touchmove", m, { passive: false });
      // }
    },
    // 切割数组
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
    // 资源跳转
    resourcesJump(item) {
      var data = {
        id: item.resourceInfoID,
        sversionId: item.gradeId,
        resourceFormatIdFk: item.resourceFormatIDfk,
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
                id: item.resourceInfoID,
                sversionId: item.gradeId,
                resourceFormatIdFk: item.resourceFormatIDfk,
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
          id: item.resourceInfoID,
          sversionId: item.gradeId,
          resourceFormatIdFk: item.resourceFormatIDfk,
          token: this.$store.getters.token,
        };
        this.$fun.resourcesJump(data);
      }*/
    },
  },
  filters: {
    resourceDisplay(val) {
      if (val) {
        if (val == 1) {
          return "国标教材";
        } else {
          return "校本教材";
        }
      }
    },
  },
};
</script>
<style lang="less">
.Home {
  .el-pagination {
    padding: 0 !important;
  }
  .column-title {
    padding: 24px 0 16px 0;
    font-size: 24px;
    font-weight: 600;
    color: #2a2a2a;
    > div {
      cursor: pointer;
      float: right;
      font-size: 14px;
      color: rgba(42, 42, 42, 0.4);
      font-weight: normal;
    }
    .resources-upload-btn {
      cursor: pointer;
      float: right;
      width: 137px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      background: #5688ff;
      border-radius: 21px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      > img {
        margin-right: 10px;
        width: 22px;
        height: 22px;
        vertical-align: middle;
      }
    }
  }
  // 名师课例
  > .lesson {
    position: relative;
    min-height: 208px;
    > .el-row {
      > .el-col {
        > .box {
          cursor: pointer;
          overflow: hidden;
          height: 208px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.18);
          > .top {
            position: relative;
            width: 100%;
            height: 158px;
            > img {
              width: 100%;
              height: 100%;
            }
            > .cover {
              position: absolute;
              bottom: 0;
              padding-left: 9px;
              height: 34px;
              width: 100%;
              background: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0),
                rgba(0, 0, 0, 0.55)
              );
              > div {
                padding-top: 9px;
                float: left;
                > img {
                  margin-right: 4px;
                  width: 22px;
                  height: 22px;
                  vertical-align: middle;
                }
                > span {
                  font-size: 14px;
                  color: #ffffff;
                }
              }
              > div:nth-child(1) {
                margin-right: 31px;
              }
            }
          }
          > .bottom {
            padding: 0 14px;
            height: 50px;
            > .resource-name {
              float: left;
              font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
              font-weight: 600;
              line-height: 50px;
              color: #111110;
              width: 160px;
            }
            > .teacher {
              float: right;
              line-height: 50px;
              > img {
                display: block;
                float: left;
                transform: translateY(12px);
                margin-right: 5px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
              }
              > div {
                float: left;
                font-size: 15px;
                color: rgba(49, 49, 49, 0.6);
                width: 50px;
              }
            }
          }
        }
      }
    }
  }
  // 教研资源
  > .resources {
    position: relative;
    height: 370px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    > div {
      float: left;
    }
    > .left-box {
      box-sizing: border-box;
      padding-left: 32px;
      width: 289px;
      height: 100%;
      background: url(../../assets/images/Home/bg1.png) no-repeat;
      background-size: 100% 100%;
      > .title {
        margin: 45px 0 30px 0;
        width: 125px;
        height: 125px;
        border: 2px solid #ffffff;
        line-height: 62.5px;
        font-size: 40px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #ffffff;
      }
      > .resource-name {
        position: relative;
        z-index: 9;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
      }
      > .resource-type {
        margin: 12px 0;
        width: 62px;
        height: 21px;
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 4px;
        font-size: 12px;
        line-height: 21px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
      }
      > .resource-teacher {
        margin-bottom: 20px;
        > div {
          float: left;
          > img {
            margin-right: 4px;
            width: 13px;
            height: 13px;
            vertical-align: middle;
          }
          > span {
            font-size: 13px;
            color: #ffffff;
          }
        }
        > div:nth-child(1) {
          margin-right: 24px;
        }
      }
      > .more-btn {
        position: relative;
        z-index: 9;
        cursor: pointer;
        width: 104px;
        height: 31px;
        background: #ffffff;
        border-radius: 16px;
        line-height: 31px;

        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
        font-weight: 600;
        text-align: center;
        color: #4d7da7;
        letter-spacing: 1px;
        > i {
          font-weight: 700;
        }
      }
    }
    > .right-box {
      padding: 28px 0 0 24px;
      box-sizing: border-box;
      width: 611px;
      height: 100%;
      > .el-row {
        cursor: pointer;
        > .el-col {
          margin-bottom: 24px;
          > div {
            line-height: 24px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          > .resource-type {
            width: 64px;
            height: 24px;
            background: #4d7da7;
            border-radius: 2px;

            font-size: 10px;
            font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
            font-weight: 600;
            text-align: center;
            line-height: 24px;
            color: #ffffff;
          }
          > .resource-name {
            font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
            font-weight: 600;
            color: #000000;
          }
          > .resource-teacher {
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            color: #111110;
          }
          > .resource-views,
          > .resource-date {
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            color: rgba(17, 17, 16, 0.6);
          }
        }
      }
    }
  }
  > .resources2 {
    margin-top: 23px;
    > .left-box {
      background: url(../../assets/images/Home/bg2.png) no-repeat;
      > .more-btn {
        color: #b77171 !important;
      }
    }
    > .right-box {
      .resource-type {
        background: #b77171 !important;
      }
    }
  }
  // 成果展示
  > .Achievement-display {
    position: relative;
    min-height: 230px;
    background: #ffffff;
    border-radius: 8px;
    .el-carousel {
      height: 230px;
      border-radius: 8px;
      overflow: hidden;
      .el-carousel__container {
        height: 100%;
        .el-carousel__item {
          padding: 31px 51px 0 51px;
          box-sizing: border-box;
          ul {
            > li {
              float: left;
              margin-right: 24px;
              > img {
                cursor: pointer;
                width: 250px;
                height: 176px;
                border-radius: 2px;
              }
            }
            > li:nth-child(3n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  // 动态
  > .dynamic {
    position: relative;
    min-height: 249px;
    border-radius: 8px;
    margin-top: 10px;
    background-color: #fff;
    > .list {
      > ul {
        padding: 18px 32px 23px 32px;
        > li {
          position: relative;
          padding-right: 32px;
          float: left;
          width: 140px;
          > .line {
            position: absolute;
            top: 24px;
            width: 100%;
            height: 1px;
            background-color: #bbb;
          }
          > img {
            position: relative;
            z-index: 9;
            margin: 0 auto;
            display: block;
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
          > .userName {
            padding: 16px 0 8px 0;
            font-size: 14px;
            text-align: center;
            color: #111110;
          }
          > .time {
            margin-bottom: 29px;
            font-size: 14px;
            text-align: center;
            color: rgba(17, 17, 16, 0.4);
          }
          > .resource-type {
            margin-bottom: 20px;
            font-size: 12px;
            > div:nth-child(1) {
              float: left;
              line-height: 20px;
              color: #111110;
            }
            > div:nth-child(2) {
              float: right;
              box-sizing: border-box;
              width: 64px;
              padding: 4px 8px;
              background-color: rgba(86, 136, 255, 0.1);
              border-radius: 4px;
              font-weight: 600;
              text-align: center;
              color: #5688ff;
            }
          }
          > .resource {
            cursor: pointer;
            word-break: break-all;
            > img {
              margin-right: 10px;
              display: block;
              float: left;
              width: 20px;
              height: 22px;
              vertical-align: middle;
            }
            > .resource-name {
              overflow: hidden;
              font-size: 14px;
              font-weight: 600;
              color: #111110;
              line-height: 21px;
            }
          }
        }
        > li:nth-child(5n) {
          padding-right: 0;
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
      height: 166px;
    }
    > span {
      font-size: 26px;
      font-weight: 600;
      color: #6a7588;
      letter-spacing: 3px;
    }
    > p {
      margin-bottom: 4px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      text-align: center;
      color: #a9b1b6;
    }
  }
  .none2 {
    > img {
      width: 230px;
      height: 166px;
    }
  }
}
</style>