import { get, post, postDownload } from "./index";
// Index
export const getStudioDetails = p => get('workspace/workspace/api/findWorkSpaceInfoById', p); // 工作坊详情
export const getMemberList = p => get('workspace/credits/integralRanking', p); // 获取成员列表
export const getStatisticsList = p => get('workspace/workspace/api/countResourceInfoById', p); // 获取统计列表
export const getVisitor = p => get('workspace/workspace/visit/countWorkspaceVisit', p); // 获取访客
export const Invite_to_join_the_studio = p => get('workspace/invitationRecord/addSingle', p); // 邀请加入工作坊
export const workspaceMenu = p => get('workspace/workspaceMenuDetail/findWorkspaceMenuByRole', p); // 工作坊菜单
export const SubColumnTree = p => get('workspace/workspaceMenu/findMenuTreeByParentId', p); // 子栏目树

// Floating-column
export const styleList = p => get('workspace/dressUp/findAll', p); // 风格列表
export const setStyle = p => post('workspace/workspaceDressUp/addOrUpd', p); // 设置风格
export const messageList = p => get('workspace/notification/findAll', p); // 消息列表

// Home
export const NewsDynamic = p => get('workspace/workspace/api/auditPassWorkSpaceResource', p); // 最新动态
export const Lesson = p => get('workspace/workspace/api/findByRecommendation', p); // 课例
export const findworkSpaceResourceByFormat = p => get('workspace/workspace/api/findworkSpaceResourceByFormat', p); // 获取资源列表
export const Achievement_display = p => get('workspace/teachingGlory/find', p); // 成果展示

// Teaching-activities
export const Activity_Poster_list = p => get('workspace/workspacePosterDetail/findWorkspaceActivityPage', p); // 活动海报
export const Topic_list = p => get('/workspace/workspaceTopic/findTopicList', p); // 话题列表
export const Game_foto = p => get('/workspace/workspaceActivitiesPhoto/selectWorkspaceActivitiesPhotoByPage', p); // 活动集锦
export const addLike = p => post('/workspace/workspace/activityLike/addLike', p); // 点赞

// Game_foto_details
export const Game_foto_details = p => get('/workspace/workspaceActivitiesPhoto/selectById', p); // 活动集锦详情
export const Game_foto_recommend = p => get('/workspace/workspaceActivitiesPhoto/recommend', p); // 活动集锦推荐
export const getAssociatedActivities = p => get('/workspace/workspacePosterDetail/getFinishedActivities', p); // 活动集锦关联活动
export const highlightsSignUp = p => post('/workspace/workspaceActivitiesPhoto/add', p); // 新增活动集锦
export const highlightsUpdate = p => post('/workspace/workspaceActivitiesPhoto/updateById', p); // 修改活动集锦
export const highlightsDel = p => get('/workspace/workspaceActivitiesPhoto/deleteById', p); // 删除活动集锦




// Studio-members
export const memberList = p => get('workspace/workSpace/findAllWorkSpaceMemberInfo', p); // 成员列表

// Resources
export const findTypeAll = p => get('workspace/resourceType/findTypeAll', p); // 类型
export const findFormatAll = p => get('workspace/resourceFormat/findFormatAll', p); // 资源格式
export const getWorkspaceResourcePage = p => get('workspace/workspace/api/getWorkspaceResourcePage', p); // 资源列表
export const getResourceInfoXiaoBen = p => get('workspace/resourceInfo/xiaoBen', p); // 自定义栏目资源

// Personal-details
export const getMemberInfoById = p => get('workspace/workSpace/getMemberInfoById', p); // 成员详情
export const personalResources = p => post('workspace/resourceInfo/personalResources', p); // 个人资源
export const memberResourceDistribution = p => get('workspace/workSpace/memberResourceDistribution', p); // 统计图

// Album-list
export const getAlbumList = p => get('workspace/teachingGlory/findAll', p); // 相册列表
export const AddAlbum = p => post('workspace/teachingGlory/addOrUpd', p); // 添加相册
export const DelAlbum = p => post('workspace/teachingGlory/deleteById?id='+p.id, p); // 删除相册

