<template>
  <div
    class="Index"
    :style="{
      background: $store.getters.lwStudio
        ? `url(${require('../assets/images/BG/lw-02.png')}) repeat center top`
        : `url(${$store.getters.style.dressUpAddr1}) repeat center top`,
    }"
  >
    <Header />
    <div
      class="BG-img"
      :style="{
        background: $store.getters.lwStudio
          ? `url(${require('../assets/images/BG/lw-01.png')}) repeat center top`
          : `url(${$store.getters.style.dressUpAddr}) repeat center top`,
		  'background-size':'100% 100%'
      }"
    >
      <div class="container">
        <div
          class="studio-name"
          :style="
            $store.getters.lwStudio
              ? { color: '#942504' }
              : { color: $store.getters.style.color1 }
          "
        >
          {{ $store.getters.personalDetails.workspaceName }}
        </div>
      </div>
    </div>
    <div class="BG-GIF" v-if="$store.getters.lwStudio">
      <div class="container">
        <img src="../assets/images/BG/lw-03.gif" alt="" />
      </div>
    </div>
    <!-- 工作坊布局 -->
    <div class="studio_Layout">
      <div class="container">
        <div class="left-box nav-left">
          <!-- 工作坊详情 -->
          <div class="studio-details">
            <div class="box1">
              <div class="box-border" v-if="$store.getters.lwStudio"></div>
              <div class="Picture-box" v-if="$store.getters.lwStudio">
                <img src="../assets/images/Index/Picture-box.png" alt="" />
              </div>
              <div class="bg-01" v-if="$store.getters.lwStudio">
                <img src="../assets/images/Index/bg-01.png" alt="" />
              </div>
              <!-- 工作坊头像 -->
              <router-link
                tag="div"
                to="Studio-members"
                class="studio-head_portrait"
              >
                <img
                  :src="$store.getters.personalDetails.workspaceAvatar"
                  alt=""
                />
              </router-link>
              <router-link
                tag="div"
                to="Studio-members"
                :style="$store.getters.lwStudio ? { color: '#942504' } : ''"
                class="studio-name"
                >{{
                  $store.getters.personalDetails.workspaceName
                   
                }}</router-link
              >
              <div class="teacher-name">
                <!-- <div>
                  首席名师：{{
                    $store.getters.personalDetails.workspaceCreator
                      | stringCutting(4)
                  }}
                </div>
                <div class="text-overflow-1">
                  学科：{{ $store.getters.personalDetails.catalogName
                  }}{{ $store.getters.personalDetails.subjectName }}
                </div> -->
				<div class="text-overflow-1">
					工作坊坊主：{{$store.getters.personalDetails.workspaceCreator}}
				</div>
              </div>
              <div class="Studio-statistics" v-if="elShow">
                <el-row>
                  <el-col
                    class="studio-resources"
                    :xs="24"
                    :sm="24"
                    :md="24"
                    :lg="24"
                    :xl="24"
                  >
                    <div class="box clearfix">
                      <div class="studio-count">
                        <span
                          :style="
                            $store.getters.lwStudio
                              ? { color: '#942504' }
                              : { color: $store.getters.style.color1 }
                          "
                          >{{
                            $store.getters.personalDetails.memberCount
                          }}</span
                        >
                        <p>成员</p>
                      </div>
                      <div class="studio-count">
                        <span
                          :style="
                            $store.getters.lwStudio
                              ? { color: '#942504' }
                              : { color: $store.getters.style.color1 }
                          "
                          >{{
                            $store.getters.personalDetails.resourceCount
                          }}</span
                        >
                        <p>资源</p>
                      </div>
                      <div class="studio-count">
                        <span
                          :style="
                            $store.getters.lwStudio
                              ? { color: '#942504' }
                              : { color: $store.getters.style.color1 }
                          "
                          >{{ $store.getters.personalDetails.visitCount }}</span
                        >
                        <p>访问量</p>
                      </div>
                    </div>
                    <router-link
                      tag="div"
                      to="/Studio-joining-application"
                      class="studio-apply-btn"
                      v-if="!$store.getters.personalDetails.workspaceMember"
                      :style="
                        $store.getters.lwStudio
                          ? { background: '#942504' }
                          : { background: $store.getters.style.color1 }
                      "
                      >申请加入工作坊</router-link
                    >
                    <!-- <div
                      class="studio-apply-btn"
                      v-if="
                        $store.getters.personalDetails.workspaceMember &&
                        $store.getters.personalDetails.belongAdmin
                      "
                      :style="
                        $store.getters.lwStudio
                          ? { background: '#942504' }
                          : { background: $store.getters.style.color1 }
                      "
                      @click="dialogVisible = true"
                    >
                      邀请新成员加入
                    </div>
                    <div
                      class="studio-apply-btn"
                      v-else-if="$store.getters.personalDetails.workspaceMember"
                      @click="dialogVisibles = true"
                    >
                      邀请新成员加入
                    </div> -->
                  </el-col>
                </el-row>
              </div>
              <div class="brief-introduction" v-if="elShow">
                <div class="title">简介</div>
                <div class="time">
                  成立时间： {{ $store.getters.personalDetails.createTime }}
                </div>
                <div
                  :class="
                    studioDetails.isShowMore ? 'details isShowMore' : 'details'
                  "
                >
                  {{ studioDetails.workspaceIntroduce || "暂无简介" }}
                  <span
                    :style="
                      $store.getters.lwStudio
                        ? { color: '#942504' }
                        : { color: $store.getters.style.color1 }
                    "
                    v-if="
                      studioDetails.workspaceIntroduce &&
                      studioDetails.workspaceIntroduce.length > 80
                    "
                    @click="
                      (studioDetails.isShowMore = !studioDetails.isShowMore),
                        isShowMoreClick()
                    "
                    >{{ studioDetails.isShowMore ? "[详情]" : "[收起]" }}</span
                  >
                </div>
              </div>
              <!-- 成员排行 -->
              <div class="Member-ranking" v-if="elShow">
                <div class="box">
                  <div class="column-title">
                    积分榜
                    <ul>
                      <li
                        :class="li_active == index ? 'li_active' : ''"
                        v-for="(item, index) in liList"
                        :key="index"
                        @click="(li_active = index), getMemberList(item.id)"
                      >
                        {{ item.title }}
                      </li>
                    </ul>
                  </div>
                  <div class="member-list">
                    <ul>
                      <li
                        class="clearfix"
                        v-for="(item, index) in memberList"
                        :key="index"
                        v-show="index < 3"
                        @click="
                          $fun.openPage(
                            'Personal-home',
                            `?memberId=${item.memberId}`
                          )
                        "
                      >
                        <img
                          class="an_crown"
                          v-if="index == 0"
                          src="../assets/images/Index/an_crown-01.png"
                          alt=""
                        />
                        <img
                          class="an_crown"
                          v-if="index == 1"
                          src="../assets/images/Index/an_crown-02.png"
                          alt=""
                        />
                        <img
                          class="an_crown"
                          v-if="index == 2"
                          src="../assets/images/Index/an_crown-03.png"
                          alt=""
                        />
                        <img class="avatar" :src="item.avatar" alt />
                        <div class="name text-overflow-1">{{ item.name }}</div>
                        <div class="count">
                          {{ item.integral }}
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li
                        class="clearfix"
                        v-for="(item, index) in memberList"
                        :key="index"
                        v-show="index > 2 && index < 10"
                        @click="
                          $fun.openPage(
                            'Personal-home',
                            `?memberId=${item.memberId}`
                          )
                        "
                      >
                        <div class="number">
                          {{ index + 1 }}
                        </div>
                        <div class="name text-overflow-1">{{ item.name }}</div>
                        <div class="count">
                          {{ item.integral }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- 菜单 -->
              <el-row class="nav-menu" v-if="!elShow">
                <el-col
                  :xs="12"
                  :sm="6"
                  :md="24"
                  :lg="24"
                  :xl="24"
                  :class="menuActive == index ? 'active' : ''"
                  v-for="(item, index) in menuList"
                  :key="index"
                  @click.native="menuChange(item, index)"
                >
                  <img :src="item.data.icon" alt />
                  <span>{{ item.name }}</span>
                </el-col>
              </el-row>
            </div>
            <div class="box2" v-if="elShow">
              <div class="box-border" v-if="$store.getters.lwStudio"></div>
              <!-- 统计 -->
              <div class="Statistics">
                <div class="box">
                  <div class="column-title">统计</div>
                  <div class="member-list">
                    <ul>
                      <li class="clearfix">
                        <img src="../assets/images/Statistics/1.png" alt />
                        <div class="name">成员数</div>
                        <div class="count">
                          {{ statisticsList.memberCount }}
                        </div>
                      </li>
                      <li class="clearfix">
                        <img src="../assets/images/Statistics/2.png" alt />
                        <div class="name">文章数</div>
                        <div class="count">{{ statisticsList.titleCount }}</div>
                      </li>
                      <li class="clearfix">
                        <img src="../assets/images/Statistics/3.png" alt />
                        <div class="name">资源数</div>
                        <div class="count">
                          {{ statisticsList.resourceTotal }}
                        </div>
                      </li>
                      <!-- <li class="clearfix">
                        <img src="../assets/images/Statistics/4.png" alt />
                        <div class="name">课题研究数</div>
                        <div class="count">
                          {{ statisticsList.ProjectResearch }}
                        </div>
                      </li> -->
                      <li class="clearfix">
                        <img src="../assets/images/Statistics/5.png" alt />
                        <div class="name">精品课例数</div>
                        <div class="count">
                          {{ statisticsList.FamousTeacherClass }}
                        </div>
                      </li>
                      <li class="clearfix">
                        <img src="../assets/images/Statistics/6.png" alt />
                        <div class="name">教研活动数</div>
                        <div class="count">
                          {{ statisticsList.teachingActivities }}
                        </div>
                      </li>
                      <li class="clearfix">
                        <img src="../assets/images/Statistics/7.png" alt />
                        <div class="name">话题数</div>
                        <div class="count">{{ statisticsList.topicCount }}</div>
                      </li>
                      <li class="clearfix">
                        <img src="../assets/images/Statistics/8.png" alt />
                        <div class="name">积分数</div>
                        <div class="count">
                          {{ statisticsList.integralCount }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- 最近访客 -->
              <div class="Recent-Visitors">
                <div class="box">
                  <div class="column-title">工作坊访客</div>
                  <el-row class="list" :gutter="25">
                    <el-col
                      :span="8"
                      v-for="(item, index) in visitorList.rows"
                      :key="index"
                      v-show="index < 9"
                    >
                      <div class="head-portrait">
                        <img :src="item.userAvatar" alt />
                        <div class="name">
                          {{ item.username | stringCutting(3) }}
                        </div>
                      </div>
                      <div class="time">{{ item.visitTime | visitTime }}</div>
                    </el-col>
                  </el-row>
                  <el-row class="today-Statistics">
                    <el-col :span="12">
                      <div>今日访客</div>
                      <div>{{ visitorList.todayCount }}</div>
                    </el-col>
                    <el-col :span="12">
                      <div>访客总量</div>
                      <div>{{ visitorList.totalCount }}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-box">
          <!-- tabs -->
          <div class="tabs">
            <el-row>
              <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane
                    v-for="(item, index) in $store.getters.tabsList"
                    :label="item.name"
                    :name="item.name"
                    :value="item.href"
                    :id="item.id"
                    :key="index"
                  ></el-tab-pane>
                  <el-tab-pane
                    label="工作坊管理"
                    name="工作坊管理"
                    :value="sidebarSelection"
                    v-if="$store.getters.personalDetails.workspaceMember"
                  ></el-tab-pane>
                  <!-- v-if="$store.getters.belongAdmin" -->
                </el-tabs>
              </el-col>
            </el-row>
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="工作坊管理"
              placement="top"
            >
              <router-link
                tag="div"
                to="Approval-notice"
                class="management-btn"
              >
              </router-link>
            </el-tooltip> -->
          </div>
          <transition :name="transitionName">
            <router-view ref="routerView" />
          </transition>
        </div>
      </div>
    </div>

    <!-- 悬浮栏目 -->
    <Floating-column />

    <el-dialog
      title="邀请成员加入"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-row>
              <div class="column-title">
                <span>*</span>
                邀请语
              </div>
              <el-col :span="24">
                <el-form-item class="el-form-padding" prop="inviteLanguage">
                  <el-input
                    disabled
                    type="textarea"
                    v-model="ruleForm.inviteLanguage"
                    placeholder=""
                  ></el-input>
                </el-form-item>
              </el-col>
              <div class="column-title">
                <span>*</span>
                邀请人员
              </div>
              <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                <el-form-item label="姓名" prop="name">
                  <el-input
                    class="suffix"
                    type="text"
                    placeholder="输入姓名"
                    v-model="ruleForm.name"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xs="24"
                :sm="12"
                :md="12"
                :lg="12"
                :xl="12"
                style="float: right"
              >
                <el-form-item label="手机号码" prop="tel">
                  <el-input
                    class="suffix"
                    type="text"
                    placeholder="输入手机号码"
                    v-model="ruleForm.tel"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <div class="submit" @click="submit">发送邀请</div>
      </span>
    </el-dialog>
    <el-dialog
      title="邀请成员加入"
      :visible.sync="dialogVisibles"
      :close-on-click-modal="false"
    >
      <p style="text-align: center">复制链接：{{ url }}</p>
    </el-dialog>
  </div>
</template>
<script>
import Header from "../components/Header";
import FloatingColumn from "../components/Index/Floating-column";

export default {
  name: "Index",
  components: { Header, FloatingColumn },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (this.mobileFlag.test(value)) {
        callback();
      } else {
        callback("请输入正确的手机号");
      }
    };
    return {
      transitionName: "",
      dialogVisible: false,
      dialogVisibles: false,
      activeName: "主页",
      elShow: true,
      li_active: 0, // 成员排行
      liList: [
        {
          id: 3,
          title: "总榜",
        },
        {
          id: 2,
          title: "月榜",
        },
        {
          id: 1,
          title: "周榜",
        },
      ],
      studioDetails: [], // 工作坊详情
      memberList: [], // 成员列表
      statisticsList: [], // 统计列表
      visitorList: [], // 访客列表
      tabsList: [],
      menuList: [], // 菜单列表
      menuActive: 0, // 菜单选中
      sidebarSelection: "", // 侧边栏选中
      floatingColumn_Index: -1, // 悬浮列表选中
      ruleForm: {
        workspaceId: this.$store.getters.workspaceId,
        tel: "", // 受邀人电话
        name: "", // 受邀人姓名
        inviteUrl: "", // 邀请链接
        inviteLanguage: "", // 邀请话术
        workSpaceName: "", // 工作坊名称
      },
      rules: {
        name: [
          { required: true, message: "请输入受邀人姓名", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入受邀人电话", trigger: "blur" },
          { required: true, validator: validateMobile, trigger: "blur" },
        ],
      },
      mobileFlag: /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/, // 手机号验证
      url: "", // 邀请地址
    };
  },
  created() {
    // var jsonArr = {
    //   dressUpAddr: require("../assets/images/BG/bg-01.png"),
    //   dressUpAddr1: require("../assets/images/BG/bg-02.png"),
    //   color1: "#5688ff",
    //   color2:
    //     "linear-gradient(90deg,rgba(116, 176, 29, 0.35) 1%,rgba(116, 176, 29, 0.14) 100%)",
    // };
    // this.$store.commit("SET_STYLE", jsonArr);

    if (this.$route.query.marking && this.$route.query.marking !== "") {
      var marking = this.$route.query.marking;
      this.$axios.defaults.headers.common["token"] = this.$Base64.decode(
        marking
      );
      this.$store.commit("SET_TOKEN", this.$Base64.decode(marking)); // 设置token
    }
    // 设置工作坊ID
    if (this.$route.query.workspaceId) {
      this.$store.commit(
        "SET_WORKSPACE_ID",
        this.$Base64.decode(this.$route.query.workspaceId)
      );
      this.$Base64.decode(this.$route.query.workspaceId) == 101
        ? this.$store.commit("SET_LISTUDIO", true)
        : this.$store.commit("SET_LISTUDIO", false);

      this.$router.push("Home");
    }

    this.getStudioDetails(); // 获取工作坊详情
    this.getMemberList(3); // 获取成员列表
    this.getStatisticsList(); // 获取统计列表
    this.getVisitor(); // 获取访客

    // 获取tabs列表
    this.$api
      .workspaceMenu({ workspaceId: this.$store.getters.workspaceId })
      .then((res) => {
        res.data.data.menuTree.forEach((item) => {
          if (item.data.isMust == 1 || item.data.isMust == 2) {
            this.tabsList.push(item);
          } else if (item.data.isMust == 3) {
            this.menuList.push(item);
          }
        });
        this.$store.commit("SET_TAB_LIST", this.tabsList);
        this.sidebarSelection = this.menuList[0].href;
        this.tabsSelect(); // tabs选择栏目
      });
    // 用户登陆失效
    if (
      this.$store.getters.tabs == "工作坊管理" &&
      this.$store.getters.personalDetails.belongAdmin == false
    ) {
      this.$store.commit("SET_TABS", "主页");
      this.$router.push("Home");
    }
    this.activeName = this.$store.getters.tabs; // 刷新选中tab
  },
  mounted() {},
  methods: {
    // 左侧菜单选择栏目
    tabsSelect() {
      var routeArr = [
        "Home",
        "Resources",
        "Teaching-activities",
        "Resources-column",
        "Studio-members",
        "Message-list",
		"Resources-achievement"
      ];
      if (routeArr.indexOf(this.$route.name) !== -1) {
        // this.activeName = this.$route.name;
      } else {
        this.activeName = "工作坊管理";
        this.elShow = false;
        this.menuList.forEach((item, index) => {
          if (item.href == this.$route.name) {
            this.menuActive = index;
          }
        });
      }
    },
    handleClick(tab, event) {
      if (
        tab.$attrs.value ==
        "http://www.hnedu.cn/column/meeting/2021/1583218151824.shtml"
      ) {
        window.open(tab.$attrs.value);
        return;
      }
      // if (this.$route.name !== tab.$attrs.value) {
      if (tab.$attrs.value == "Resources-column") {
        this.getSubColumnTree(tab.$attrs.id); // 获取子栏目树
        this.$router.push({
          path: tab.$attrs.value,
          query: { id: tab.$attrs.id, name: tab.name },
        });
      } else {
        this.$router.push(tab.$attrs.value);
      }
      // }
      this.$route.meta.tabs = tab.name;
      // console.log(tab);
      // console.log(this.$route.meta.tabs, tab.$attrs);
      this.$store.commit("SET_TABS", tab.name);
    },
    // 获取子栏目树
    getSubColumnTree(parentId) {
      this.$api
        .SubColumnTree({
          parentId: parentId,
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          // this.$refs.treeList = res.data.data;
          this.$store.commit("SET_TREE_LIST", res.data.data);
        });
    },
    // 管理菜单选择
    menuChange(item, index) {
      this.menuActive = index;
      if (this.$route.name != item.href) {
        this.$router.push(item.href);
      }
    },
    // 展示更多
    isShowMoreClick() {
      if (this.studioDetails.isShowMore) {
        this.studioDetails.workspaceIntroduce =
          this.studioDetails.workspaceIntroduce.substring(0, 80) + "...";
      } else {
        this.studioDetails.workspaceIntroduce = this.studioDetails.workspaceIntroduce2;
      }
    },
    // 获取工作坊详情
    getStudioDetails() {
      this.$api
        .getStudioDetails({ workspaceId: this.$store.getters.workspaceId })
        .then((res) => {
          res.data.data = res.data.data ? res.data.data : {};
          if (
            res.data.data.workspaceIntroduce &&
            res.data.data.workspaceIntroduce.length > 80
          ) {
			  res.data.data.workspaceIntroduce2 =  res.data.data.workspaceIntroduce
            res.data.data.isShowMore = true;
            res.data.data.workspaceIntroduce =
              res.data.data.workspaceIntroduce.substring(0, 80) + "...";
          } else {
            res.data.data.isShowMore = false;
          }
          this.studioDetails = res.data.data;
          this.$store.commit("SET_PERSONAL_DETAILS", this.studioDetails); // 工作坊详情

          var floatingColumn_List = [
            {
              img: require("../assets/images/Index/column-f-01.png"),
              title: "风格设置",
              isShow: this.$store.getters.personalDetails.belongAdmin,
            },
            {
              img: require("../assets/images/Index/column-f-02.png"),
              title: "资源上传",
              isShow: this.$store.getters.personalDetails.workspaceMember,
            },
            {
              img: require("../assets/images/Index/column-f-03.png"),
              title: "文章发表",
              isShow: this.$store.getters.personalDetails.workspaceMember,
            },
            // {
            //   img: require("../assets/images/Index/column-f-04.png"),
            //   title: "消息通知",
            //   isShow: this.$store.getters.personalDetails.workspaceMember,
            // },
          ]; // 悬浮列表数组
          this.$store.commit("SET_FLOATINGCOLUMNLIST", floatingColumn_List); // 悬浮栏目
        });
    },
    // 获取成员列表
    getMemberList(type) {
      this.$api
        .getMemberList({
          workspaceId: this.$store.getters.workspaceId,
          pageSize: 10,
          pageNum: 1,
          type: type,
        })
        .then((res) => {
          this.memberList = res.data.data.records;
        });
    },
    // 获取统计列表
    getStatisticsList() {
      this.$api
        .getStatisticsList({ workspaceId: this.$store.getters.workspaceId })
        .then((res) => {
          this.statisticsList = res.data.data;
        });
    },
    // 获取访客
    getVisitor() {
      this.$api
        .getVisitor({ workspaceId: this.$store.getters.workspaceId })
        .then((res) => {
          this.visitorList = res.data.data;
        });
    },
    // 表单验证
    submitForm() {
      var flag;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
    submit() {
      if (this.submitForm()) {
        this.ruleForm.workSpaceName = this.studioDetails.workspaceName;
        this.$api
          .Invite_to_join_the_studio({
            invitation: this.ruleForm,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$notify({
                title: "成功",
                message: "发送成功",
                type: "success",
              });
              this.ruleForm = {
                workspaceId: this.$store.getters.workspaceId,
                tel: "", // 受邀人电话
                name: "", // 受邀人姓名
                inviteUrl: "", // 邀请链接
                inviteLanguage: "", // 邀请话术
                workSpaceName: "", // 工作坊名称
              };
              this.dialogVisible = false;
            } else {
              this.$notify({
                title: "警告",
                message: res.data.message,
                type: "warning",
              });
            }
          });
      }
    },
  },
  watch: {
    "studioDetails.workspaceName"() {
      this.ruleForm.inviteUrl = `http://learn.hnedu.cn/#/AgreeInvite?workspaceId=${this.$Base64.encode(
        this.$store.getters.workspaceId
      )}`; // 邀请链接
      this.url = `http://learn.hnedu.cn/#/Studio-joining-application?workspaceId=${this.$Base64.encode(
        this.$store.getters.workspaceId
      )}`; // 邀请链接

      this.ruleForm.inviteLanguage = `尊敬的${this.ruleForm.name}老师，您的朋友请您加入${this.studioDetails.workspaceName}，如您同意加入，请填写加入工作坊的表单${this.ruleForm.inviteUrl}，并尽快在湖南教育大平台登录，完善您的信息，祝您工作顺利！`;
    },
    $route(to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }

      // 监听路由返回选择栏目状态
      if (to.name == "Resources-column") {
        this.activeName = this.$route.query.name;
      } else if (to.name == this.sidebarSelection) {
        this.activeName = "工作坊管理";
      } else {
        this.activeName = this.$route.meta.title;
      }
      // 工作坊管理侧边栏
      var routeArr = [
        this.sidebarSelection,
        "Studio-management-column",
        "Resource-management",
        "My-resource",
        "Personal-information",
        "Activity-management",
      ];
      if (routeArr.indexOf(this.$route.name) !== -1) {
        this.elShow = false;
      } else {
        this.elShow = true;
      }

      this.tabsSelect(); // tabs选择栏目
    },
  },
  filters: {
    visitTime(val) {
      if (!val) return;
      return `${val.substring(5, 10)}`;
    },
  },
};
</script>
<style lang="less">
.Index {
  padding-bottom: 30px;
  min-height: 100vh;
  .box-border {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 15px solid transparent;
    border-image: url(../assets/images/Index/box-border.png) 30 round;
    box-sizing: border-box;
  }
  > .BG-img {
    position: absolute;
    top: 0;
    z-index: 8;
    height: 210px;
    width: 100%;
    > .container {
      position: relative;
      height: 100%;
      > .studio-name {
        position: absolute;
        top: 50%;
        left: 300px;
        // transform: translate(-50%, -50%);
        // width: 460px;
        font-size: 26px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        color: #5a4b09;
        letter-spacing: 2px;
      }
    }
  }
  > .BG-GIF {
    position: absolute;
    top: 0;
    width: 100%;
    height: 340px;
    > .container {
      position: relative;
      height: 100%;
      overflow: hidden;
      > img {
        position: absolute;
        right: -62px;
      }
    }
  }
  // 工作坊布局
  > .studio_Layout {
    padding-top: 110px;
	.nav-left{
		margin-top: -30px;
	}
    .left-box {
      float: left;
      // 工作坊详情
      > .studio-details {
        position: relative;
        width: 280px;
        .column-title {
          position: relative;
          padding-top: 24px;
          font-size: 20px;
          font-weight: 700;
          color: #2a2a2a;
          > ul {
            float: right;
            > li {
              cursor: pointer;
              margin-right: 20px;
              line-height: 27px;
              float: left;
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              color: #b0adb1;
            }
            > li:nth-last-child(1) {
              margin-right: 0;
            }
            > .li_active {
              color: #5688ff;
            }
          }
        }
        > .box1 {
          position: relative;
          z-index: 9;
          margin-bottom: 23px;
          background-color: #ffffff;
          border-radius: 8px;
          > .Picture-box {
            position: absolute;
            z-index: 9;
            top: -25px;
            left: -19px;
            width: 318px;
            height: 67px;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          > .bg-01 {
            position: absolute;
            top: -30px;
            left: -10px;
            width: 298px;
            height: 355px;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          // 工作坊头像
          > .studio-head_portrait {
            cursor: pointer;
            position: absolute;
            z-index: 9;
            top: 0%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 6px;
            box-sizing: border-box;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background-color: #fff;
            > img {
              border-radius: 50%;
              width: 100%;
              height: 100%;
            }
          }
          > .studio-name {
            position: relative;
            z-index: 9;
            cursor: pointer;
            // padding-top: 74px;
            font-size: 24px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: center;
			padding: 74px 20px 0;
			line-height: 30px;
          }
          > .teacher-name {
            padding: 12px 0 20px 0;
            > div {
              box-sizing: border-box;
              // float: left;
              // width: 50%;
              position: relative;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.6);
			  text-align: center;
            }
            // > div:nth-child(1)::before {
            //   content: "";
            //   position: absolute;
            //   right: 0;
            //   width: 1px;
            //   height: 13px;
            //   background-color: rgba(17, 17, 16, 0.2);
            // }
            > div:nth-child(1) {
              padding-right: 9px;
              // text-align: right;
            }
            > div:nth-child(2) {
              padding-left: 9px;
              text-align: left;
            }
          }
          // 工作坊统计
          > .Studio-statistics {
            padding-bottom: 28px;
            .studio-resources {
              padding-top: 10px;
              float: right;
              > .box {
                margin-bottom: 16px;
                text-align: center;
                > .studio-count {
                  display: inline-block;
                  position: relative;
                  padding: 0 18px;
                  text-align: center;
                  &::before {
                    content: "";
                    position: absolute;
                    top: 14px;
                    right: 0;
                    width: 1px;
                    height: 18px;
                    background-color: rgba(29, 29, 29, 0.2);
                  }
                  > span {
                    font-size: 24px;
                    color: #5688ff;
                  }
                  > p {
                    margin-top: 8px;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                  }
                }
                > .studio-count:nth-last-child(1) {
                  &::before {
                    display: none;
                  }
                }
              }
              > .studio-apply-btn {
                cursor: pointer;
                margin: 0 auto;
                width: 150px;
                height: 35px;
                background: #5688ff;
                border-radius: 18px;
                line-height: 35px;
                font-size: 14px;
                text-align: center;
                color: #fff;
                font-weight: 600;
                // &:hover {
                //   background-color: #5688ff;
                //   color: #fff;
                // }
              }
            }
          }
          // 简介
          > .brief-introduction {
            > div {
              padding: 0 16px;
            }
            > .title {
              font-size: 20px;
              font-weight: 700;
              color: #111110;
              line-height: 20px;
            }
            > .time {
              padding: 16px 16px 8px 16px;
              font-size: 14px;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: 700;
              color: #111110;
            }
            > .details {
              position: relative;
              font-size: 14px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              color: rgba(17, 17, 16, 0.8);
              line-height: 21px;
              height: 100%;
              // text-indent: 2em;
              > span {
                // position: absolute;
                // bottom: -1px;
                // right: 16px;
                background-color: #fff;
                cursor: pointer;
                padding: 0 4px;
                // display: inline-block;
                color: #5688ff;
              }
            }
            > .isShowMore {
              height: 104px;
              overflow: hidden;
            }
          }
          // 成员排名
          > .Member-ranking {
            padding: 0 16px;
            .member-list {
              padding-top: 18px;
              padding-bottom: 15px;
              > ul {
                padding: 0 16px;
                > li {
                  cursor: pointer;
                  position: relative;
                  line-height: 25px;
                  margin-bottom: 20px;
                  color: rgba(0, 0, 0, 0.6);
                  > div {
                    float: left;
                  }
                  > .number {
                  }
                  > .an_crown {
                    position: absolute;
                    top: -10px;
                    left: -10px;
                    width: 20px;
                    height: 20px;
                  }
                  > .avatar {
                    // margin-left: 16px;
                    display: none;
                    float: left;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    border: 2px solid #ebc323;
                  }
                  > .name {
                    width: 100px;
                  }
                  // margin-left: 36px;
                  > .count {
                    float: right;
                  }
                }
                > li:nth-child(1),
                > li:nth-child(2),
                > li:nth-child(3) {
                  line-height: 40px;
                  > img {
                    display: block;
                  }
                  > .name {
                    margin-left: 12px;
                    font-size: 18px;
                    font-weight: 600;
                  }
                  > .count {
                    color: rgba(10, 118, 217, 0.8);
                  }
                }
                > li:nth-child(1) {
                  color: rgba(235, 195, 35, 0.8);
                }
                > li:nth-child(2) {
                  color: #b9b9b9;
                  > img {
                    border-color: #b9b9b9;
                  }
                }
                > li:nth-child(3) {
                  color: #e5b17d;
                  > img {
                    border-color: #e5b17d;
                  }
                }
              }
              > ul:nth-child(1) {
                margin-bottom: 15px;
                padding: 12px 16px;
                border-radius: 4px;
                box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.11);
                > li:nth-child(3) {
                  margin-bottom: 0;
                }
              }
              > ul:nth-child(2) {
                padding-left: 23px;
                min-height: 295px;
              }
            }
          }
          // 菜单
          > .nav-menu {
            padding-top: 30px;
            min-height: 570px;
            > .el-col {
              cursor: pointer;
              padding: 10px 50px;
              margin: 13px 0;
              > img {
                margin: 0 10px;
                width: 24px;
                height: 24px;
                transform: translateY(-2px);
                vertical-align: middle;
              }
              > span {
                font-weight: 600;
                color: #2a2a2a;
              }
            }
            > .active {
              position: relative;
              background-color: rgba(86, 136, 255, 0.1);
              &::after {
                content: "";
                position: absolute;
                top: 9px;
                left: 0;
                width: 5px;
                height: 26px;
                background-color: #0a76d9;
              }
            }
          }
        }
        > .box2 {
          position: relative;
          background-color: #ffffff;
          border-radius: 8px;
          // 统计
          > .Statistics {
            padding: 0 16px;
            .member-list {
              padding-top: 15px;
              > ul {
                > li {
                  line-height: 32px;
                  margin-bottom: 30px;
                  > div {
                    float: left;
                  }
                  > img {
                    float: left;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                  }
                  > .name {
                    margin-left: 12px;
                    opacity: 0.8;
                    font-weight: 600;
                    color: rgba(0, 0, 0, 0.8);
                  }
                  > .count {
                    float: right;
                    color: rgba(10, 118, 217, 0.8);
                  }
                }
              }
            }
          }
          // 最近访客
          > .Recent-Visitors {
            padding: 0 16px;
            position: relative;
            min-height: 432px;
            > .box {
              > .column-title {
                padding-top: 0;
              }
            }
            .list {
              padding-top: 18px;
              > .el-col {
                margin-bottom: 10px;
                > .head-portrait {
                  margin-bottom: 10px;
                  position: relative;
                  width: 100%;
                  height: 68px;
                  border-radius: 50%;
                  overflow: hidden;
                  > img {
                    width: 100%;
                    height: 100%;
                  }
                  > .name {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 19px;
                    background: linear-gradient(
                      180deg,
                      rgba(12, 12, 12, 0),
                      #000000
                    );
                    line-height: 19px;
                    font-size: 10px;
                    text-align: center;
                    color: #ffffff;
                  }
                }
                > .time {
                  font-size: 10px;
                  text-align: center;
                  color: #242424;
                }
              }
            }
            .today-Statistics {
              position: absolute;
              width: 100%;
              left: 0;
              bottom: 20px;
              > .el-col {
                text-align: center;
                > div:nth-child(1) {
                  margin-bottom: 16px;
                  font-size: 12px;
                  color: #313131;
                }
                > div:nth-child(2) {
                  font-size: 24px;
                  font-weight: 600;
                  color: #ee4f26;
                }
              }
              > .el-col:nth-child(1) {
                position: relative;
                &::after {
                  content: "";
                  position: absolute;
                  right: 0;
                  top: 12.5px;
                  width: 1px;
                  height: 31px;
                  background-color: rgba(29, 29, 29, 0.2);
                }
              }
              > .el-col:nth-child(2) {
                > div:nth-child(2) {
                  color: #0a76d9;
                }
              }
            }
          }
        }
      }
    }
    .right-box {
      float: right;
      width: 900px;
      // tabs
      > .tabs {
        position: relative;
        z-index: 9;
        .el-tabs {
          > .el-tabs__header {
            margin: 0;
            > .el-tabs__nav-wrap {
              &::after {
                height: 0;
              }
              > .el-tabs__nav-scroll {
                > .el-tabs__nav {
                  > .el-tabs__item {
                    font-weight: 700;
                    font-size: 20px;
                    color: #3d3308;
                  }
                  // 文字选中颜色
                  > .is-active {
                    color: #3d3308;
                  }
                  // 选中下划线
                  > .el-tabs__active-bar {
                    height: 3px;
                    background-color: #3d3308;
                    border-radius: 2px;
                  }
                }
              }
              // 左右
              > .el-tabs__nav-prev,
              > .el-tabs__nav-next {
                font-size: 24px;
                color: #000;
                transform: translate(0, -2px);
              }
            }
          }
        }
        .management-btn {
          cursor: pointer;
          position: absolute;
          right: 0;
          top: -5px;
          width: 46px;
          height: 46px;
          // background: url(../assets/images/Index/btn.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  > .el-dialog__wrapper {
    .el-dialog {
      margin: 0 !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .el-dialog__header {
        text-align: center;
        // padding: 0;
        .el-dialog__headerbtn {
          // display: none;
        }
      }
      .el-dialog__body {
        // padding: 0;
      }
      .submit {
        margin-bottom: 20px;
        cursor: pointer;
        float: right;
        width: 177px;
        height: 54px;
        background: #0a76d9;
        border-radius: 4px;
        line-height: 54px;
        text-align: center;
        color: #fff;
      }
    }
  }
  .el-row {
    > .el-col {
      > .el-form {
        padding: 24px;

        .el-form-padding {
          > .el-form-item__content {
            margin-left: 0 !important;
          }
        }
        .el-form-item__label {
          &:before {
            display: none;
          }
        }
        .column-title {
          margin-bottom: 14px;
          font-size: 14px;
          font-weight: 600;
          color: #2c2c2c;
          > span {
            font-weight: 400;
            color: #ee4f26;
          }
        }
        .el-input,
        .el-textarea {
          > .el-input__inner,
          > .el-textarea__inner {
            height: 43px;
            background-color: #eeeeee;
            border: none;
          }
          > .el-textarea__inner {
            min-height: 101px !important;
            max-height: 101px;
          }
        }
      }
    }
  }
}
</style>