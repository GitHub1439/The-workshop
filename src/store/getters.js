const getters = {
    isLogin: state => state.login.isLogin, // 是否登录
    token: state => state.login.token, // token
    keepAlive: state => state.keepAlive.keepAlive, // 页面缓存
    workspaceId: state => state.UserRights.workspaceId, // 工作坊ID
    personalDetails: state => state.UserRights.personalDetails, // 个人信息
    tabs: state => state.UserRights.tabs, // tabs选择
    tabsList: state => state.UserRights.tabsList, // 栏目
    treeList: state => state.UserRights.treeList, // 子栏目树
    lwStudio: state => state.UserRights.lwStudio,// 李薇工作坊
    style: state => state.UserRights.style, // 风格
    floatingColumn_List: state => state.UserRights.floatingColumn_List // 悬浮列表
};
export default getters