// Column-management
export const getMenu = p => get('workspace/workspaceMenuDetail/getOptionalWorkspaceMenuTree', p); // 获取菜单
export const addMenu = p => post('workspace/workspaceMenu/studioCustomMenu', p); // 添加菜单
export const delMenu = p => get('workspace/workspaceMenu/deleteStudioCustomMenu', p); // 删除菜单
export const editMenu = p => post('workspace/workspaceMenu/updateStudioCustomMenu', p); // 编辑菜单

// Activity-management
export const Topic_discussion_list = p => get('workspace/workspaceTopic/topicManagementList', p); // 话题讨论列表

// Personal-information
export const updateWorkSpaceMemberInfo = p => post('workspace/workSpace/updateWorkSpaceMemberInfo', p); // 修改个人信息

// Upload-resources
export const resourceUpload = p => post('workspace/workspace/api/upload/workspaceResource', p); // 资源上传发布
export const editResourceUpload = p => post('workspace/resourceInfo/updateResourceInfoById', p); // 编辑资源上传发布
export const getSelfDefinedMenuTree = p => get('workspace/workspaceMenuDetail/getSelfDefinedMenuTree', p); // 自定义栏目列表

// Member-role-settings
export const roleList = p => get('workspace/workspaceRole/findOwnedWorkspaceRole', p); // 角色列表
export const roleMemberList = p => get('workspace/workspaceMemberRole/findMemberByRoleIdAndWorkspaceId', p); // 角色下的成员列表
export const getOptionalWorkspaceMenuTree = p => get('workspace/workspaceMenuDetail/getOptionalWorkspaceMenuTree', p); // 菜单栏目分类
export const addRole = p => post('workspace/workspaceRole/studioAddModuleAdminRole', p); // 新建角色
export const delRole = p => get('workspace/workspaceRole/deleteWorkspaceRoleByWorkspaceId', p); // 删除角色
export const editRole = p => post('workspace/workspaceRoleMenu/addMenuToWorkspaceRole', p); // 编辑角色
export const findMemberWithWorkspaceRoleId = p => get('workspace/workspaceMemberRole/findMemberWithWorkspaceRoleId', p); // 角色成员列表
export const addSubAdmin = p => get('workspace/workspaceMemberRole/updateMemberRole', p); // 添加管理员

// Studio-management-column
export const Announcement = p => get('workspace/notification/addOrUpd', p); // 发布公告
export const setTitle = p => get('workspace/workSpace/updateMemberTitle', p); // 设置头衔


// Topic-discussion
export const getTopicDetails = p => get('/workspace/workspaceTopic/findTopicById', p); // 话题详情
export const getTopicmember = p => get('/workspace/workspaceTopic/findTopicMember', p); // 话题参与成员
export const getTopicList = p => get('/workspace/workspaceTopic/findTopicList', p); // 话题列表
export const TopicThumbUp = p => post('/workspace/topicLikeRecord/add', p); // 话题点赞
export const TopicCancelThumbUp = p => post('/workspace/topicLikeRecord/cancelLike', p); // 话题取消点赞
export const delTopicComment = p => get('/workspace/topicDiscussRecord/deleteComment', p); // 删除话题评论
export const getTopicComment = p => get('/workspace/topicDiscussRecord/findDiscussList', p); // 获取话题评论列表
export const TopicComment = p => post('/workspace/topicDiscussRecord/add', p); // 评论话题
export const viewMoreTopicComment = p => get('/workspace/topicDiscussRecord/seeMoreDiscuss', p); // 话题评论查看更多



// Activity-poster
export const getActivityDetail = p => get('/workspace/workspacePosterDetail/findWorkspaceActivityDetail', p); // 海报详情
export const recommendActivity = p => get('/workspace/workspacePosterDetail/recommendActivities', p); // 推荐海报
export const addActivity = p => post('/workspace/workspacePosterDetail/addWorkspacePosterDetail', p); // 新增海报
export const getActivityComment = p => get('/workspace/workspace/activity/findComments', p); // 查询海报评论列表
export const ActivityComment = p => post('/workspace/workspace/activity/addComments', p); // 添加海报评论
export const ActivityThumbUp = p => post('/workspace/workspace/activityLike/addLike', p); // 海报点赞
export const ActivitySignUpPeople = p => get('/workspace/workspace/activitySignup/findSignup', p); // 查询海报报名人
export const delActivityComment = p => get('/workspace/workspace/activity/deleteComments', p); // 删除海报评论回复
export const viewMoreActivityComment = p => get('/workspace/workspace/activity/findReply', p); // 加载更多海报评论
export const activitySignUpOn = p => post('/workspace/workspace/activitySignup/Signup', p); // 海报报名




