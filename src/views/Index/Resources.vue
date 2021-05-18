<template>
  <div class="Resources">
    <!-- 资源分类 -->
    <div class="resources-classification">
      <div class="container">
        <div class="column-title">
          
          <router-link
            tag="div"
            to="Upload-resources"
            class="resources-upload-btn hidden-xs-only"
            v-if="$store.getters.workspaceMember"
          >
            <img
              src="../../assets/images/TeachingAndResearch-resources/upload.png"
              alt
            />
            资源上传
          </router-link>
        </div>
        <div class="classification">
          <!-- <label>类型：</label> -->
          <!-- <ul>
            <li
              :class="typeActive == index ? 'li-active' : ''"
              v-for="(item, index) in typeList"
              :key="index"
              @click="typeChange(item, index)"
            >
              {{ item.resourceTypeName }}
            </li>
          </ul> -->
		  <ul class="second-nav" :class="{ packup: pack }" style="margin-bottom: 10px;">
		  			  <dt>类型：</dt>
		    <li
		      v-for="(item, index) in typeList"
		      :key="index"
		      :class="{ li_active: typeActive == index }"
		      @click="typeChange(item, index)"
		    >
		      {{ item.resourceTypeName }}
		    </li>
		    <span @click="pack = !pack">
		      <i :class="!pack ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
		      {{ pack ? "展开" : "收起" }}</span
		    >
		  </ul>
		  <ul class="second-nav" :class="{ packup: unfold }">
		  			  <dt>信息化能力点：</dt>
		    <li
		      v-for="(item, index) in dictList"
		      :key="index"
		      :class="{ li_active: dictActive == index }"
		      @click="dictChange(item, index)"
		    >
		      {{ item.remark }}
		    </li>
		    <span @click="unfold = !unfold">
		      <i :class="!unfold ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
		      {{ unfold ? "展开" : "收起" }}</span
		    >
		  </ul>
        </div>
      </div>
    </div>
    <!-- 资源列表 -->
    <Rcomm ref="Rcomm" :pageForm="pageForm" selectFlag="1" @getList="getList" />
  </div>
</template>
<script>
import Rcomm from "../../components/Index/Resources-column-com";
export default {
  name: "Resources",
  components: { Rcomm },
  data() {
    return {
      typeActive: 0, // 类型选中
      typeList: [], // 类型列表
      options: [], // 分类
      pageForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        workspaceId: this.$store.getters.workspaceId,
        resourceInfoName: "", // 资源名称
        resourceTypeIdFk: "", // 类型ID
        resourceFormatIdFk: "", // 分类ID
        sort: "0", // 根据要求排序
        fId: "", // 栏目ID
        columnId: "", // 子栏目ID
		abilityPoint:"",
		resourceDisplay:1
      },
	  pack: true,
	  navIndex2: 0,
	  unfold:true,
	  dictList:[],//信息化能力点
	  dictActive:0,
    };
  },
  created() {
    this.getTypeList(); // 获取类型列表
	this.dict()
  },
  mounted() {},
  methods: {
    // 类型选中
    typeChange(item, index) {
      this.typeActive = index;
      this.$refs.Rcomm.pageForm.pageNum = 1;
      this.$refs.Rcomm.pageForm.resourceTypeId = item.resourceTypeId;
      this.$refs.Rcomm.getList(); // 获取列表
    },
    // 获取类型列表
    getTypeList() {
      this.$api.findTypeAll().then((res) => {
        this.typeList = res.data.data;
      });
    },
    getList() {
      this.$api
        .getWorkspaceResourcePage(this.$refs.Rcomm.pageForm)
        .then((res) => {
          this.$refs.Rcomm.pageForm.total = res.data.data.total;
          this.$refs.Rcomm.resourcesList = res.data.data.rows;
          if (this.$refs.Rcomm.resourcesList.length == 0) {
            this.$refs.Rcomm.none = true;
          } else {
            this.$refs.Rcomm.none = false;
          }
        });
    },
	dict(){
		this.$api.dict().then((res) => {
			res.data.data.unshift({"dictId":null,"k":null,"v":"全部","dictType":"capability_point","remark":"全部"})
		  this.dictList = res.data.data
		});
	},
	dictChange(item, index){
		this.dictActive = index;
		this.$refs.Rcomm.pageForm.pageNum = 1;
		this.$refs.Rcomm.pageForm.abilityPoint = item.dictId;
		this.$refs.Rcomm.getList(); // 获取列表
	}
  },
  filters: {},
  watch: {
    "pageForm.resourceInfoName"(val) {
		this.$refs.Rcomm.pageForm.pageNum = 1;
      this.getList();
    },
  },
};
</script>
<style lang="less">
.Resources {
  padding: 32px 0;
  min-height: 100vh;
  .column-title {
    // padding-top: 24px;
    font-size: 26px;
    font-weight: 600;
    color: #2a2a2a;
    .resources-upload-btn {
      cursor: pointer;
      float: right;
      width: 137px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      background: #5688ff;
      border-radius: 21px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      > img {
        margin-right: 10px;
        width: 22px;
        height: 22px;
        vertical-align: middle;
      }
    }
  }
  // 资源分类
  > .resources-classification {
    margin-bottom: 23px;
    .container {
      border-radius: 8px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 24px;
      background: #ffffff;
    }
    // 分类
    .classification {
      padding: 39px 0 10px 0;
      > label {
        margin-right: 27px;
        float: left;
        font-size: 14px;
        color: rgba(28, 25, 25, 0.4);
      }
      > ul {
		  dt{
		  			  margin-right: 27px;
		  }
        > li {
          cursor: pointer;
          float: left;
          margin: 0 25px 10px 0;
          font-size: 14px;
          color: rgba(29, 29, 29, 0.6);
        }
        > li:nth-last-child(1) {
          margin-right: 0;
        }
        > .li-active {
          color: #0a76d9;
        }
      }
	  .second-nav {
	    text-align: left;
	    width: 100%;
	    display: flex;
	    flex-flow: row wrap;
	    justify-content: flex-start;
	    
	    position: relative;
	  		    box-sizing: content-box;
	    > li {
	      text-align: left;
	      // margin-right: 40px;
	      cursor: pointer;
	      &:hover {
	        color: #2b9fec;
	      }
	    }
	    > .li_active {
	      // font-size: 16px;
	      color: #3d78ff;
	    }
	    > span {
	      position: absolute;
	      bottom: 0;
	      right: 0;
	      cursor: pointer;
	    }
	  }
	  .packup {
	    height: 25px;
	    overflow: hidden;
	  }
    }
  }
}
</style>