
<template>
  <div>
    <div class="header-main1">
      <div class="header-bg1">
        <div class="top main-1 dis-b">
          <span style="margin-top: 5px">湖南教育大平台欢迎您</span>
          <div>
            <a href="http://jyt.hunan.gov.cn/" target="_blank">
              <img class="headimg" src="../../assets/images/study-header/hnjy.png" alt />
            </a>
            <a href="http://jyw.hnedu.cn/" target="_blank">
              <img class="headimg2" src="../../assets/images/study-header/hnjyw.png" alt />
            </a>
          </div>
        </div>
        <div class="dis-b header-top">
          <div class="headimg3">
            <img src="../../assets/images/study-header/logn-10.png" alt />
            <span>学习中心</span>
          </div>
          <div class="search2">
            <form
              class="form"
              action="http://www.hnedu.cn/column/search/index.shtml"
              method="get"
              target="_blank"
            >
              <input
                type="text"
                class="input1"
                name="keyword"
                placeholder="大家都在搜 我是接班人..."
                maxlength="30"
              />
              <input class="input2" type="submit" value="搜索" />
            </form>
          </div>
        </div>
      </div>
      <div class="header3">
        <div class="header3-main dis">
          <div class="dis lef lef1">
            <div class="dis lef-top">
              <div class="header-img1">
                <img src="../../assets/images/study-header/nav-1.png" alt />
              </div>
              <a :href="'http://www.hnedu.cn?token=' + token" class="headr-wz1"
                >首页</a
              >
            </div>
          </div>
          <div class="dis lef">
            <div class="dis lef-top">
              <div class="header-img"></div>
              <a
                class="headr-wz1"
                :href="
                  'http://www.hnedu.cn/column/zwzx/index.shtml?token=' + token
                "
              >
                政务中心
              </a>
            </div>
          </div>
          <div class="dis lef">
            <div class="dis lef-top">
              <div class="header-img"></div>
              <a
                class="headr-wz1"
                :href="'http://research.hnedu.cn/#/?token=' + token"
                >教研中心</a
              >
            </div>
          </div>

          <div class="dis lef">
            <div class="dis lef-top">
              <div class="header-img"></div>
              <a
                class="headr-wz1"
                @click="this.$router.push({ path: '/studycenter' })"
                >学习中心</a
              >
            </div>
          </div>

          <div class="dis lef">
            <div class="dis lef-top">
              <div class="header-img"></div>
              <a
                class="headr-wz1"
                :href="'http://mooc.hnedu.cn/course/#/umain2?token=' + token"
                >个人中心</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header">
      <div class="logo">
        <img src="../../assets/images/study-header/logn-10.png" alt />
        <span>学习中心</span>
      </div>
      <div class="search">
        <form
          action="http://www.hnedu.cn/column/search/index.shtml"
          method="get"
        >
          <input
            type="text"
            name="keyword"
            placeholder="大家都在搜 我是接班人..."
            maxlength="30"
          />
          <input type="submit" value="搜索" class="ad" />
        </form>
      </div>
    </div>
    <!--导航栏-->
    <div class="nav1">
      <ul>
        <li>
          <a :href="'http://www.hnedu.cn?token=' + token">首页</a>
        </li>
        <li>
          <a
            :href="'http://www.hnedu.cn/column/zwzx/index.shtml?token=' + token"
            >政务中心</a
          >
        </li>
        <li>
          <a :href="'http://research.hnedu.cn/#/?token=' + token">教研中心</a>
        </li>
        <li>
          <a @click="this.$router.push({ path: '/studycenter' })">学习中心</a>
        </li>
        <li>
          <a :href="'http://mooc.hnedu.cn/course/#/umain2?token=' + token"
            >个人中心</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: String,
    },
  },
  data() {
    return {
      seen: false,
      current: 0,
      login: localStorage.getItem("login"),
      token: this.$store.getters.token,
    };
  },
  mounted() {
    this.login = localStorage.getItem("login");
    this.token = this.$store.getters.token;
  },
  methods: {
    tzp() {
      window.open("http://www.class.hnedu.cn/common/search.shtml?keyword=");
    },
    open() {
      this.$confirm("此操作将退出平台", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          localStorage.clear();
          this.$router.push({ path: "/login" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });
    },

    tz(a, b) {
      this.$router.push({ path: "/" + a, query: { dao: a } });
    },
    mouseOverwz1(a) {
      var acps = this.$refs[`${a}`];
      acps.style = "color:#fff; background-color: #12488e;";
    },
    mouseLeavewz1(a) {
      var acps = this.$refs[`${a}`];
      acps.style = "";
    },
  },
};
</script>
<style scoped lang="less">
.location {
  position: relative;
  top: 150px;
  left: 150px;
}
.nav {
  display: none;
}
.button {
  color: white;
  background-color: #51bfff;
  width: 120px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  transform: skewX(-45deg);
}

