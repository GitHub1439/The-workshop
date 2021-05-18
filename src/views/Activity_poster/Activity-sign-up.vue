<template>
  <div class="Activity-sign-up">
    <!-- <header-img title="活动报名" /> -->
    <div class="container">
      <!-- <el-page-header @back="goBack" content="活动报名"> </el-page-header> -->
      <div class="main-top">
        <activityInfo v-bind:poster="poster"></activityInfo>
        <div class="extension-info">
          <div class="time">
         <i class="iconfont">&#xe7a2;</i> {{ poster.activityStartTime }}
          </div>
          <div class="address">
            <svg
              class="icon"
              aria-hidden="true"
              :style="{ fontSize: '19px', transform: 'translateX(-3px)' }"
            >
              <use xlink:href="#icon-icon-test2-copy"></use></svg
            >{{ poster.activityPlace }}</div>
        </div>
        <div class="sign-up-info">
          <div class="sign-up-head">请填写报名表</div>
          <div style="margin: 24px 79px 0 37px">
            <el-form
              :model="signUpInfo"
              :rules="rules"
              ref="signUpInfo"
              label-width="0px"
              class="signUpInfo"
            >
              <el-row>
                <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                  <div style="margin: 0px 0px 24px 0px">姓名</div>
                  <el-form-item label="" prop="name">
                    <el-input
                      class="suffix"
                      type="text"
                      placeholder="姓名"
                      v-model="signUpInfo.name"
                      maxlength="30"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col
                  :offset="2"
                  :xs="24"
                  :sm="11"
                  :md="11"
                  :lg="11"
                  :xl="11"
                >
                  <div style="margin: 0px 0px 24px 0px">联系电话</div>
                  <el-form-item label="" prop="mobile">
                    <el-input
                      class="suffix"
                      type="text"
                      placeholder="联系电话"
                      v-model="signUpInfo.mobile"
                      maxlength="11"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <div style="margin: 0px 0px 24px 0px">所在单位</div>
                  <el-form-item label="" prop="unit">
                    <el-input
                      class="suffix"
                      type="text"
                      placeholder="所在单位"
                      v-model="signUpInfo.unit"
                      maxlength="30"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-button type="primary"  round @click="saveSignUp"
                    >提交报名</el-button
                  >
                  <!-- <el-button type="primary" round @click="goBack"
                    >取消</el-button
                  > -->
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import activityInfo from "../Activity_poster/Activity-info";
import headerImg from "../../components/Index/Teaching-activities/Header-img";
export default {
  name: "About",
  components: {
    activityInfo,
    headerImg,
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (this.mobileFlag.test(value)) {
        callback();
      } else {
        callback("请输入正确的手机号");
      }
    };
    return {
      poster: {
        activityPicture: "",
        activityTitle: "",
        activityDescription: "",
        activityCreatorName: "",
      },
      signUpInfo: {
        name: "",
        mobile: "",
        activityId:this.$route.query.posterDetailId,
        unit: "",
        workspaceId: this.$store.getters.workspaceId,
      },
      rules: {
        name: [{ required: true, message: "请输入您的名字", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入您的电话号码", trigger: "blur" },
          { required: true, validator: validateMobile, trigger: "blur" },
        ],
        unit: [
          { required: false, message: "请输入您所在的机构", trigger: "blur" },
        ],
      },
      mobileFlag: /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/, // 手机号验证
    };
  },
  created() {
    this.getActivityDetail();
  },
  mounted() {},
  methods: {
    getActivityDetail() {
      this.$api
        .getActivityDetail({
          posterDetailId: this.$route.query.posterDetailId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            if (res.data.data.activityTags) {
              res.data.data.activityTags = res.data.data.activityTags.split(
                "，"
              );
            }
            this.poster = res.data.data;
          }
        });
    },

    saveSignUp() {
      this.$refs["signUpInfo"].validate((valid) => {
        if (valid) {
          this.$api.activitySignUpOn(this.signUpInfo).then((res) => {
            if (res.data.code == 200) {
              this.$notify({
                title: "成功",
                message: "报名成功",
                type: "success",
              });
             this.$refs["signUpInfo"].resetFields(); 
              scrollTo(0, 0);
			  this.$emit("saveSignUp")
            } else {
              this.$notify.error({
                title: "错误",
                message: "报名失败，请重试",
              });
            }
          });
        }
      });
    },

    goBack() {
      console.log("go back");
    },
  },
};
</script>
<style lang="less" scoped>
.Activity-sign-up {
  // background: #f6f6f6;
 
  min-height: 100vh;
  padding-bottom: 30px;
  > .container {
    .el-form{
      /deep/ .el-button{
        background:#5688ff;
        width: 120px;
      }
    }
    > .el-page-header {
      padding-top: 25px;
    }
    .main-top {
      background: #ffffff;
      // border-radius: 8px;
      // margin-top: 55px;
       width: 100%;
      > .extension-info {
        padding: 25px 79px 35px 37px;
        > .time {
          opacity: 1;
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #5688ff;
          margin-left: -2px;
          > i {
            width: 15px;
            height: 19px;
            margin-right: -1px;
          }
        }
        > .address {
          opacity: 1;
          font-size: 16px;
          font-weight: 400;
          text-align: left;
          color: #a4a4a4;
          display: block;
          margin: 12px 0 0px 0;
         
        }
      }
      > .sign-up-info {
        margin: 0px 0px 0px 0px;
        padding: 0px 0px 24px 0px;
        > .sign-up-head {
          margin: 0 79px 0 37px;
          border-bottom: 1px solid #e5e5e5;
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: left;
          color: #333333;
          padding: 0px 0px 15px 0px;
        }
      }
    }
  }
}
</style>