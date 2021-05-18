<template>
  <div class="SEditor">
    <div class="my_editor" :id="id"></div>
    <!-- <div v-html="content"></div> -->
    <!-- <button>获取HTML</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      idIndex: 0,
      content: "",
    };
  },
  mounted() {
    this.tinymce();
  },

  beforeDestroy() {
    //这个必须要加，不然初始化的时候会有问题
    this.$tinymce.remove();
  },
  methods: {
    setContent() {
      this.$tinymce.activeEditor.setContent("");
    },
    editContent() {
      this.$tinymce.activeEditor.setContent(this.content);
    },
    submitEditor() {
      return (this.content = this.$tinymce.activeEditor.getContent());
    },
    tinymce() {
      // 动态设置ID，防止编辑文章完点发布文章渲染不出来
      if (sessionStorage.getItem("idIndex")) {
        this.idIndex = parseInt(sessionStorage.getItem("idIndex")) + 1;
        this.id = "Editor" + this.idIndex;
      } else {
        this.id = "Editor" + ++this.idIndex;
      }
      sessionStorage.setItem("idIndex", this.idIndex);
      console.log(this.id);
      let _this = this;
      _this.$tinymce.baseURL = "/static/tinymce";
      setTimeout(() => {
        _this.$tinymce
          .init({
            selector: `#${_this.id}`,
            language_url: require("../../../public/static/tinymce/langs/zh_CN.js"), //设置中文
            language: "zh_CN",
            plugins: [
              //配置插件：可自己随意选择，但如果是上传本地图片image和imagetools是必要的
              // "advlist autolink link image lists charmap  preview hr anchor pagebreak ",
              "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
            ], //工具框，也可自己随意配置
            toolbar: [
              "insertfile undo redo | styleselect | bold italic underline strikethrough searchreplace | alignleft aligncenter alignright alignjustify lineHeight | bullist numlist outdent indent | link image media| blockquote removeformat subscript superscript code codesample hr | charmap preview anchor pagebreak insertdatetime table | emoticons forecolor backcolor fullscreen",
            ],
            content_style: "p {margin: -3px; border:0px ; padding: 0px;}", //设置行间距
            image_advtab: true,
            table_default_styles: {
              width: "100%",
              borderCollapse: "collapse",
            },
            height: "470",
            // width: "810",
            statusbar: false, // 隐藏编辑器底部的状态栏
            branding: true, // 去水印
            image_title: false, // 是否开启图片标题设置的选择，这里设置否
            automatic_uploads: true, // 图片异步上传处理函数
            images_upload_handler: (blobInfo, success, failure) => {
              var formData;
              formData = new FormData();
              formData.append("file", blobInfo.blob(), blobInfo.filename());
              let config = {
                headers: { "Content-Type": "multipart/form-data" },
              };
              _this.$axios.defaults.headers.common["token"] =
                _this.$store.getters.token;
              _this.$axios
                .post(_this.$fileApi + "file/handelImgFiles/", formData, config)
                .then((res) => {
                  if (res.data.code == 200) {
                    success(res.data.data.addr);
                  } else {
                    failure(res.data.msg);
                  }
                });
            },
            // init_instance_callback: function (editor) {
            //   editor.on("keyup", () => {
            //     // 获取富文本编辑器里面的内容
            //     _this.content = editor.getContent();
            //   });
            // },
          })
          .then((resolve) => {
            // 初始化富文本编辑器里面的内容
            // resolve[0].setContent(_this.content);
            _this.$tinymce.activeEditor.setContent(_this.content);
          });
      }, 10);
    },
  },
};
</script>
<style lang="less">
// .tox-tinymce {
//   margin: 0 auto;
// }
</style>