<template>
  <div class="Column-management">
    <el-button type="primary" style="margin-bottom: 20px" @click="add"
      >添加一级分类</el-button
    >

    <div class="block">
      <el-tree
        :data="treeList"
        :props="{ label: 'name' }"
        accordion
        node-key="value"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="node.label !== 'testtest'" class="editBtn">
            <el-button
              type="text"
              size="mini"
              v-if="!data.data.basicFlag && !data.data.secondFloorFlag"
              @click="() => append(data)"
              >添加</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-if="!data.data.basicFlag"
              @click="() => edit(node, data)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-if="!data.data.basicFlag"
              @click="() => remove(node, data)"
              >删除</el-button
            >
          </span>
        </span>
      </el-tree>
    </div>

    <!-- dialog -->
    <el-dialog
      :title="editText"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="400px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="workspaceMenuName">
          <el-input
            v-model="ruleForm.workspaceMenuName"
            placeholder="请输入名称"
            maxlength="4"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- dialog -->
    <el-dialog
      :title="editText"
      :visible.sync="dialogFormVisibles"
      :close-on-click-modal="false"
      width="400px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules2"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="workspaceMenuName">
          <el-input
            v-model="ruleForm.workspaceMenuName"
            placeholder="请输入名称"
            maxlength="4"
            show-word-limit
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="分类" prop="resourceTypeId">
          <el-select v-model="ruleForm.resourceTypeId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.resourceTypeId"
              :label="item.resourceTypeName"
              :value="item.resourceTypeId"
              v-show="item.resourceTypeName !== '全部'"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibles = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000;
export default {
  name: "Column-management",
  data() {
    return {
      dialogFormVisible: false, // 弹出框
      dialogFormVisibles: false, // 弹出框
      treeList: [], // tree列表
      options: [], // 分类
      ruleForm: {
        workspaceMenuId: "",
        workspaceMenuName: "",
        parentId: "",
        workspaceId: this.$store.getters.workspaceId,
        resourceTypeId: "",
      },
      rules: {
        workspaceMenuName: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
      },
      rules2: {
        workspaceMenuName: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
        // resourceTypeId: [
        //   { required: true, message: "请选择分类", trigger: "change" },
        // ],
      },
      editText: "新增",
      btnFlag: true, // 按钮节流阀
    };
  },
  created() {
    this.getData(); // 获取数据
    // 分类
    this.$api.findTypeAll().then((res) => {
      this.options = res.data.data;
    });
  },
  methods: {
    // 添加一级
    add() {
      this.dialogFormVisible = true;
      this.editText = "新增";
      this.ruleForm = {
        workspaceMenuName: "",
        parentId: "",
        workspaceId: this.$store.getters.workspaceId,
        resourceTypeId: "",
      };
    },
    // 添加二级
    append(data) {
      this.editText = "新增";
      this.ruleForm = {
        workspaceMenuName: "",
        parentId: "",
        workspaceId: this.$store.getters.workspaceId,
        resourceTypeId: "",
      };
      this.ruleForm.parentId = data.id;
      this.dialogFormVisibles = true;
    },
    edit(node, data) {
      this.editText = "编辑";
      this.ruleForm.workspaceMenuName = data.name;
      this.ruleForm.parentId = data.data.parentId;
      this.ruleForm.resourceTypeId = data.data.resourceTypeId;
      this.ruleForm.workspaceMenuId = data.data.workspaceMenuId;

      if (data.data.parentId == 0) {
        this.dialogFormVisible = true;
      } else {
        this.dialogFormVisibles = true;
      }
    },
    remove(node, data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "",
      })
        .then(() => {
          this.$api
            .delMenu({
              menuIds: data.id,
              workspaceId: this.$store.getters.workspaceId,
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.getData(); // 获取数据
              }
            });
        })
        .catch(() => {});
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
    // 获取数据
    getData() {
      this.$api
        .getMenu({
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          this.treeList = res.data.data;

          this.$api
            .workspaceMenu({ workspaceId: this.$store.getters.workspaceId })
            .then((res) => {
              var arr = [];
              res.data.data.menuTree.forEach((item) => {
                if (item.data.isMust == 1 || item.data.isMust == 2) {
                  arr.push(item);
                }
                this.$store.commit("SET_TAB_LIST", arr);
              });
            });
        });
    },
    submit() {
      if (this.btnFlag) {
        if (this.submitForm()) {
          if (this.editText == "新增") {
            this.btnFlag = false;
            this.$api.addMenu(this.ruleForm).then((res) => {
              if (res.data.code == 200) {
                this.getData(); // 获取数据
              } else {
                this.$notify({
                  title: "警告",
                  message: res.data.message,
                  type: "warning",
                });
              }
              this.dialogFormVisible = false;
              this.dialogFormVisibles = false;
              setTimeout(() => {
                this.btnFlag = true;
              }, 1000);
            });
          } else {
            this.btnFlag = false;
            this.$api.editMenu(this.ruleForm).then((res) => {
              if (res.data.code == 200) {
                this.getData(); // 获取数据
                this.dialogFormVisible = false;
                this.dialogFormVisibles = false;
              } else {
              }
              setTimeout(() => {
                this.btnFlag = true;
              }, 1000);
            });
          }
        }
      }
    },
  },
};
</script>
<style lang="less">
.Column-management {
  .block {
    margin-bottom: 50px;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
    .el-tree-node {
      padding: 5px 0;
    }
    .el-tree-node__content {
      .editBtn {
        display: none;
      }
      &:hover {
        .editBtn {
          margin-right: 40px;
          display: block;
        }
      }
    }
  }
}
</style>