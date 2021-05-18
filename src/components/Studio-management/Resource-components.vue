<template>
  <div class="Resource-components">
    <div class="edit-column">
      <div class="box clearfix">
        <div class="title">资源管理</div>
        <div class="count">
          共<span> {{ pageForm.total }} </span>个结果
        </div>
      </div>
      <el-row class="select-box" :gutter="10">
        <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
          <el-input
            placeholder="请输入资源名称"
            v-model="pageForm.resourceInfoName"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
          <el-input
            placeholder="请输入作者名称"
            v-model="pageForm.resourceAuthorName"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :xs="12" :sm="24" :md="5" :lg="5" :xl="5">
          <el-select
            v-model="pageForm.resourceTypeIdFk"
            placeholder="资源类型"
            @change="selectChange1"
          >
            <el-option
              v-for="item in options1"
              :key="item.resourceTypeId"
              :label="item.resourceTypeName"
              :value="item.resourceTypeId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="4">
          <el-select
            v-model="pageForm.resourceFormatIdFk"
            placeholder="文档格式"
            @change="selectChange2"
          >
            <el-option
              v-for="item in options2"
              :key="item.resourceFormatId"
              :label="item.resourceFormatName"
              :value="item.resourceFormatId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="4">
          <el-select
            v-model="pageForm.resourceDisplay"
            placeholder="资源分类"
            @change="selectChange3"
          >
            <el-option label="全部" value=""></el-option>
            <el-option label="教研资源" value="1"></el-option>
            <el-option label="专题资源" value="2"></el-option>
			<el-option label="研修成果" value="3"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <el-row class="list" :gutter="30" v-if="false">
      <el-col
        :xs="24"
        :sm="6"
        :md="12"
        :lg="12"
        :xl="12"
        v-for="(item, index) in resourcesList"
        :key="index"
      >
        <div class="box">
          <div class="img-top">
            <img :src="item.resourceFormatIdFk" alt />
            <div class="title">{{ item.resourceInfoName }}</div>
            <div class="teacher">
              <img :src="item.headImg" alt />
              <span>{{ item.resourceAuthorName }}</span>
            </div>
          </div>
          <div class="time clearfix">
            <div>
              时间：
              <span>{{ item.uploadTime }}</span>
            </div>
            <div>
              学科学段：
              <span>{{ item.periodName }}{{ item.subjectName }}</span>
            </div>
          </div>
          <el-row class="btn" :gutter="20">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <!-- <div class="btn-box">删除</div> -->
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="资源类型" align="center" width="120">
        <template slot-scope="scope">
          <img
            class="resource-img"
            :src="
              require(`../../assets/images/fileType/${scope.row.resourceFormatIdFk}.png`)
            "
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="resourceInfoName" label="资源名称" align="center">
      </el-table-column>
      <el-table-column prop="resourceAuthorName" label="老师" align="center">
      </el-table-column>
      <el-table-column prop="uploadTime" label="时间" align="center">
      </el-table-column>
      <el-table-column
        prop="resourceDisplay"
        label="资源分类"
        :formatter="resourceDisplay"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="审核状态"
        width="100"
        align="center"
        filter-placement="bottom-end"
        v-if="tag == 'none'"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status == 1 ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.status == 1 ? "审核中" : "审核通过" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="资源查看"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            style="color: #5688ff"
            type="text"
            size="small"
            @click="seeClick(scope.row, scope.$index)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="
                  scope.row.resourceFormatIdFk != 10 ||
                  scope.row.recommendation == 4
                "
                @click.native="editClick(scope.row, scope.$index)"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                style="color: #ee4f26"
                @click.native="delClick(scope.row, scope.$index)"
                >删除资源</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageForm.pageNum"
      :page-size="pageForm.pageSize"
      layout="prev, pager, next, total, jumper"
      :total="pageForm.total"
      hide-on-single-page
    ></el-pagination>

    <!-- 查看 -->
    <el-dialog
      title
      :visible.sync="seeDialogVisible"
      :close-on-click-modal="false"
      width="70%"
    >
      <Dialog ref="Dialog" />
    </el-dialog>

    <!-- 编辑上传资源 -->
    <el-dialog
      title="资源编辑"
      :visible.sync="dialogVisibles"
      :close-on-click-modal="false"
      width="1240px"
    >
      <ResourceDetailsCOM ref="ResourceDetailsCOM" />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisibles = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="editResource(1)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑文章 -->
    <el-dialog
      title="资源编辑"
      :visible.sync="dialogVisibless"
      :close-on-click-modal="false"
      width="850px"
    >
      <ArticlePublished ref="ArticlePublished" />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisibless = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="editResource(2)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ResourceDetailsCOM from "../../views/Upload-resources";