.dis {
  display: flex;

  margin: 0 auto;
  text-align: center;
}
.headflew-list-six2 {
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #b19582;
  width: 160px;
  height: 60px;
  padding: 10px 0px;
  padding-top: 15px;
}
.el-button {
  color: white;
  padding: 10px;
}
.el-button:hover {
  color: white;
  background-color: #409eff;
}
.div > h4 {
  width: 160px;
  height: 60px;
  padding: 10px 0px;
  padding-top: 15px;
}
.headd {
  text-align: center;

  background-repeat: no-repeat;
  font-size: 15px;
  background-position: center center;
  margin: 0 auto;
  color: white;
  margin: 0 auto;

  height: 102px;
  box-shadow: 0px 4px 6px 0px rgba(43, 3, 3, 0.28);
  background-image: url("../../assets/images/study-header/Source-bg.jpg");
}

.head {
  text-align: center;
  font-size: 15px;
  color: white;
  height: 590px;
  width: 1900px;
}
.headflew {
  display: flex;
  width: 1300px;
  margin: 0 auto;
  justify-content: space-between;
  text-align: center;
}
.headflew-list-six {
  width: 160px;
  height: 50px;
  padding: 5px 0px;
  transition: 0.3s;
  padding-top: 15px;
}
.headflew-right {
  display: flex;
  justify-content: space-between;
  width: 150px;
  height: auto;
}
.headflew-list {
  height: 60px;

  padding: 0px 20.5%;

  color: #134a8e;
  font-size: 22px;

  z-index: 10;
}
.headflew-list-bg {
  margin-top: 16px;
  width: 50%;
  height: 60px;
  z-index: 100;
  justify-content: space-around;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  color: white;
}
.headflew-list-bg2 {
  width: 50%;
  height: 20px;
}
.headinput {
  font-size: 20px;
  margin: 0 auto;
  margin-top: 60px;
  padding: 10px 22px 1px 5px;
  display: flex;
  width: 530px;
  height: 40px;
  justify-content: space-between;
  border-radius: 30px;
  background-color: white;
}
.headflew-list-six:hover {
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #b19582;
}
input {
  margin: 0 auto;
  width: 90%;
  border: 0;
  height: 30px;
  color: #666666;
}
.headinput-img {
  margin-top: 3px;
  width: 22px;
  height: 22px;
}
.head-squares {
  position: relative;
  margin: 0 auto;
  margin-top: 40px;
  width: 862px;
  padding: 10px;
  height: 145px;
  background-color: #134a8e;
  border-top-left-radius: 80px;
  border-bottom-right-radius: 80px;
  opacity: 0.8;
  display: flex;
  justify-content: space-around;
}
.head-squares-img {
  position: relative;
  margin-top: 20px;
  width: 115px;
}
.headd-img-wz {
  width: 472px;
  height: 46px;
  margin: 0 auto;
  margin-top: 80px;
}
.head-squares-image {
  margin: 0 auto;
  width: 82px;
  height: 82px;
}
/*CSS样式重写*/
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li,
dl,
dt,
dd,
pre {
  margin: 0;
  padding: 0;
  border: none;
  list-style: none;
  box-sizing: border-box;
}
body {
  font-family: "microsoft yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  min-width: 1200px;
}
a {
  color: #333;
  text-decoration: none;
}
a:hover {
  color: #c91312;
  transition: 0.3s;
}
input,
button {
  outline: 0;
}
img {
  vertical-align: middle;
  border: 0;
  max-width: 100%;
  transition: 0.3s;
}
.main-zxlist {
  width: 1128px;
  margin: 0 auto;
  margin-top: 40px;
  background: rgba(255, 255, 255, 1);
  padding: 20px;
  padding: 20px 30px;
}
.main-zxlist-wz {
  font-size: 18px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 1);
}
.list-dian {
  width: 6px;
  margin-top: 7px;
  height: 6px;
  margin-right: 10px;
  background-color: #000000ff;

  border-radius: 100px;
}
.dis {
  display: flex;
}
.main-zxlist-wz2:hover {
  color: rgba(3, 96, 219, 1);
}
.dis-b {
  display: flex;
  justify-content: space-between;
}
.main-zxlist-wz2 {
  color: #0d0b0e;
}
.lf {
  float: right;
}
.main-zxlist-wz3 {
  color: #686568;
}
.main-zxlist-1 {
  margin-top: 8px;
}
.main-zxlist-2 {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccccce;
}
.head-list-top {
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 1);
}
.headd2 {
  width: 900px;
  padding: 20px;
  margin: 0 auto;
}
.headd2 > div {
  width: 95px;
  height: 35px;
  line-height: 35px;
  text-align: center;
}
.headd2 > div a {
  display: block;
  height: 100%;
  font-size: 18px;
}
.headd2 > div:hover a {
  color: white;
  border-radius: 25px;
  background: rgba(3, 96, 219, 1);
}
.biaot {
  font-size: 30px;
  font-weight: 700;
}
.bg2 {
  background-image: url(../../assets/images/study-header/bg2.png);
  width: auto;
  height: 560px;
  padding-top: 5px;
}
.header-bg1 {
  background: url(../../assets/images/study-header/header-bg.jpg) no-repeat center center;
  height: 165px;
}
.header-top {
  width: 1200px;
  margin: 0 auto;
  margin-top: -5px;
}
.search2 {
  width: 385px;
  margin-top: 25px;
  font-size: 16px;
}
.main-1 {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 10px;
  padding-top: 15px;
  color: white;
  font-size: 14px;
}
.header3 {
  background: url(../../assets/images/study-header/home-nav-bg2.jpg) no-repeat center center;
  height: 60px;
  width: auto;
  overflow: hidden;
}
.header3-main {
  width: 1040px;
  margin: 0 auto;
}
.header-img {
  width: 36px;
  height: 36px;
  background: url(../../assets/images/study-header/nav-1.jpg) center center no-repeat;
  // background-size: 100% 100%;
  transform: scale(0.7);
}
.header-img1 {
  // width: 25.5px;
  // height: 25.5px;
  transform: scale(0.8);
}
.header-img1 > img {
}
.header3-main > div:nth-child(2) .header-img {
  background: url(../../assets/images/study-header/nav-4.png) center center no-repeat;
  // width: 33px;
  // height: 33px;
}
.header3-main > div:nth-child(3) .header-img {
  background: url(../../assets/images/study-header/nav-2.png) center center no-repeat;
}
.header {
  display: none;
}
.header3-main > div:nth-child(4) .header-img {
  // width: 35px;
  // height: 32px;
  transform: scale(1);
  background: url(../../assets/images/study-header/nav-3.png) center center no-repeat;
}
.header3-main > div:nth-child(5) .header-img {
  // width: 33px;
  // height: 35px;
  background: url(../../assets/images/study-header/nav-5.png) center center no-repeat;
}

