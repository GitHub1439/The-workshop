<template>
  <div class="Member-role-settings">
    <div class="member-box">
      <div class="title">成员角色设置</div>
      <div class="role-column">
        角色管理<span> ({{ roleList.length }}/5)</span>
        <div
          class="add-role"
          @click="(dialogVisible = true), clearData(), (text = '新增')"
          v-if="roleList.length < 5"
        >
          新增管理角色
        </div>
      </div>
      <div class="left">
        <ul>
          <li
            v-for="(item, index) in roleList"
            :key="index"
            @mouseover="roleMouseover(item)"
          >
            <i class="el-icon-user-solid"></i>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                {{ item.workspaceRoleName }}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="editRole(item)"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item @click.native="delRole(item)"
                  >删除角色</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
      <div class="right" v-if="memberShow">
        <div class="member-column">
          {{ roleColumnName }}
          <div
            class="add-member"
            @click="
              (dialogVisibles = true),
                getTableMemberList(),
                (pageForm.pageNum = 1)
            "
          >
            <i class="el-icon-plus"></i>
            添加成员
          </div>
        </div>
        <ul>
          <li class="clearfix" v-for="(item, index) in memberList" :key="index">
            <img :src="item.avatar" alt="" />
            <div class="name">
              <div>{{ item.memberName }}</div>
              <div>
                {{ item.memberGroup | stringCutting(10) }}
                {{ item.speciality | stringCutting(12) }}
              </div>
            </div>
            <div class="btn" @click="addSubAdmin(item, 2)">撤销管理员</div>
          </li>
          <div class="none-data" v-if="memberList.length == 0">暂无数据</div>
        </ul>
      </div>
    </div>

    <el-dialog
      title="新建管理员"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <div class="label">名称</div>
      <el-input
        style="margin-bottom: 32px"
        placeholder="请输入名称"
        class="suffix"
        type="text"
        v-model="form.workspaceRoleName"
        maxlength="10"
        show-word-limit
      ></el-input>
      <div class="label">管理权限</div>
      <el-cascader
        :options="options"
        :props="{
          value: 'id',
          label: 'name',
          children: 'children',
          multiple: true,
        }"
        v-model="form.treeList"
        collapse-tags
        clearable
      ></el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="addRole(), (text = '新增')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="新建管理员"
      :visible.sync="dialogVisibles"
      width="900px"
      :close-on-click-modal="false"
    >
      <!-- 搜索 -->
      <el-input
        class="search"
        placeholder="搜索成员"
        prefix-icon="el-icon-search"
        v-model="pageForm.memberName"
      ></el-input>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <el-image class="table-td-thumb" :src="scope.row.avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberName"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="memberGroup"
          label="单位"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="联系方式"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="speciality"
          label="专长"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="加入时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="name" label="成员类型" align="center">
          <template slot-scope="scope">
            <div
              :class="scope.row.tag == '成员' ? 'class1' : 'class2'"
              disable-transitions
            >
              {{ scope.row.tag }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="155">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="addSubAdmin(scope.row, 1)"
              >添加</el-button
            >
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
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Member-role-settings",
  components: {},
  data() {
    return {
      roleList: [], // 角色列表
      roleName: "", // 管理员分类
      roleColumnName: "", // 管理员分类栏目名称
      memberList: [], // 成员列表
      options: [], // 栏目列表 tree
      form: {
        treeList: [], // 权限栏目
        workspaceMenuIds: [], // 权限栏目
        workspaceRoleName: "", // 新建角色名称
        workspaceRoleId: "", // 角色ID
        workspaceId: this.$store.getters.workspaceId,
      },
      text: "新增",
      memberShow: false,
      dialogVisible: false,
      dialogVisibles: false,
      tableData: [],
      pageForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        workspaceId: this.$store.getters.workspaceId,
        memberName: "", // 检索名称
        workspaceRoleId: "", // 角色ID
      },
    };
  },
  created() {
    this.getRoleList(); // 获取角色列表

    // 菜单栏目分类
    this.$http
      .get("workspace/workspaceRoleMenu/getManageWorkspaceMenuTree", {
        workspaceId: this.$store.getters.workspaceId,
      })
      .then((res) => {
        this.options = res.data.data;
      });
  },
  mounted() {},
  methods: {
    clearData() {
      this.form = {
        treeList: [], // 权限栏目
        workspaceMenuIds: [], // 权限栏目
        workspaceRoleName: "", // 新建角色名称
        workspaceRoleId: "", // 角色ID
        workspaceId: this.$store.getters.workspaceId,
      };
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getTableMemberList(); // 获取成员列表
    },
    // 获取table成员列表
    getTableMemberList() {
      this.$api.findMemberWithWorkspaceRoleId(this.pageForm).then((res) => {
        this.pageForm.total = res.data.data.total;
        this.tableData = res.data.data.records;
      });
    },
    // 角色菜单触摸事件
    roleMouseover(item) {
      this.memberShow = true;
      this.roleColumnName = item.workspaceRoleName;
      this.getRoleMemberList(item.workspaceRoleId);
      this.pageForm.workspaceRoleId = item.workspaceRoleId; // 当前获取角色ID
    },
    // 获取角色列表
    getRoleList() {
      this.$api
        .roleList({
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          this.roleList = res.data.data;
        });
    },
    // 获取角色下的成员列表
    getRoleMemberList(workspaceRoleId) {
      this.$api
        .roleMemberList({
          workspaceId: this.$store.getters.workspaceId,
          workspaceRoleId: workspaceRoleId,
        })
        .then((res) => {
          this.memberList = res.data.data;
        });
    },
    // 添加角色
    addRole() {
      if (this.text == "新增") {
		  let details = JSON.stringify(this.form.treeList)
        this.$api
          .addRole({
            workspaceId: this.$store.getters.workspaceId,
            workspaceRoleName: this.form.workspaceRoleName,
            workspaceMenuIds: details,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.dialogVisible = false;
              this.getRoleList(); // 获取角色列表
            } else {
              this.$notify({
                title: "警告",
                message: res.data.message,
                type: "",
              });
            }
          });
      } else {
        // this.form.workspaceMenuIds = this.form.treeList;
		let details = JSON.parse(JSON.stringify(this.form))
		details.workspaceMenuIds = JSON.stringify(details.treeList)
		details.treeList = JSON.stringify(details.treeList)
		this.$api.editRole(details).then((res) => {
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.getRoleList(); // 获取角色列表
          } else {
            this.$notify({
              title: "警告",
              message: res.data.message,
              type: "",
            });
          }
        });
      }
    },
    // 删除角色
    delRole(item) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "",
      })
        .then(() => {
          this.$api
            .delRole({
              roleIds: item.workspaceRoleId,
              workspaceId: this.$store.getters.workspaceId,
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.getRoleList(); // 获取角色列表
                this.memberShow = false;
              }
            });
        })
        .catch(() => {});
    },
    // 编辑角色
    editRole(item) {
      this.text = "编辑";
      this.$http
        .get("workspace/workspaceRoleMenu/getWorkspaceMenuTreeByRole", {
          workspaceRoleId: item.workspaceRoleId,
          workspaceId: this.$store.getters.workspaceId,
        })
        .then((res) => {
          this.dialogVisible = true;
          this.form.workspaceMenuIds = this.form.treeList = res.data.data.check;
          this.form.workspaceRoleName = item.workspaceRoleName;
          this.form.workspaceRoleId = item.workspaceRoleId;
        });
    },
    // 添加管理员
    addSubAdmin(item, adminFlag) {
      this.$api
        .addSubAdmin({
          adminFlag: adminFlag, // 1添加管理员 2删除管理员
          memberId: item.memberId,
          workspaceId: this.$store.getters.workspaceId,
          workspaceRoleId: this.pageForm.workspaceRoleId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.dialogVisibles = false;
            this.getRoleMemberList(this.pageForm.workspaceRoleId);
          } else {
            this.$notify({
              title: "警告",
              message: res.data.message,
              type: "warning",
            });
          }
        });
    },
  },
  watch: {
    "pageForm.memberName"(val) {
      this.pageForm.pageNum = 1;
      this.getTableMemberList(); // 获取table成员列表
    },
  },
  filters: {},
};
</script>
<style lang="less" scoped>
.Member-role-settings {
  background-color: #faf3dc;
  min-height: 100vh;
  padding: 50px 0;
  > .member-box {
    padding: 0 67px 0 44px;
    box-sizing: border-box;
    margin: 0 auto;
    width: 900px;
    height: 749px;
    background: #ffffff;
    border-radius: 8px;
    > .title {
      padding: 20px 0 24px 0;
      font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
      font-weight: 600;
      text-align: center;
      color: #161614;
    }
    > .role-column {
      margin-bottom: 44px;
      font-weight: 600;
      color: #161614;
      > span {
        color: rgba(22, 22, 20, 0.4);
      }
      > .add-role {
        cursor: pointer;
        float: right;
        font-weight: 600;
        color: #5688ff;
      }
    }
    > .left {
      float: left;
      width: 260px;
      > ul {
        > li {
          cursor: pointer;
          padding: 15px 0 15px 44px;
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
          font-weight: 600;
        }
      }
    }
    > .right {
      float: left;
      width: 529px;
      height: 542px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.18);
      > .member-column {
        position: relative;
        height: 59px;
        line-height: 59px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
        font-weight: 600;
        text-align: center;
        color: #161614;
        > .add-member {
          position: absolute;
          right: 20px;
          bottom: 13px;
          cursor: pointer;
          width: 91px;
          height: 30px;
          border: 1px solid rgba(86, 136, 255, 0.6);
          border-radius: 4px;
          line-height: 30px;

          font-size: 14px;
          font-weight: 600;
          text-align: center;
          color: #5688ff;
        }
      }
      > ul {
        height: 480px;
        overflow-y: scroll;
        > li {
          padding: 20px 25px 20px 40px;
          &:hover {
            background-color: rgba(86, 136, 255, 0.08);
          }
          > img {
            float: left;
            margin-right: 14px;
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
          > .name {
            float: left;
            > div:nth-child(1) {
              margin: 5px 0;
              font-size: 14px;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: 700;
              color: #2a2a2a;
            }
            > div:nth-child(2) {
              opacity: 0.8;
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              color: rgba(42, 42, 42, 0.8);
            }
          }
          > .btn {
            cursor: pointer;
            line-height: 40px;
            float: right;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            color: #ee4f26;
          }
        }
      }
    }
  }
  .label {
    margin-bottom: 10px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    color: #5688ff;
  }
  .none-data {
    line-height: 400px;
    text-align: center;
    color: #606266;
  }
}
</style>