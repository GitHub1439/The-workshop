<template>
  <div class="QuillEditor">
    <quill-editor
      ref="QuillEditor"
      v-model="content"
      :options="editorOption"
    ></quill-editor>
    <!-- <div class="ql-snow ql-editor" v-html="content"></div> -->

    <el-upload
      class="avatar-uploader"
      :headers="{
        eduCheck: 'eduCheck',
        token: $store.getters.token,
      }"
      :action="`${$fileApi}/file/handelImgFiles/`"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button class="imgBtn" v-show="false">默认按钮</el-button>
    </el-upload>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "QuillEditor",
  components: {
    quillEditor,
  },
  props:['activitiesContent'],
  watch:{
    activitiesContent: {
      immediate: true,
      handler() {
        this.content = this.activitiesContent
      },
    },
  },
  data() {
    // 工具栏配置
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      // ["link", "image", "video"],
      ["image", "video"],
      ["clean"], // remove formatting button
    ];
    const titleConfigs = {
      "ql-bold": "加粗",
      "ql-color": "颜色",
      "ql-font": "字体",
      "ql-code": "插入代码",
      "ql-italic": "斜体",
      "ql-link": "添加链接",
      "ql-background": "背景颜色",
      "ql-size": "字体大小",
      "ql-strike": "删除线",
      "ql-script": "上标/下标",
      "ql-underline": "下划线",
      "ql-blockquote": "引用",
      "ql-header": "标题",
      "ql-indent": "缩进",
      "ql-list": "列表",
      "ql-align": "文本对齐",
      "ql-direction": "文本方向",
      "ql-code-block": "代码块",
      "ql-formula": "公式",
      "ql-image": "图片",
      "ql-video": "视频",
      "ql-clean": "清除字体样式",
    };
    return {
      content: "",
      editorOption: {
        placeholder: "编辑内容",
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  // alert("自定义图片");
                  document.querySelector(".imgBtn").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
      titleConfig: titleConfigs,
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.addQuillTitle();
    }, 100);
  },
  methods: {
    // onEditorChange({ editor, html, text }) {
    //   this.content = html;
    // },
    submitEditor() {
      return this.content;
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      // 请求上传相册
      // this.albumDetails.imgAddr.push(res.data.addr);

      // let formData = new FormData();
      // formData.append("file", file.raw);
      // this.form.workspaceAvatar = res.data.addr; // 获取头像

      // 获取富文本组件实例
      let quill = this.$refs.QuillEditor.quill;
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", res.data.addr);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        console.log("图片插入失败");
      }
    },
    // 限制图片大小和格式
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 (png,jpg,jpeg) 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addQuillTitle() {
      const oToolBar = document.querySelector(".ql-toolbar"),
        aButton = oToolBar.querySelectorAll("button"),
        aSelect = oToolBar.querySelectorAll("select");

      aButton.forEach((item) => {
        if (item.className === "ql-script") {
          item.value === "sub" ? (item.title = "下标") : (item.title = "上标");
        } else if (item.className === "ql-indent") {
          item.value === "+1"
            ? (item.title = "向右缩进")
            : (item.title = "向左缩进");
        } else {
          item.title = this.titleConfig[item.classList[0]];
        }
      });

      aSelect.forEach((item) => {
        item.parentNode.title = this.titleConfig[item.classList[0]];
      });
    },
  },
};
</script>
<style lang="less">
.QuillEditor {
  margin: 0 30px;
  .quill-editor {
  }
  .ql-container {
    height: 370px;
    background-color: #fff;
  }
}
</style>