.headr-wz1 {
  color: #fff;
  font-size: 20px;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: bold;
}
// .header-main1 {
//   width: 120vw;
// }

.headr-wz1 {
  color: #fff;
  font-size: 19px;
  margin-left: 10px;
  font-weight: bold;
}
.lef {
  text-align: center;
  width: 205px;
  height: 64px;
  text-align: center;
}
.lef:hover {
  color: white;
  background: url("../../assets/images/study-header/menu-bg.png") no-repeat center;
}
.input1 {
  width: 100%;
  height: 43px;
  line-height: 53px;
  padding: 0 110px 0 15px;
  border: none;
  font-size: 14px;
  color: #757575;
  background: #fff;
  box-sizing: border-box;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #76a1b9;
}
.lef-top {
  margin-top: 15px;
  cursor: pointer;
}
.input2 {
  position: absolute;
  top: 0;
  right: 0;
  height: 43px;
  width: 87px;
  color: #fff;
  font-size: 16px;
  padding: 0 40px 0 15px;
  border: none;
  background: #a20202 url(../../assets/images/study-header/search-white.png) no-repeat 60px center;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  cursor: pointer;
}
a:hover {
  color: white;
}
.form {
  position: relative;
  height: 53px;
  margin-bottom: 30px;
}
.headimg {
  width: 175px;
  height: 30px;
}
.headimg2 {
  width: 101px;
  height: 24px;
  margin-left: 20px;
}
.headimg3 {
  width: 419px;
  margin-top: 6px;
  height: 65px;
  > img {
    vertical-align: middle;
  }
  > span {
    font-size: 26px;
    font-weight: bold;
    margin-left: 6px;
  }
}

