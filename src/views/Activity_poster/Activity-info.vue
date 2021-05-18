<template>
  <div class="activity-info">
    <!-- <img :src="poster.activityPicture" alt="" /> -->
    <img :src="poster.activityImgUrl" alt="" />
    <div>
      <div class="title">
        {{ poster.activityTitle }}
      </div>
      <p :class="{ viewMore: !unfold || '' }" v-html="poster.activityDescription">
        
      </p><span class="btn" @click="unfold = !unfold">
          <i class="fa fa-chevron-circle-up" v-if="unfold"></i>
          <i class="fa fa-chevron-circle-down" v-else></i>
          {{ !unfold ? "展开" : "收起" }}</span
        >
      <div class="organizers">
        <span>活动主办人</span>
        <span>丨{{ poster.activityCreatorName }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      unfold: false,
    };
  },
  props: {
    poster: {
      type: Object,
      default: function () {
        return {
          activityPicture: "",
          activityTitle: "",
          activityDescription: "",
          activityCreatorName: "",
        };
      },
    },
  },
};
</script>


<style lang="less" scoped>
.activity-info {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  // padding-top: 31px;
  padding-bottom: 24px;
  margin: 0 50px 0 37px;
  border-bottom: 1px solid #e5e5e5;
  > img {
    width: 413px;
    height: 206px;
    border-radius: 8px;
  }
  > div {
    margin-left: 40px;
    > .title {
      font-size: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #000000;
      line-height: 24px;
    }
    > p {
      // font-size: 14px;
      // font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      // font-weight: 400;
      // text-align: left;
      // color: #999999;
      // line-height: 25px;
      margin-top: 28px;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // display: -webkit-box;
      // -webkit-line-clamp: 5;
      // -webkit-box-orient: vertical;
    }
    >.btn{
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      display: block;
      margin-bottom: 18px;
      cursor: pointer;
    }
    > .viewMore {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }
    > .organizers {
      margin-bottom: 50px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #2a2725;
    }
  }
}
</style>