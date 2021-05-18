<template>
  <div class="content">
    <Calendar
      ref="Calendar"
      :markDateMore="arr"
      :markDate="arr2"
      v-on:isToday="clickToday"
      agoDayHide="1530115221"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
    ></Calendar>
  </div>
</template>

<script>
import Calendar from "../components/calendar-component/calendar.vue";
export default {
  data() {
    return {
      arr2: [],
      arr: [
        {
          date: "2020/8/1",
          className: "mark1",
        },
        {
          date: "2020/8/13",
          className: "mark2",
        },
      ],
      beginCourseTimeStr: "", // 选择日期
    };
  },
  components: {
    Calendar,
  },
  created() {
    var date = new Date();
    var str = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    // this.getDateSelect(str); // 选中当前日期

    // this.$http
    //   .get("course/courseLive/course/courseLivePageCalendar")
    //   .then((res) => {
    //     var list = res.data.data;
    //     list.forEach((item) => {
    //       item.date = item.beginCourseTime;
    //       item.className = item.isPlay;
    //     });
    //     this.arr = list;
    //   });
  },
  methods: {
    //选中某天
    clickDay(data) {
      // this.getDateSelect(this.dateFormat(data)); // 选中当前日期
    },
    //跳到了本月
    clickToday(data) {
      // console.log("跳到了本月今天", data);
    },
    //左右点击切换月份
    changeDate(data) {
      // console.log("左右点击切换月份", data);
    },
    demo() {
      this.$refs.Calendar.ChoseMonth("2020-12-13"); //跳到12月12日选中12月12日
    },
    // 日期 / 转换 - ，补0
    dateFormat(val) {
      var arr = [];
      val.split("/").forEach((item) => {
        arr.push(item.toString().padStart(2, "0"));
      });
      return arr.join("-");
    },
    // 获取日期选择
    // getDateSelect(date) {
    //     this.$api.courseLivePageCalendar(date)
    //     .then((res) => {
    //       this.$emit("getDateCourseList", res.data.data);
    //     });
    // },
  },
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less" scoped>
h3 {
  text-align: center;
  width: 90%;
  margin: auto;
}

.div {
  margin: auto;
  width: 220px;
  height: 44px;
  line-height: 44px;
  background: #3d78ff;
  color: #fff;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
}

.mark1,
.mark2 {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
  }
}
.mark1 {
  &::after {
    background-color: #fe1111;
  }
}
.mark2 {
  &::after {
    background-color: #3d78ff;
  }
}

.wh_content_item > .wh_isMark {
  background: orange;
}
// .wh_container >>> .wh_content_all {
//   /* background-color: red; */
// }
</style>