.header {
  height: 165px;
  box-sizing: border-box;
  background: url(../../assets/images/study-header/header-bg.jpg) no-repeat center center;
}

.header .top {
  margin-top: 15px;
  color: #fff;
}

.header .top img {
  margin-left: 20px;
}

.logo {
  float: left;
  margin-top: 20px;
}

.search {
  position: absolute;
  top: 75px;
  right: 0;
  width: 385px;
  margin: 0 auto;
}

form {
  position: relative;
  height: 43px;
  margin-bottom: 30px;
}

input[type="text"] {
  width: 100%;
  height: 43px;
  line-height: 43px;
  padding: 0 110px 0 15px;
  border: none;
  background: #fff;
  box-sizing: border-box;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #76a1b9;
}

input[type="submit"] {
  position: absolute;
  top: 0;
  right: 0;
  height: 43px;
  color: #fff;
  font-size: 16px;
  padding: 0 40px 0 15px;
  border: none;
  background: #a20202 url(../../assets/images/study-header/search-white.png) no-repeat 55px center;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  cursor: pointer;
}

.search span {
  margin-left: 25px;
}

.search span:hover {
  color: #a20202;
}

.nav {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: url(../../assets/images/study-header/home-nav-bg2.jpg) no-repeat center center;
  overflow: hidden;
}

.nav ul li {
  display: inline-block;
  margin: 0 46px;
}

.nav ul li a {
  position: relative;
  display: inline-block;
  padding-left: 30px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  z-index: 1;
}

.nav ul li a:before {
  content: "";
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 20px;
  background: url(../../assets/images/study-header/nav-1.png) no-repeat left center;
  z-index: 1;
  background-size: contain;
}

.nav ul li:nth-child(2) a:before {
  background-image: url(../../assets/images/study-header/nav-4.png);
}

.nav ul li:nth-child(3) a:before {
  background-image: url(../../assets/images/study-header/nav-2.png);
}

.nav ul li:nth-child(4) a:before {
  background-image: url(../../assets/images/study-header/nav-3.png);
}

.nav ul li:nth-child(5) a:before {
  background-image: url(../../assets/images/study-header/nav-5.png);
}

.nav ul li a:after {
  content: "";
  position: absolute;
  top: -25px;
  left: 50%;
  margin-left: -120px;
  width: 230px;
  height: 124px;
  background-image: url(../../assets/images/study-header/menu-bg.png);
  z-index: -1;
  display: none;
}

