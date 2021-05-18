const userRights = {
    state: {
        workspaceMember: false, // 是否工作坊成员
        belongAdmin: false, // 是否工作坊管理员
        workspaceId: '', // 工作坊ID
        personalDetails: {},// 个人详情
        tabs: "主页", // tabs选择
        tabsList: [],// 栏目
        treeList: [], // 子栏目树
        lwStudio: false,// 李薇工作坊
        style: {}, // 风格
        floatingColumn_List: [] // 悬浮列表
    },
    mutations: {
        SET_WORKSPACE_ID(state, val) {
            state.workspaceId = val
        },
        SET_PERSONAL_DETAILS(state, val) {
            state.personalDetails = val
        },
        SET_TABS(state, val) {
            state.tabs = val
        },
        SET_TAB_LIST(state, val) {
            state.tabsList = val
        },
        SET_TREE_LIST(state, val) {
            state.treeList = val
        },
        SET_LISTUDIO(state, val) {
            state.lwStudio = val
        },
        SET_STYLE(state, val) {
            state.style = val
        },
        SET_FLOATINGCOLUMNLIST(state, val) {
            state.floatingColumn_List = val
        }
    }
}
export default userRights;