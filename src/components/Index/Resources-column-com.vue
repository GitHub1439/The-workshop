<template>
  <div class="Resources-column-components" :key="comIndex + 1">
    <!-- 资源列表 -->
    <div class="resources-list">
      <div class="container clearfix">
        <!-- 分类 -->
        <div class="classification clearfix">
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <ul>
                <li
                  :class="classificationActive == index ? 'li-active' : ''"
                  v-for="(item, index) in classificationList"
                  :key="index"
                  @click="classificationChange(item, index)"
                >
                  {{ item }}
                </li>
              </ul>
            </el-col>
            <el-col :xs="12" :sm="6" :md="8" :lg="8" :xl="8">
              <el-input
                placeholder="资源名称"
                v-model="pageForm.resourceInfoName"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-select
                v-if="selectFlag == '1'"
                v-model="pageForm.resourceFormatIdFk"
                placeholder="资源格式"
                @change="selectChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.resourceFormatId"
                  :label="item.resourceFormatName"
                  :value="item.resourceFormatId"
                ></el-option>
              </el-select>
              <el-select
                v-else
                v-model="pageForm.resourceFormatIdFk"
                placeholder="资源格式"
                @change="selectChange2"
              >
                <el-option
                  v-for="item in options"
                  :key="item.resourceFormatId"
                  :label="item.resourceFormatName"
                  :value="item.resourceFormatId"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="4">
              <div class="count">
                共
                <span>{{ pageForm.total }}</span> 个结果
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 列表 -->
        <el-row
          class="list"
          v-for="(item, index) in resourcesList"
          :key="index"
        >
          <el-col :xs="24" :sm="6" :md="21" :lg="21" :xl="21">
            <div class="box-top clearfix">
              <img
                :src="
                  require(`../../assets/images/fileType2/${item.resourceFormatIdFk}.png`)
                "
                alt
              />
              <div class="resources-name">{{ item.resourceInfoName }}</div>
              <div class="resources-classification">
                {{ item.resourceInfoDescription | resourceDiscription }}
              </div>
              <ul>
                <!-- <li>{{ item.catalogName }}</li> -->
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
          <el-col :xs="24" :sm="6" :md="3" :lg="3" :xl="3" style="float: right">
            <div class="see-resources-btn" @click="resourcesJump(item)">
              查看资源
            </div>
          </el-col>
        </el-row>
        <!-- 暂无数据 -->
        <no-data
          v-if="none"
          style="border-radius: 8px"
          :data="{
            img: require('../../assets/images/Index/none2.png'),
            width: '517px',
            height: '371px',
            titleList: ['抱歉！', '暂无资源'],
          }"
        />
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageForm.pageNum"
          :page-size="pageForm.pageSize"
          layout="prev, pager, next, total, jumper"
          :total="pageForm.total"
          hide-on-single-page
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import NoData from "../../components/No_data";
export default {
  name: "Resources-column-components",
  props: ["pageForm", "selectFlag"],
  components: { NoData },
  data() {
    return {
      comIndex: 0,
      options: [], // 分类
      classificationActive: 0, // 分类选中
      classificationList: ["全部", "最热", "下载量", "评分", "最新"], // 分类列表
      resourcesList: [], // 资源列表
      none: false, // 暂无数据
    };
  },
  created() {},
  mounted() {
    this.getTypeList(); // 获取类型列表
    this.getList(); // 获取列表
    this.getOptions(); // 获取资源格式
  },
  methods: {
    // 分类选中
    classificationChange(item, index) {
      this.classificationActive = index;
      this.pageForm.sort = index;
      this.pageForm.pageNum = 1;
      this.getList(); // 获取列表
    },
    // 获取类型列表
    getTypeList() {
      this.$api.findTypeAll().then((res) => {
        this.typeList = res.data.data;
      });
    },
    // 获取资源格式
    getOptions() {
      this.$api.findFormatAll().then((res) => {
        this.options = res.data.data;
      });
    },
    // 选择框
    selectChange(val) {
      this.pageForm.pageNum = 1;
      this.pageForm.resourceFormatId = val;
      this.getList(); // 获取列表
    },
    // 选择框
    selectChange2(val) {
      this.pageForm.pageNum = 1;
      this.pageForm.resourceFormatIdFk = val;
      this.getList(); // 获取列表
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getList(); // 获取列表
      scrollTo(0, 200);
    },
    // 获取列表
    getList() {
      this.$emit("getList");
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
      } else{
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
  watch: {
    $route(to, from) {
      this.pageForm.columnId = "";
      this.getList(); // 获取列表
    },
  },
  filters: {
    resourceDiscription(val) {
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
<style lang="less">
.Resources-column-components {
  // 资源列表
  > .resources-list {
    > .container {
      border-radius: 8px;
      width: 100%;
      padding: 0 24px;
      box-sizing: border-box;
      background-color: #fff;
      // 分类
      > .classification {
        padding: 26px 0 14px 0;
        border-bottom: 1px solid rgba(12, 12, 12, 0.1);
        margin-bottom: 25px;
        ul {
          > li {
            cursor: pointer;
            padding: 7px 13px;
            float: left;
            margin-right: 10px;
            font-size: 12px;
            text-align: center;
            color: rgba(29, 29, 29, 0.6);
          }
          > .li-active {
            color: #ffffff;
            background-color: #0a76d9;
          }
        }
        .el-input {
          width: 103px;
          margin-right: 7px;
        }
        .el-input__inner {
          height: 27px;
          line-height: 27px;
        }
        .el-input__icon {
          line-height: 27px;
        }
        .el-select {
          > .el-input {
            > input {
              height: 27px;
              // width: 150px;
            }
            .el-input__icon {
              line-height: 0;
            }
          }
        }
        .count {
          line-height: 27px;
          font-size: 12px;
          color: rgba(33, 33, 33, 0.4);
          > span {
            font-size: 15px;
            color: #212121;
          }
        }
      }
      // 列表
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
                margin-right: 10px;
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
</style>