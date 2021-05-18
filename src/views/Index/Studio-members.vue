<template>
  <div class="Studio-members">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item>工作坊介绍</el-breadcrumb-item>
    </el-breadcrumb>
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
            : {
                background: $store.getters.style.color2,
                color: $store.getters.style.color1,
              }
        "
      >
        首席名师
      </div>
      <div
        class="author clearfix"
        v-for="(item, index) in memberList1"
        :key="index"
        @click="$fun.openPage('Personal-home', `?memberId=${item.memberId}`)"
      >
        <img :src="item.avatar" alt="" />
        <div class="details">
          <div class="name text-overflow-1">
            {{ item.memberName }}
            <div class="title">{{ item.titleId | titleId }}</div>
          </div>
          <div class="type">{{ item.memberPosition | stringCutting(16) }}</div>
          <div class="resource-total clearfix">
            <div>
              <span>教学资源</span>
              <span>{{ item.resourceTotal }}</span>
            </div>
            <div>
              <span>教学文章</span>
              <span>{{ item.titleTotal }}</span>
            </div>
          </div>
          <div class="brief-introduction">
            {{ item.memberIntroduce || "暂无简介" | stringCutting(15) }}
          </div>
        </div>
        <!-- <div class="honor-img">
          <img
            src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2678877822,2135582699&fm=26&gp=0.jpg"
            alt=""
          />
          <img
            src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2678877822,2135582699&fm=26&gp=0.jpg"
            alt=""
          />
          <img
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3880341262,3308316348&fm=26&gp=0.jpg"
            alt=""
          />
        </div> -->
      </div>
    </div>
    <div class="box box2 clearfix">
      <div
        class="column"
        :style="
          $store.getters.lwStudio
            ? {
                background:
                  'linear-gradient(90deg,#d39c6c, rgba(245,106,66,0.00))',
                color: '#91201D',
              }
            : {
                background: $store.getters.style.color2,
                color: $store.getters.style.color1,
              }
        "
      >
        <ul>
          <li
            :style="{
              color: $store.getters.style.color1,
            }"
            :class="titleIndex == index ? 'li-active' : ''"
            v-for="(item, index) in titleList"
            :key="index"
            @click="
              (pageForm.pageNum = 1),
                (pageForm.titleId = item.id),
                (titleIndex = index),
                titleClick()
            "
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="author-box clearfix" v-if="memberList.length > 0">
        <div
          class="author clearfix"
          v-for="(item, index) in memberList"
          :key="index"
          @click="$fun.openPage('Personal-home', `?memberId=${item.memberId}`)"
        >
          <img :src="item.avatar" alt="" />
          <div class="details">
            <div style="position: relative" class="name">
              <div
                :style="{
                  width: '140px',
                  height: '26px',
                }"
                class="text-overflow-1"
              >
                {{ item.memberName }}
              </div>
              <div style="position: absolute; right: 0; top: 0" class="title">
                {{ item.titleId | titleId }}
              </div>
            </div>
            <div class="type">
              {{ item.memberPosition | stringCutting(16) }}
            </div>
            <div class="resource-total clearfix">
              <div>
                <span>教学资源</span>
                <span>{{ item.resourceTotal }}</span>
              </div>
              <div>
                <span>教学文章</span>
                <span>{{ item.titleTotal }}</span>
              </div>
            </div>
            <div class="brief-introduction">
              {{ item.memberIntroduce || "暂无简介" | stringCutting(15) }}
            </div>
          </div>
        </div>
      </div>
      <div class="none" v-else>暂无数据</div>
      <!-- 分页 -->
      <el-pagination
        style="padding: 0 0 30px 0"
        @current-change="handleCurrentChange"
        :current-page.sync="pageForm.pageNum"
        :page-size="pageForm.pageSize"
        layout="prev, pager, next, total, jumper"
        :total="pageForm.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "Studio-members",
  components: {},
  data() {
    return {
      titleList: [
        { title: "顾问", id: 3 },
        { title: "辅导员", id: 2 },
        { title: "核心成员", id: 4 },
        { title: "骨干教师", id: 5 },
        { title: "青年教师", id: 6 },
        { title: "研修教师", id: 7 },
      ],
      titleIndex: 0,
      titleId: 0,
      memberList: [], // 成员列表
      memberList1: [], // 成员列表
      pageForm: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        titleId: 0,
        workspaceId: this.$store.getters.workspaceId,
      },
    };
  },
  created() {
    this.$api
      .memberList({ titleId: 1, workspaceId: this.$store.getters.workspaceId })
      .then((res) => {
        this.memberList1 = res.data.data.records;
      });
    this.titleClick(3);
  },
  mounted() {},
  methods: {
    titleClick(id) {
      if (id) {
        this.pageForm.titleId = id;
      }
      this.$api.memberList(this.pageForm).then((res) => {
        this.memberList = res.data.data.records;
        this.pageForm.total = res.data.data.total;
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.titleClick(); // 获取列表
      scrollTo(0, 420);
    },
  },
  filters: {
    titleId(val) {
      if (val) {
        if (val == 1) {
          return "主持人";
        } else if (val == 2) {
          return "辅导员";
        } else if (val == 3) {
          return "顾问";
        } else if (val == 4) {
          return "核心成员";
        } else if (val == 5) {
          return "骨干教师";
        } else if (val == 6) {
          return "青年教师";
        } else if (val == 7) {
          return "研修教师";
        }
      }
    },
  },
};
</script>
<style lang="less">
.Studio-members {
  > .el-breadcrumb {
    padding: 36px 0 33px 0;
  }
  > .box {
    margin-bottom: 32px;
    background-color: #ffffff;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    box-sizing: border-box;
    > .column {
      padding-left: 16px;
      height: 45px;
      background: linear-gradient(
        90deg,
        rgba(116, 176, 29, 0.35) 1%,
        rgba(116, 176, 29, 0.14) 100%
      );
      border-radius: 4px 4px 0px 0px;

      font-size: 18px;
      // font-weight: 600;
      color: #ffffff;
      line-height: 45px;
      > ul {
        > li {
          margin-right: 20px;
          cursor: pointer;
          position: relative;
          display: inline-block;
          color: #000;
          &::after {
            content: "";
            position: absolute;
            top: 13px;
            right: -10px;
            height: 20px;
            width: 2px;
            background-color: #000;
          }
        }
        > .li-active {
          color: #000 !important;
        }
        > li:nth-last-child(1) {
          &::after {
            display: none;
          }
        }
      }
    }
    .author {
      cursor: pointer;
      padding: 29px 40px;
      > img {
        margin-right: 25px;
        float: left;
        display: block;
        width: 106px;
        height: 106px;
        border-radius: 50%;
      }
      > .details {
        float: left;
        width: 242px;
        > .name {
          width: 213px;
          line-height: 26px;
          font-size: 18px;
          font-weight: 600;
          color: #111110;
          > .title {
            display: inline-block;
            height: 26px;
            padding: 0 14px;
            border-radius: 2px;
            background: rgba(86, 136, 255, 0.1);
            border-radius: 2px;
            font-size: 12px;
            font-weight: 700;
            text-align: center;
            color: #5688ff;
          }
        }
        > .type {
          padding: 12px 0 16px 0;
          font-size: 12px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          color: rgba(17, 17, 16, 0.4);
        }
        > .resource-total {
          margin-bottom: 6px;
          > div {
            float: left;
            font-size: 12px;
            color: rgba(17, 17, 16, 0.68);
            > span:nth-child(1) {
              margin-right: 4px;
            }
          }
          > div:nth-child(1) {
            margin-right: 27px;
          }
        }
        > .brief-introduction {
          line-height: 15px;
          font-size: 12px;
          color: rgba(17, 17, 16, 0.4);
        }
      }
      > .honor-img {
        float: right;
        > img {
          margin-right: 20px;
          display: block;
          float: left;
          width: 111px;
          max-height: 135px;
          border: 1px solid #f4f9ed;
          border-radius: 2px;
        }
      }
    }
  }
  > .box2 {
    margin-bottom: 0;
    border-radius: 4px 4px 0 0;
    .author-box {
      // min-height: 838px;
      padding: 33px 70px 30px 70px;
      box-sizing: border-box;
      .author {
        margin: 0 48px 32px 0;
        float: left;
        padding: 11px 20px;
        width: 355px;
        box-sizing: border-box;
        border: 1px solid #e1e1e1;
        border-radius: 4px;
        > img {
          width: 86px;
          height: 86px;
          margin-right: 14px;
        }
        > .details {
          width: 213px;
          > .name {
            > .title {
              float: right;
              color: #ff7356;
              background: rgba(255, 115, 86, 0.1);
            }
          }
        }
      }
      .author:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
  .none {
    padding: 420px 0;
    text-align: center;
  }
}
</style>