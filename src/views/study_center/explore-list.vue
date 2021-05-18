<template>
  <div class="explore-list">
    <H></H>
    <!-- tab -->
    <ul class="tab-first">
      <li
        v-for="(item, index) in fastclasstabs"
        :key="index"
        :class="{ addSelect: item.id == pageForm.projectId }"
        @click="handelTab(item, index)"
      >
        {{ item.projectName }}
      </li>
    </ul>
    <div class="container">
       <div class="search">
        <el-input
          placeholder="资源名称"
          @input="changeInput"
          v-model="pageForm.title"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-select v-model="pageForm.resourcesFormat" placeholder="请选择资源格式" @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.resourcesFormat"
            :label="item.label"
            :value="item.resourcesFormat"
          >
          </el-option>
        </el-select>
        <div class="total">
          共 <span>{{ pageForm.total }} </span>个结果
        </div>
      </div>
      <!-- list -->
      <ul class="list">
        <li
          v-for="(item, index) in listData"
          :key="index"
          @click="
           handleResource(item)
          "
        >
          <img :src="require(`../../assets/images/explore-file-type/${item.resourcesFormat}.png`)" alt="" />
          <div class="works-info">
            <div class="works-name">{{item.title}}</div>
            <ul>
              <li>上传老师:{{item.uploadName}}</li>
              <li><i class="iconfont">&#xe625;</i>{{item.shortVedioVisitCount}}</li>
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
     
      fastclasstabs: [],
      pageForm: {
        pageSize: 12,
        pageNum: 1,
        total: 0,
        projectId: this.$route.query.tabIndex,
        title: "",
        resourcesFormat: "",
      },
      options: [
        {
          label: "全部",
          resourcesFormat: '',
        },
        {
          label: "文档",
          resourcesFormat: 1,
        },
        {
          label: "视频",
          resourcesFormat: 2,
        },
        {
          label: "音频",
          resourcesFormat: 3,
        },
        {
          label: "图片",
          resourcesFormat: 4,
        },
        {
          label: "压缩文件",
          resourcesFormat: 5,
        },
      ],
      listData: [],
      timer:null,
      projectName:''
    };
  },
  created() {
    // 获取专题
    this.getFastclassSubject();
  },
  mounted() {},
  methods: {
    // 切换栏
    handelTab(item, index) {
      this.pageForm.projectId = item.id;
      this.projectName = item.projectName;
      this.getfastclass();
    },
    // 获取数据
    getfastclass() {
      this.$api.getStudyResource(this.pageForm).then((res) => {
        this.listData = res.data.data.rows;
        this.pageForm.total = res.data.data.total;
      });
    },
     // 检索资源格式
    selectChange(){
      this.getfastclass();
    },
    // 快课秀专题资源查询
    getFastclassSubject() {
      this.$api.getStudyResourceSubject().then((res) => {
        this.fastclasstabs = res.data.data;
        this.fastclasstabs.unshift({
          id: '',
          projectName: "全部",
        });
        this.fastclasstabs.forEach((item, index) => {
          if (this.pageForm.projectId == item.id) {
            this.pageForm.projectId = item.id;
            this.projectName = item.projectName;
          }
        });
        this.getfastclass();
      });
    },
    // 点击资源
    handleResource(item) {
      this.$fun.openPage(
        "Online-resources-details",
        `?resourcesFormat=${item.resourcesFormat}&id=${item.id}&projectName=${this.projectName}`
      );
    
    },
    // 检索名称
    changeInput() {
      window.clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
          this.getfastclass();
      },500)
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getfastclass();
    },
    
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.explore-list {
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
      transition: all 1s ease;
      padding: 10px 22px 8px 22px;
      margin-right: 27px;
      cursor: pointer;
      margin-top: 20px;
    }
    > .addSelect {
      background: #f6f6f6;
      color: #c60000;
      border-bottom: 1px solid #c60000;
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
        width: 20%;
        margin-right: 30px;
      }
      > .el-select {
        margin-right: 30px;
      }
      > .total {
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
      &::after{
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
            > li:first-child {
            }
            > li:last-child {
            }
          }
        }
      }
    }
  }
}
</style>