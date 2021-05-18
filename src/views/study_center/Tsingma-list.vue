<template>
  <div class="Tsingma-list">
    <H></H>

    <!-- tab -->
    <ul class="tab-first">
      <li
        v-for="(item, index) in TsingmaTabs"
        :key="index"
        :class="{ addSelect: index == firstIndex }"
        @click="handelTabFirst(item, index)"
      >
        {{ item.qingmaOnlineSubjectName }}
      </li>
    </ul>
    <ul class="tab-second" v-if="isTabSecond">
      <li
        v-for="(item, index) in tabSecondList"
        :key="index"
        :class="{ addSelect: index == secondIndex }"
        @click="handelTabSecond(item, index)"
      >
        {{ item.qingmaOnlineSubjectName }}
      </li>
    </ul>

    <div class="container">
      <!-- 检索 -->
      <div class="search">
        <el-input
          placeholder="资源名称"
          @input="changeInput"
          v-model="pageForm.qingmaOnlineName"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <div>共 <span>{{ pageForm.total }} </span>个结果</div>
      </div>
      <!-- list -->
      <ul class="list">
        <li
          v-for="(item, index) in TsingmaData"
          :key="index"
          @click="handleResource(item)"
        >
          <img :src="item.qingmaOnlineImage" alt="" />
          <div class="works-info">
            <div class="works-name">{{ item.qingmaOnlineName }}</div>
            <ul>
              <li>
                <i class="iconfont">&#xe625;</i
                >{{ item.qingmaOnlineVisitCount }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="pageForm.pageNum"
      :page-size="pageForm.pageSize"
      :total="pageForm.total"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>
<script>
import H from "../../components/common/header";
export default {
  components: {
    H,
  },
  data() {
    return {
      firstIndex: this.$route.query.tabIndex, //一级tab   index
      secondIndex: 0, //二级tab   index
      isTabSecond: false,
      tabSecondList: [],
      TsingmaTabs: [],
      pageForm: {
        pageSize: 12,
        pageNum: 1,
        total: 0,
        qingmaOnlineName: "",
        qingmaOnlineSubjectID: "",
      },
      options: [{}],
      TsingmaData: [],
      timer:null,
      projectName:''
    };
  },
  created() {
    this.getTsingmaSubject();
  },
  mounted() {},
  methods: {
    // 一级tab栏事件
    handelTabFirst(item, index) {
      this.firstIndex = index;
      this.pageForm.qingmaOnlineSubjectID = item.qingmaOnlineSubjectID;
      this.secondIndex = 0;
      if (item.secondaryList.length > 0) {
        this.tabSecondList = item.secondaryList;
        this.pageForm.qingmaOnlineSubjectID = item.secondaryList[0].qingmaOnlineSubjectID;
        this.isTabSecond = true;
      } else {
        this.isTabSecond = false;
      }
      this.getQingma();
      this.projectName = item.qingmaOnlineSubjectName
    },
    // 二级tab栏事件
    handelTabSecond(item, index) {
      this.secondIndex = index;
      this.pageForm.qingmaOnlineSubjectID = item.qingmaOnlineSubjectID;
      this.getQingma();
      this.projectName = item.qingmaOnlineSubjectName
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getQingma();
    },
    // 点击资源
    handleResource(item) {
      this.$fun.openPage(
        "Tsingma-resources-details",
        `?resourcesFormat=${2}&qingmaOnlineId=${item.qingmaOnlineId}&projectName=${this.projectName}`
      );
      // 增加浏览量
      this.$api
        .addTsingmaViews({ qingmaOnlineId: item.qingmaOnlineId })
        .then((res) => {});
    },
    // 获取青马在线专题
    getTsingmaSubject() {
      let that = this;
      this.$api.TsingmaSubject().then((res) => {
        if (res.data.code == 200) {
          this.TsingmaTabs = res.data.data;
          this.TsingmaTabs.unshift({
            qingmaOnlineSubjectID: "",
            qingmaOnlineSubjectName: "全部",
            secondaryList: [],
          });
          res.data.data.forEach((item, index) => {
            if (this.firstIndex == index) {
              if (item.secondaryList.length > 0) {
                that.isTabSecond = true;
                that.tabSecondList = item.secondaryList;
                that.pageForm.qingmaOnlineSubjectID =
                  item.secondaryList[0].qingmaOnlineSubjectID;
              } else {
                that.pageForm.qingmaOnlineSubjectID =
                  item.qingmaOnlineSubjectID;
              }
              this.projectName = item.qingmaOnlineSubjectName
            }
          });
          this.getQingma();
        }
      });
    },
    // 检索青马名称
    changeInput() {
      window.clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
          this.getQingma();
      },500)
    },
    // 青马在线资源
    getQingma() {
      this.$api.getTsingma(this.pageForm).then((res) => {
        this.TsingmaData = res.data.data.rows;
        this.pageForm.total = res.data.data.total;
      });
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.Tsingma-list {
  /deep/ .el-pagination .btn-prev,
  /deep/ .el-pagination .btn-next {
    width: 96px;
    height: 44px;
    background: #f0f0f0;
    border-radius: 4px;
  }
  /deep/ .el-pager li {
    width: 64px;
    height: 44px;
    border: 1px solid #bbbbbb;
    border-radius: 5px;
    line-height: 44px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
    margin: 0 10px;
  }
  /deep/ .el-pager li.active {
    background: #c60000;
    color: #fff;
  }
  > .tab-first {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    width: 1200px;
    margin: 0 auto;
    > li {
      font-size: 20px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #000000;
      transition: all 0.5s ease;
      padding: 10px 22px 8px 22px;
      margin-right: 97px;
      cursor: pointer;
      margin-top: 20px;
    }
    > .addSelect {
      background: #f6f6f6;
      color: #c60000;
      border-bottom: 1px solid #c60000;
    }
  }
  > .tab-second {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 20px 0;
    background: #f6f6f6;
    > .addSelect {
      color: #fff;
      background: #c60000;
    }
    > li {
      transition: all 0.5s ease;
      width: 181px;
      height: 45px;
      background: #ffffff;
      border: 1px solid #999999;
      border-radius: 6px;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #000000;
      line-height: 45px;
      margin-right: 24px;
      cursor: pointer;
    }
  }
  > .container {
    > .search {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
      > .el-input {
        width: 30%;
        margin-right: 30px;
      }
      > div {
        font-size: 12px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: rgba(33, 33, 33, 0.4);
        > span {
          font-size: 18px;
          color: #212121;
        }
      }
    }
    > .list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      margin-top: 35px;
      &::after {
        content: "";
        width: 380px;
      }
      > li {
        width: 380px;
        height: 325px;
        cursor: pointer;
        margin-bottom: 30px;
        box-shadow: 0 10px 30px 0 rgb(202, 202, 202);
        border-radius: 8px;
        &:hover {
          box-shadow: 0 10px 30px 0 rgb(202, 202, 202);
        }
        > img {
          width: 380px;
          height: 245px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        > .works-info {
          padding: 12px 13px;
          background: #fff;
          > .works-name {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: left;
            color: #212121;
          }
          > ul {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
            display: flex;
            justify-content: space-between;
            margin-top: 11px;
            > li {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>