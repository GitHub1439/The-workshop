<template>
  <div class="Dialog">
    <c-pdf
      ref="pdf"
      v-if="resourceFormatIdFk == 1"
      :resourceAddr="resourceAddr"
    ></c-pdf>
    <c-video
      v-else-if="resourceFormatIdFk == 2"
      :resourceAddr="resourceAddr"
    ></c-video>
    <c-audio
      v-else-if="resourceFormatIdFk == 3"
      :resourceAddr="resourceAddr"
    ></c-audio>
    <c-img v-else-if="resourceFormatIdFk == 4" :resourceAddr="resourceAddr">
    </c-img>
    <div v-else-if="resourceFormatIdFk == 5">
        暂不支持预览
    </div>
    <c-article
      v-else-if="resourceFormatIdFk == 10"
      :resourceAddr="resourceAddr"
    >
    </c-article>
  </div>
</template>
<script>
import cAudio from "./Dialog/audio";
import cPdf from "./Dialog/pdf";
import cVideo from "./Dialog/video";
import cImg from "./Dialog/img";
import cArticle from "./Dialog/Article";
export default {
  name: "Dialog",
  components: {
    cAudio,
    cPdf,
    cVideo,
    cImg,
    cArticle,
  },
  data() {
    return {
      resourceAddr: "", // 预览文件地址
      resourceFormatIdFk: "", // 文件类型
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 获取地址
    getData(val1, val2) {
      console.log(val1, val2)
      this.resourceFormatIdFk = val2; // 文件类型
            this.resourceAddr = val1; // 文件地址
    },
    // 下载
    downloadWeekly(resourceInfoPhysicsAddr, fileName) {
      this.axios
        .post(this.$fileApi+"onlineFile/verifyUser", {
          pathUrl: resourceInfoPhysicsAddr,
          fileName: fileName,
        })
        .then((v) => {
          if (v.data.code == 200) {
            const u = this.$fileApi+"onlineFile/download";
            this.axios({
              method: "POST",
              url: u,
              responseType: "blob",
              data: {
                pathUrl: resourceInfoPhysicsAddr,
                fileName: fileName,
              },
            })
              .then((res) => {
                console.log(res);
                const content = res.data;
                if (!content) {
                  return;
                }
                const blob = new Blob([content]);
                if ("download" in document.createElement("a")) {
                  // 非IE下载
                  const elink = document.createElement("a");
                  elink.download = fileName;
                  elink.style.display = "none";
                  elink.href = URL.createObjectURL(blob);
                  document.body.appendChild(elink);
                  elink.click();
                  URL.revokeObjectURL(elink.href); // 释放URL 对象
                  document.body.removeChild(elink);
                } else {
                  // IE10+下载
                  navigator.msSaveBlob(blob, file);
                }
              })
              .catch();
          } else {
            this.$message({
              type: "info",
              message: v.data.msg,
            });
          }
        });
    },
  },
};
</script>
<style lang="less">
.Dialog {
   height: 584px;
}
</style>