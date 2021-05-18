<template>
  <div class="Activity-box">
    <div class="list">
      <ul>
        <li v-for="(item, index) in 6" :key="index">
          <div class="box">
            <div class="cover">
              <img
                src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3228549874,2173006364&fm=26&gp=0.jpg"
                alt=""
              />
              <div class="flag">预告</div>
            </div>
            <div class="activity-name">
              2021年音乐中考音乐中考音乐中考 音乐中考音乐中考
            </div>
            <div class="time">
              <img
                src="../../../assets/images/Teaching-activities/time.png"
                alt=""
              />
              <span>03-22 18：30</span>
            </div>
            <div class="position">
              <img
                src="../../../assets/images/Teaching-activities/position.png"
                alt=""
              />
              <span>湖南·长沙</span>
            </div>
            <div class="mask">
              <div class="time">
                <img
                  src="../../../assets/images/Teaching-activities/time.png"
                  alt=""
                />
                <span>03-22 18：30</span>
              </div>
              <div class="position">
                <img
                  src="../../../assets/images/Teaching-activities/position.png"
                  alt=""
                />
                <span>湖南·长沙</span>
              </div>
              <div class="details">
                本次专题活动主要针对2021年的音乐科目中考进行一次教研本次专题活动主要针对2021年的音乐科目中
                考进行一次教研本次专题活动主要针对2021年的音乐科目中考进行一次教研进行一次教研本次专题活动主
                要针对2021年的音乐科目中考进行一次教研
              </div>
            </div>
          </div>
          <ul>
            <li>
              <img
                src="../../../assets/images/Teaching-activities/fabulous-a.png"
                alt=""
              />
              <span>点赞</span>
            </li>
            <li>
              <img
                src="../../../assets/images/Teaching-activities/share-a.png"
                alt=""
              />
              <span>分享</span>
            </li>
            <li>
              <img
                src="../../../assets/images/Teaching-activities/signUp-a.png"
                alt=""
              />
              <span>评论</span>
            </li>
            <li>
              <img
                src="../../../assets/images/Teaching-activities/comment-a.png"
                alt=""
              />
              <span>报名</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Activity-box",
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
.Activity-box {
  > .list {
    > ul {
      > li {
        float: left;
        margin: 0 26px 31px 0;
        cursor: pointer;
        position: relative;
        width: 280px;
        height: 347px;
        background: #ffffff;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        overflow: hidden;
        box-sizing: border-box;
        > .box {
          > .cover {
            position: relative;
            > img {
              width: 100%;
              height: 160px;
            }
            > .flag {
              position: absolute;
              right: 6px;
              bottom: 6px;
              display: inline-block;
              padding: 5px 11px;
              font-size: 12px;
              font-weight: 600;
              color: #ffffff;
              background: #5688ff;
              border-radius: 2px;
            }
          }
          > .activity-name {
            padding: 9px 14px 0 14px;
            color: #000000;
            line-height: 18px;
          }
          .time,
          .position {
            padding: 15px 0 0 14px;
            > img {
              width: 26px;
              height: 26px;
              vertical-align: middle;
            }
            > span {
              margin-left: 8px;
              display: inline-block;
              transform: translate(0, 2px);
              color: #5688ff;
            }
          }
          .position {
            > span {
              color: #a4a4a4;
            }
          }

          > .mask {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9;
            width: 280px;
            height: 347px;
            background: rgba(0, 0, 0, 0.8);
            > .time,
            > .position {
              > span {
                color: #fff;
              }
            }
            > .position {
              position: relative;
              &::after {
                content: "";
                position: absolute;
                left: 14px;
                bottom: -25px;
                width: 26px;
                height: 5px;
                background: #ffffff;
              }
            }
            > .details {
              padding: 40px 14px 0 14px;
              font-size: 14px;
              color: #ffffff;
              line-height: 25px;
              letter-spacing: 2px;
            }
          }
          &:hover {
            .mask {
              display: block;
              animation: backInUp 0.5s;
            }
          }
        }
        > ul {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 35px;
          border-top: 1px solid #e5e5e5;
          > li {
            width: 25%;
            height: 100%;
            line-height: 35px;
            float: left;
            border-right: 1px solid #e5e5e5;
            box-sizing: border-box;
            text-align: center;
            > img {
              margin-right: 4px;
              display: inline-block;
              width: 19px;
              height: 19px;
              vertical-align: middle;
            }
            > span {
              font-size: 12px;
              color: #a4a4a4;
            }
            &:hover {
              background: #5688ff;
              > span {
                color: #fff;
              }
            }
          }
          > li:nth-last-child(1) {
            border: none;
          }
        }
      }
      > li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>