<template>
  <div class="Statistics-echart">
    <div id="myChart" :style="{ width: '100%', height: '363px' }"></div>
  </div>
</template>
<script>
export default {
  name: "Statistics-echart",
  components: {},
  data() {
    return {
      seriesData: [],
      legendData: [],
      count: 0,
    };
  },
  created() {
    this.$api
      .memberResourceDistribution({
        workspaceId: this.$store.getters.workspaceId,
        memberId: this.$route.query.memberId,
      })
      .then((res) => {
        res.data.data.forEach((item) => {
          this.seriesData.push({
            name: item.resourceTypeName,
            value: item.total,
          });
          this.legendData.push(item.resourceTypeName);
          this.count += item.total;
        });
        this.getEchart();
      });
  },
  mounted() {},
  methods: {
    getEchart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));

      var seriesData = this.seriesData;
      var legendData = this.legendData;
      var colorList = [
        "#e86316",
        "#e7a146",
        "#f5d2aa",
        "#37d995",
        "#3270f7",
        "#7bcdfd",
      ];
      // 绘制图表
      myChart.setOption({
        // backgroundColor: {},
        title: [
          {
            text: this.count,
            x: "center",
            y: "23%",
            textStyle: {
              color: "#5688ff",
              fontSize: 24,
            },
          },
          {
            text: "总量",
            x: "center",
            y: "33%",
            textStyle: {
              color: "rgba(17,17,16,0.79)",
              fontSize: 14,
            },
          },
        ],
        tooltip: {
          trigger: "item",
          borderColor: "rgba(255,255,255,.3)",
          //   backgroundColor: "rgba(13,5,30,.6)",
          borderWidth: 1,
          color: "#fff",
          padding: 5,
          formatter: function (parms) {
            var str =
              parms.marker +
              "" +
              parms.data.name +
              "</br>" +
              "数量：" +
              parms.data.value +
              "个</br>" +
              "占比：" +
              parms.percent +
              "%";
            return str;
          },
        },
        legend: [
          {
            type: "scroll",
            orient: "vertical",
            icon: "square",
            left: "10%",
            align: "left",
            top: "65%",
            itemGap: 20,
            // bottom:'50%',
            textStyle: {
              fontSize: 16,
              color: "rgba(17,17,16,0.79)",
            },
            data: legendData.slice(0, 3),
          },
          {
            type: "scroll",
            orient: "vertical",
            icon: "square",
            left: "55%",
            align: "left",
            top: "65%",
            itemGap: 20,
            // bottom:'50%',
            textStyle: {
              fontSize: 16,
              color: "rgba(17,17,16,0.79)",
            },
            data: legendData.slice(3, 6),
          },
        ],
        series: [
          {
            type: "pie",
            center: ["50%", "30%"],
            radius: ["45%", "66%"],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: false,
            },
            data: seriesData,
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
.Statistics-echart {
}
</style>