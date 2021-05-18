<template>
  <div class="Personal-data">
    <div class="container">
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
      </div>
      <div class="details-box">
        <ul class="clearfix">
          <li class="clearfix">
            <label>姓名</label>
            <div>{{ memberDetails.memberName }}</div>
          </li>
          <li class="clearfix">
            <label>职务职称</label>
            <div>{{ memberDetails.memberPosition }}</div>
          </li>
          <li class="clearfix">
            <label>专长</label>
            <div>{{ memberDetails.speciality }}</div>
          </li>
          <!-- <li class="clearfix">
            <label>手机号</label>
            <div>邱娟</div>
          </li>
          <li class="clearfix">
            <label>邮箱号</label>
            <div>邱娟</div>
          </li> -->
          <li class="clearfix">
            <label>所在单位</label>
            <div>{{ memberDetails.memberGroup }}</div>
          </li>
          <li class="clearfix">
            <label>个人简介</label>
            <div>{{ memberDetails.memberIntroduce2 }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Personal-data",
  props: ["memberDetails"],
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.Personal-data {
  .box {
    background-color: #fff;
    border: 1px solid #e1e1e1;
    border-radius: 4px 4px 0 0;
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
  }
  .details-box {
    margin-bottom: 50px;
    padding: 28px 32px 50px 32px;
    background-color: #fff;
    border: 1px solid #e1e1e1;
    border-top: none;
    border-radius: 0 0 4px 4px;
    > ul {
      > li {
        margin-bottom: 32px;
        font-size: 14px;
        > label {
          margin-right: 16px;
          text-align: right;
          width: 56px;
          float: left;
          display: block;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          color: rgba(44, 44, 44, 0.4);
        }
        > div {
          width: 700px;
          float: left;
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
          font-weight: 600;
          color: #333333;
        }
      }
      > li:nth-last-child(1) {
        > div {
          line-height: 18px;
        }
      }
    }
  }
}
</style>