// Activity-management
export const editTopic = p => post('/workspace/workspaceTopic/addOrUpd', p); // 话题修改
export const delTopic = p => post('/workspace/workspaceTopic/delByIds', p); // 话题删除
export const activitySignUp = p => post('/workspace/workspacePosterDetail/addWorkspacePosterDetail', p); // 新增海报
export const delResource = p => post('http://120.78.220.65:9099/file/handleFlieResourcesDelete', p); // 删除封面
export const OnlineResource = p => post('http://120.78.220.65:9099/onlineFile/Online', p); // 预览文件
export const delActivity = p => get('/workspace/workspacePosterDetail/deleteActivityByIds', p); // 删除海报
export const activityUpdate = p => post('/workspace/workspacePosterDetail/updateWorkspacePosterDetail', p); // 修改海报信息




// study-center
export const TsingmaSubject = p => get('/workspace/qingmaOnlineSubject/selectQingmaOnlineSubject', p); // 查询青马在线专题
export const getTsingma = p => get('/workspace/qingmaOnline/findQingmaOnlineByVisitCount', p); // 查询青马在线
export const getGoodClass = p => get('/workspace/interestingClass/findInterestingClassByVisitCount', p); // 查询@上好课
export const getFastClass = p => get('/workspace/shortVedio/findShortVedioByVisitCount', p); // 查询快课秀
export const getFastClassSubject = p => get('/workspace/shortVedioSubject/selectShortVedioSubject', p); // 查询快课秀专题资源
export const getStudyResource = p => post('/workspace/studyCenterResourcesInfo/findResources', p); // 查询学习中心资源
export const getStudyResourceSubject = p => post('/workspace/studyCenterProject/findProject', p); // 查询学习中心资源专题
export const addTsingmaViews = p => get('/workspace/qingmaOnline/selcetQingmaOnlineById', p); // 新增青马资源浏览量
export const getResourceDetails = p => get('/workspace/studyCenterResourcesInfo/findResourcesDetil', p); // 诗词鉴赏探索详情
export const getRecommendResource = p => get('/workspace/studyCenterResourcesInfo/recommendedResources', p); // 详情页推荐专题资源
export const getRecommendTsingma = p => get('/workspace/qingmaOnline/recommendedQingmaOnline', p); // 详情页青马推荐资源


//Approval-notice
export const workspaceResource = p => get('workspace/workspace/api/find/workspaceResource', p); // 获取资源审批列表
export const resourceAuditAdd = p => get('workspace/reourceAudit/resourceAuditAdd', p); // 确认资源审批
export const workslist = p => get('workspace/worksBack/workslist', p); // 获取资源审批列表
export const applyWorkSpaceMember = p => get('workspace/workspace/api/applyWorkSpaceMember', p); // 是否加入工作坊

export const getWorkspaceResourceManage = p => get('workspace/workspace/api/getWorkspaceResourceManage', p); // 获取列表
export const findTreeBack = p => get('workspace/excel/findTreeBack', p); // 获取列表
export const findAllWorkSpaceMemberInfo = p => get('workspace/workSpace/findAllWorkSpaceMemberInfo', p); // 获取成员列表
export const delResourceInfoByIds = p => get('workspace/resourceInfo/delResourceInfoByIds', p); // 获取分类列表


//资源播放
export const findById = p => get('workspace/resourceInfo/findById', p); // 获取分类列表
export const online = p => post('http://120.78.220.65:9099/onlineFile/Online', p); // 获取分类列表
export const findResourceInfoListRecommend = p => post('workspace/resourceInfo/findResourceInfoListRecommend'+"?pageIndex="+p.pageIndex+"&pageSize="+p.pageSize+"gradeId="+p.gradeId+"&resourceId="+p.resourceId, p); // 获取分类列表
export const resourceScore = p => post('workspace/resourceScore/add'+"?id="+p.id+"&score="+p.score, p); // 获取分类列表
export const download = p => postDownload('http://120.78.220.65:9099/onlineFile/download', p); // 获取分类列表
export const downNum = p => get('/workspace/resourceInfo/resourceInfoDownload', p); // 获取分类列表

export const dict = p => get('/workspace/dict?dictType=capability_point'); // 获取分类列表