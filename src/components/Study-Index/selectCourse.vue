<template>
  <div>
    <div class="container Tsingma">
      <div class="commonTitle">
        <!-- 标题 -->
        <div>古诗词鉴赏</div>
        <!-- 查看更多 -->
        <div @click="jumpMore">
          <span>查看更多</span>
          <img src="../../assets/images/study/more.png" alt="" />
        </div>
      </div>
      <ul class="contents">
        <li
          v-for="(item, index) in poemsData"
          :key="index"
          @click="handleResource(item)"
        >
          <div>
            <div class="liveLogo">
              <img :src="require(`../../assets/images/poems-file-type/${item.resourcesFormat}.png`)" alt="" />
              <div>
                <img src="../../assets/images/study/live.png" alt="" />
                <div class="name">{{ item.title }}</div>
                <div class="line"></div>
              </div>
            </div>

            <div class="name">{{ item.title }}</div>
            <div class="teacher">主讲老师:{{ item.uploadName }}</div>
          </div>
          <div></div>
          <div></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.Tsingma {
  > .commonTitle {
      >div:first-child{
opacity: 1;
font-size: 24px;
font-family: Microsoft YaHei, Microsoft YaHei-Bold;
font-weight: 700;
text-align: left;
color: #000000;
      }
    >div:nth-child(2){
        >img{
            width: 25px;
            height: 25px;
        }
    }
  }
  
    .contents {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      margin-top: 35px;
      > li {
        width: 371px;
        height: 305px;
        position: relative;
        margin-right: 35px;
        cursor: pointer;
        z-index: 99;
        &:hover {
          > div:first-child {
            margin-top: 5px;
            >.liveLogo{
              >div{
                opacity: 1;
              }
            }
          }
          > div:nth-child(2) {
            margin-top: 15px;
          }
          > div:last-child {
            margin-top: 35px;
          }
        }
        > div:first-child {
          box-shadow: 0px 5px 7px 1px rgba(0, 0, 0, 0.16);
          transition: all linear 0.2;
          -webkit-transition: all 0.2s; /* Safari */
          //   z-index: 99;
          //   position: absolute;
          background-color: #fff;

          > .liveLogo {
            width: 371px;
            height: 233px;
            position: relative;
            > img {
              width: 371px;
              height: 233px;
            }
            > div {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
               width: 371px;
              height: 233px;
              opacity: 0;
              transition: all .3s ease;
              text-align: center;
              background: rgba(0,0,0,.8);
              > img {
                width: 53px;
                height: 48px;
                margin: 57px 0 17px 0;
              }
              > .name {
                font-size: 18px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: center;
                color: #ffffff;
              }
              >.line{
                width: 25px;
                height: 4px;
                opacity: 1;
                background: #ffffff;
                margin-left: 46%;
                margin-top: 20px;
              }
            }
          }
          > .name {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: left;
            color: #212121;
            padding: 12px 0 0 21px;
            height: 30px;
          }
          > .teacher {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
            padding: 6px 0 12px 21px;
          }
        }
        > div:nth-child(2) {
          position: absolute;
          top: -8px;
          right: -10px;
          width: 373px;
          height: 304px;
          background: #ffffff;
          border: 1px solid #bbbbbb;
          z-index: -1;
          transition: all linear 0.3;
          -webkit-transition: all 0.3s; /* Safari */
        }
        > div:last-child {
          position: absolute;
          top: -18px;
          right: -20px;
          width: 373px;
          height: 304px;
          background: #ffffff;
          border: 1px solid #bbbbbb;
          z-index: -4;
          transition: all linear 0.4;
          -webkit-transition: all 0.4s; /* Safari */
        }
      }
    }
}
</style>
<script>
export default {
  data() {
    return {
      tableForm: {
        pageSize: 3,
        pageNum: 1,
        total: 0,
        projectId:2
      },
      poemsData: [
      ],
    };
  },
  methods: {
     // 获取诗词数据
    getGoodClass() {
      this.$api.getStudyResource(this.tableForm)
        .then((res) => {
          this.poemsData= res.data.data.rows;
        });
    },
     // 点击资源
    handleResource(item) {
      this.$fun.openPage(
        "Online-resources-details",
        `?resourcesFormat=${item.resourcesFormat}&id=${item.id}`
      );
    
    },
    jumpMore(){
        this.$router.push({path:'poems-list'})
    }
  },
  created() {},
  mounted() {
    this.getGoodClass();
  },
  filters: {
    time(val) {
      if (val) {
        return `${val.substring(0, 10)}`;
      }
    },
  },
};
</script>