.nav ul li a:hover:after {
  display: block;
}

.nav1 {
  display: none;
}

@media screen and (max-width: 500px) {
  .header-main1 {
    display: none;
  }
  .nav1 {
    display: block;
  }
  .search {
    width: 90%;
    right: 10px;
    left: 10px;
  }
  .logo {
    float: none;
  }
  .nav1 {
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    height: 60px;
  }
  .nav1 > ul {
    overflow-x: auto;
    overflow-y: hidden;
    width: 450px;
    display: flex;
  }
  .nav1 > ul > li {
    width: 90px !important;
    cursor: pointer;
  }
  body {
    font-family: "microsoft yahei", "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    max-width: 750px;
    margin: 0 auto;
  }
  a {
    color: #333;
    text-decoration: none;
  }
  a:hover {
    /*color: #C91312;*/
    /*transition: .3s;*/
  }
  input,
  button {
    outline: 0;
  }
  img {
    vertical-align: middle;
    border: 0;
    max-width: 100%;
    transition: 0.3s;
  }

  /*公共样式*/
  .lf {
    float: left;
  }
  .rt {
    float: right;
  }
  .active {
    display: block;
  }
  .container {
    padding: 0 15px;
    position: relative;
  }
  .container:before,
  .container:after {
    content: "";
    display: table;
    clear: both;
  }
  .ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  /*头部*/
  .header {
    height: 165px;
    background: url(../../assets/images/study-header/header-bg.jpg) no-repeat;
    background-size: cover;
  }
  .logo {
    padding: 21px 0;
    text-align: center;
  }
  .logo img {
    width: 70%;
  }
  .logo span {
    font-size: 26px;
    font-weight: bold;
    margin-left: 6px;
  }
  .search {
    margin: 0 15px;
    margin-top: 13px;
  }
  form {
    position: relative;
    height: 40px;
    margin-bottom: 10px;
  }
  input[type="text"] {
    width: 100%;
    height: 43px;
    line-height: 40px;
    padding: 0 100px 0 15px;

    border: none;
    background: #fff;
    box-sizing: border-box;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #76a1b9;
  }
  input[type="submit"] {
    position: absolute;
    top: 0;
    right: 0;
    height: 43px;
    color: #fff;
    font-size: 16px;
    padding: 0 25px;
    border: none;
    background: #a20202;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    cursor: pointer;
  }
  .search span {
    margin-left: 10px;
    font-size: 12px;
  }

  /*导航栏*/
  .nav1 {
    height: 60px;
    box-sizing: border-box;
    padding-top: 6px;
    text-align: center;
    background: #0a76d9;
  }
  .nav1 ul li {
    width: 90px;
    position: relative;
  }
  .nav1 ul li a {
    display: block;
    line-height: 52px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  .header {
    display: block;
  }
  .nav1 dl {
    position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9;
    display: none;
  }
  .nav1 dl dt a {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: normal;
    border-bottom: 1px solid #666;
  }

  /*尾部*/
  .footer {
    margin-top: 10px;
    padding: 20px 0;
    text-align: center;
    box-sizing: border-box;
  }
  .footer .copyright {
    line-height: 20px;
    padding-left: 25px;
    color: #828689;
    font-size: 12px;
    background: url(../../assets/images/study-header/logo2.png) no-repeat;
  }
  .footer .copyright a {
    color: #828689;
  }
  .footer .qrCode {
    margin: 20px 0 10px;
  }
  .footer .qrCode img {
    height: 75px;
    margin: 0 5px;
  }
  .footer ul {
    margin: 0 -4px;
    clear: both;
    overflow: hidden;
  }
  .footer ul li {
    float: left;
    width: 50%;
    padding: 0 4px;
    margin-bottom: 8px;
  }
  .footer ul li:last-child {
    float: none;
    margin: 0 auto;
  }
  .logo {
    margin: 0 auto;
  }

  .ad {
    width: 90px;
  }
}
</style>