import ArticlePublished from "../../views/Article-published";
import Dialog from "../../components/Studio-management/Approval-notice/Dialog";

export default {
  name: "Resource-components",
  props: ["pageFlag", "tag"],
  components: { ResourceDetailsCOM, ArticlePublished, Dialog },
  data() {
    return {
      flagg: false,
      seeDialogVisible: false, // 查看框
      dialogVisibles: false, // 编辑资源框
      dialogVisibless: false, // 编辑文章框
      value: "",
      options1: [],
      options2: [],
      findTreeBack: [], // 章节分类列表
      resourcesList: [], // 资源列表
      tableData: [],
      pageForm: {
        pageNum: 1,
        pageSize: 6,
        total: 0,
        workspaceId: this.$store.getters.workspaceId,
        resourceInfoName: "", // 搜索资源名称
        resourceAuthorName: "", // 搜索老师名称
        resourceTypeIdFk: "", // 类型ID
        resourceFormatIdFk: "", // 分类ID
        sort: "0", // 根据要求排序
        resourceDisplay: "", // 1教研资源 2专题资源
        hotNewDownload: "2",
        type: 2,
        memberId: this.$store.getters.personalDetails.memberId, // 成员ID
      },
      resourceDetails: [], // 删除资源详情
      resourceDetailsIndex: [], // 删除资源详情索引
    };
  },
  created() {
    this.getTypeList(); // 获取类型列表
    this.getOptions(); // 获取资源格式
    this.getList(); // 获取列表
  },
  mounted() {
    this.$http.get("/workspace/excel/findTreeBack").then((res) => {
      this.findTreeBack = res.data.data;
    });
  },
  methods: {
    // 选择框
    selectChange1(val) {
      this.pageForm.pageNum = 1;
      this.pageForm.resourceTypeId = val;
      this.getList(); // 获取列表
    },
    // 选择框
    selectChange2(val) {
      this.pageForm.pageNum = 1;
      this.pageForm.resourceFormatId = val;
      this.getList(); // 获取列表
    },
    // 选择框
    selectChange3(val) {
      this.pageForm.pageNum = 1;
      this.pageForm.resourceDisplay = val;
      this.getList(); // 获取列表
    },
    resourceDisplay(row) {
      return row.resourceDisplay == 1 ? "教研资源" : "专题资源";
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getList(); // 获取列表
      scrollTo(0, 0);
    },
    // 获取列表
    getList() {
      if (this.pageFlag == 0) {
        this.$http
          .get("workspace/workspace/api/getWorkspaceResourceManage", this.pageForm)
          .then((res) => {
            this.pageForm.total = res.data.data.total;
            this.resourcesList = res.data.data.rows;
            this.tableData = res.data.data.rows;
          });
      } else {
        this.$api.personalResources(this.pageForm).then((res) => {
          this.pageForm.total = res.data.data.total;
          this.resourcesList = res.data.data.rows;
          this.tableData = res.data.data.rows;
        });
      }
    },
    // 获取类型列表
    getTypeList() {
      this.$http.get("workspace/resourceType/findTypeAll").then((res) => {
        this.options1 = res.data.data;
      });
    },
    // 获取资源格式
    getOptions() {
      this.$http.get("workspace/resourceFormat/findFormatAll").then((res) => {
        this.options2 = res.data.data;
      });
    },
    seeClick(row, index) {
      // console.log(row);
      if (row.recommendation != 4) {
        this.$http
          .post(this.$fileApi + "onlineFile/checkResource", {
            resourceUrl: row.resourceInfoAddr,
          })
          .then((res) => {
            if (res.data.code == 200) {
              if (res.data.data.code == "2") {
                // this.$message({
                //   type: "success",
                //   message: res.data.data.msg,
                // });

                if (
                  row.resourceFormatIdFk != "9" &&
                  row.resourceFormatIdFk != "10"
                ) {
                  this.seeDialogVisible = true;
                  setTimeout(() => {
                    this.$refs.Dialog.getData(
                      row.resourceInfoPhysicsAddr,
                      row.resourceFormatIdFk
                    );
                  }, 10);
                } else {
                  var fileName = row.resourceInfoAddr.substring(
                    row.resourceInfoAddr.lastIndexOf("/") + 1,
                    row.resourceInfoAddr.length
                  );
                  this.$axios({
                    method: "post",
                    url: this.$fileApi + "onlineFile/download",
                    responseType: "blob",
                    data: {
                      pathUrl: row.resourceInfoAddr,
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
                    .catch((err) => {});
                }
              } else {
                this.$message({
                  type: "info",
                  message: res.data.data.msg,
                });
              }
            }
          })
          .catch((err) => {});
      } else {
        this.seeDialogVisible = true;
        setTimeout(() => {
          this.$refs.Dialog.getData(
            row.resourceInfoPhysicsAddr,
            row.resourceFormatIdFk
          );
        }, 10);
      }
    },
    // 删除
    delClick(row, index) {
      this.resourceDetails = row;
      this.resourceDetailsIndex = index;

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "",
      })
        .then(() => {
          this.removeResource(); // 删除资源
        })
        .catch(() => {});
    },
    // 编辑
    editClick(row, index) {
      // 文章编辑
      if (row.recommendation == 4) {
        this.dialogVisibless = true;
        setTimeout(() => {
          this.$refs.ArticlePublished.domFlag = false; // 隐藏元素
          row = JSON.parse(JSON.stringify(row));
          row.openButton += "";
          this.$refs.ArticlePublished.$refs.Tinymce.content =
            row.resourceInfoPhysicsAddr;
          this.$refs.ArticlePublished.$refs.Tinymce.editContent();

          this.$refs.ArticlePublished.ruleForm = row; // 获取表单数据
          if (this.$refs.ArticlePublished.ruleForm.resourceDisplay == "null") {
            this.$refs.ArticlePublished.ruleForm.resourceDisplay = "2"; // 设置默认// 1 教研资源  2 校本资源
          }
          let newArr = [];
          this.flagg = false;

          this.digui(
            this.findTreeBack,
            newArr,
            row.catalogInfoIdFk
          );
          this.$refs.ArticlePublished.chapterList = newArr;
        }, 200);
      } else {
        // 上传资源编辑
        this.dialogVisibles = true;
        var catalogInfoIdFk;
        setTimeout(() => {
          this.$refs.ResourceDetailsCOM.componentsFlag = false; // 隐藏元素
          row = JSON.parse(JSON.stringify(row));
          row.openButton += "";
          row.originality += "";
          row.resourceDisplay += "";
          row.recommendation += "";
          this.$refs.ResourceDetailsCOM.ruleForm = row; // 获取表单数据
          if (
            this.$refs.ResourceDetailsCOM.ruleForm.resourceDisplay == "null"
          ) {
            this.$refs.ResourceDetailsCOM.ruleForm.resourceDisplay = "1"; // 设置默认// 1 教研资源  2 校本资源
          }
          if (this.pageFlag == 0) {
            this.$refs.ResourceDetailsCOM.comFlag = true; // 显示上传封面图片
          }
          this.$refs.ResourceDetailsCOM.ruleForm.type = ""; // type默认设置为空
          this.$refs.ResourceDetailsCOM.filePercentage = 100; // 进度条进度100
          this.$refs.ResourceDetailsCOM.filePercentageFlag = true; // 显示进度条
          this.$refs.ResourceDetailsCOM.uploadBtnFlag = false; // 显示上传按钮

          let newArr = [];
          this.flagg = false;
          if (this.$refs.ResourceDetailsCOM.ruleForm.resourceDisplay == 1) {
            this.digui(
              this.findTreeBack,
              newArr,
              row.catalogInfoIdFk
            );
          } else {
            this.digui(
              this.findTreeBack,
              newArr,
              row.catalogInfoIdFk
            );
          }
          this.$refs.ResourceDetailsCOM.chapterList = newArr;
        }, 200);
      }
    },
    // 编辑发布资源
    editResource(flag) {
      var str = "";
      if (flag == 1) {
        str = "ResourceDetailsCOM";
      } else {
        str = "ArticlePublished";
        this.$refs.ArticlePublished.ruleForm.resourceInfoPhysicsAddr = this.$refs.ArticlePublished.$refs.Tinymce.submitEditor();
      }
      delete this.$refs[str].ruleForm.uploadTime;
      delete this.$refs[str].ruleForm.updateTime;

      if (this.$refs[str].submitForm()) {
        this.$refs[str].loading = true;
        this.$api.editResourceUpload(this.$refs[str].ruleForm).then((res) => {
          if (res.data.code == 200) {
            this.dialogVisibless = this.dialogVisibles = false; // 隐藏查看框
            this.getList(); // 获取资源列表
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$notify({
              title: "警告",
              message: "修改失败",
              type: "warning",
            });
          }
          this.$refs[str].loading = false;
        });
      }
    },
    digui(arr, newArr, id) {
      // console.log(arr.length)
      for (let i = 0; i < arr.length; i++) {
        let s = arr[i];
        // arr.forEach(item=>{
        if (s.children && s.children.length > 0) {
          this.digui(s.children, newArr, id);
        }
        if (s.id == id) {
          this.flagg = true;
        }
        if (this.flagg) {
          newArr.unshift(s.id);
          return;
        }
      }
    },
    // 删除资源
    removeResource() {
      this.$http
        .get("workspace/resourceInfo/delResourceInfoByIds", {
          ids: this.resourceDetails.resourceInfoId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.resourcesList.splice(this.resourceDetailsIndex, 1);
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$notify({
              title: "警告",
              message: "删除失败",
              type: "warning",
            });
          }
        });
    },
  },
  watch: {
    "pageForm.resourceInfoName"(val) {
		this.pageForm.pageNum = 1;
      this.getList();
    },
    "pageForm.resourceAuthorName"(val) {
		this.pageForm.pageNum = 1;
      this.getList();
    },
  },
};
</script>
<style lang="less">
.el-dialog__wrapper {
  z-index: 1000 !important;
}
.v-modal {
  z-index: 999 !important;
}
.el-dialog__body {
  overflow: hidden;
}
.Resource-components {
  min-height: 657px;
  overflow: hidden;
  > .edit-column {
    padding: 24px;
    box-sizing: border-box;
    margin-bottom: 24px;
    background-color: #fff;
    > .box {
      > .title {
        float: left;
        font-weight: 600;
        color: #2a2a2a;
      }
      > .count {
        float: right;
        font-size: 14px;
        color: rgba(33, 33, 33, 0.4);
        > span {
          font-size: 18px;
          color: #0a76d9;
        }
      }
    }
    .select-box {
      padding: 20px 0;
      .el-input__inner {
        height: 27px;
        line-height: 27px;
        // width: 220px;
      }
      .el-input__icon {
        line-height: 27px;
      }
      .el-select {
        > .el-input {
          > input {
            height: 27px;
            // width: 150px;
          }
          .el-input__icon {
            line-height: 0;
          }
        }
      }
    }
  }
  > .list {
    > .el-col {
      margin-bottom: 32px;
      > .box {
        padding: 16px 18px 12px 16px;
        background-color: #fff;
        > .img-top {
          > img {
            margin-right: 24px;
            float: left;
            display: block;
            width: 79px;
            height: 89px;
          }
          > .title {
            margin-bottom: 10px;
            font-weight: 600;
            color: #2a2a2a;
            line-height: 24px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          > .teacher {
            > img {
              margin-right: 9px;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              vertical-align: middle;
            }
            > span {
              font-size: 14px;
              color: #2a2a2a;
            }
          }
        }
        > .time {
          padding: 16px 0 23px 0;
          > div {
            float: left;
            opacity: 0.4;
            font-size: 12px;
            color: rgba(42, 42, 42, 0.4);
            > span {
              color: rgba(42, 42, 42, 0.8);
            }
          }
          > div:nth-child(2) {
            margin-left: 35px;
          }
        }
        > .btn {
          > .el-col {
            float: right;
            > .btn-box {
              cursor: pointer;
              background-color: #ee4f26;
              color: #fff;
              height: 43px;
              line-height: 43px;
              text-align: center;
              font-size: 14px;
              font-weight: 600;
              &:active {
                opacity: 0.6;
              }
            }
          }
        }
      }
    }
  }
  .el-table {
    .resource-img {
      width: 52px;
      height: 60px;
    }
  }
  .el-pagination {
    padding: 40px 0;
    text-align: center;
  }
  .el-icon-more {
    font-size: 20px;
  }
}
</style>