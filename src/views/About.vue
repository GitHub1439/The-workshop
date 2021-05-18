<template>
  <div class="About">
    <h1>This is an About page</h1>
      <el-button type="primary" @click='toImage'> 下载图片</el-button>
    
    <div ref="addImage">
      <div ref="capture">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas iure libero ipsum, saepe non possimus. Suscipit fugit ratione quam cum dignissimos voluptatum ipsa qui earum aspernatur consequatur, quae totam ab?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas iure libero ipsum, saepe non possimus. Suscipit fugit ratione quam cum dignissimos voluptatum ipsa qui earum aspernatur consequatur, quae totam ab?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas iure libero ipsum, saepe non possimus. Suscipit fugit ratione quam cum dignissimos voluptatum ipsa qui earum aspernatur consequatur, quae totam ab?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas iure libero ipsum, saepe non possimus. Suscipit fugit ratione quam cum dignissimos voluptatum ipsa qui earum aspernatur consequatur, quae totam ab?</p>
      </div>
    </div>
    <img :src="imgUrl" alt="">
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  name: "About",
  components: {},
  data() {
    return {
      imgUrl:'https://pic2.zhimg.com/80/v2-3da8cd5b9b433fa7b79294ac777c1ca9_720w.jpg'
    };
  },
  created() {},
  mounted() {
  },
  methods: {
   toImage () {
      html2canvas(this.$refs.capture,{
        backgroundColor: null
    }).then(canvas => {
    	//获取图片base64地址,如果想要展示图片即可直接展示
        let dataURL = canvas.toDataURL("image/png");
        this.imgUrl = dataURL;
        
        
        //创建一个a标签，直接下载生成的图片
        // let link = document.createElement("a");
        // link.href = canvas.toDataURL();
        // link.setAttribute("download", "定制发货单详情.png");
        // link.style.display = "none";
        // document.body.appendChild(link);
        // link.click();
      });
   }
  }
};
</script>
<style lang="less" scoped>
.About {
}
</style>