import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Index",
		// redirect: "About",
		component: () =>
			import("@/views/Index.vue"),
		meta: { requiresAuth: false, title: "名师工作坊", index: 0 },
		children: [
			{
				path: "/Home",
				name: "Home",
				component: () =>
					import("@/views/Index/Home.vue"),
				meta: { requiresAuth: false, title: "主页", index: 1 },
			},
			{
				path: "/Resources",
				name: "Resources",
				component: () =>
					import("@/views/Index/Resources.vue"),
				meta: { requiresAuth: false, title: "教研资源", index: 1 },
			},
			{
				path: "/Resources-column",
				name: "Resources-column",
				component: () =>
					import("@/views/Index/Resources-column.vue"),
				meta: { requiresAuth: false, title: "资源", index: 1 },
			},
			{
				path: "/Teaching-activities",
				name: "Teaching-activities",
				component: () =>
					import("@/views/Index/Teaching-activities.vue"),
				meta: { requiresAuth: false, title: "校本研修", index: 1 },
			},
			{
				path: "/Studio-members",
				name: "Studio-members",
				component: () =>
					import("@/views/Index/Studio-members.vue"),
				meta: { requiresAuth: false, title: "工作坊成员", index: 1 },
			},

			{
				path: "/Message-list",
				name: "Message-list",
				component: () =>
					import("@/views/Index/Message-list.vue"),
				meta: { requiresAuth: false, title: "消息列表", index: 1 },
			},
			{
				path: "/Approval-notice",
				name: "Approval-notice",
				component: () =>
					import("@/views/Studio-management/Approval-notice.vue"),
				meta: { requiresAuth: false, title: "审批通知", index: 1 },
			},
			{
				path: "/Studio-management-column",
				name: "Studio-management-column",
				component: () =>
					import("@/views/Studio-management/Studio-management-column.vue"),
				meta: { requiresAuth: false, title: "工作坊管理", index: 1 },
			},
			{
				path: "/Resource-management",
				name: "Resource-management",
				component: () =>
					import("@/views/Studio-management/Resource-management.vue"),
				meta: { requiresAuth: false, title: "资源管理", index: 1 },
			},
			{
				path: "/My-resource",
				name: "My-resource",
				component: () =>
					import("@/views/Studio-management/My-resource.vue"),
				meta: { requiresAuth: false, title: "我的资源", index: 1 },
			},
			{
				path: "/Personal-information",
				name: "Personal-information",
				component: () =>
					import("@/views/Studio-management/Personal-information.vue"),
				meta: { requiresAuth: false, title: "个人信息", index: 1 },
			},
			{
				path: "/Activity-management",
				name: "Activity-management",
				component: () =>
					import("@/views/Studio-management/Activity-management.vue"),
				meta: { requiresAuth: false, title: "活动管理", index: 1 },
			},
			{
				path: "/Resources-achievement",
				name: "Resources-achievement",
				component: () =>
					import("@/views/Index/Resources-achievement.vue"),
				meta: { requiresAuth: false, title: "研修成果", index: 1 },
			},
		]
	},

	{
		path: "/Personal-details",
		name: "Personal-details",
		component: () =>
			import("../views/Personal-details.vue"),
		meta: { requiresAuth: false, title: "个人详情", index: 0 },
		children: [
			{
				path: "/Personal-home",
				name: "Personal-home",
				component: () =>
					import("@/views/Personal-details/Personal-home.vue"),
				meta: { requiresAuth: false, title: "TA的主页", index: 1 },
			},
			{
				path: "/Personal-resource",
				name: "Personal-resource",
				component: () =>
					import("@/views/Personal-details/Personal-resource.vue"),
				meta: { requiresAuth: false, title: "TA的资源", index: 1 },
			},
			{
				path: "/Personal-data",
				name: "Personal-data",
				component: () =>
					import("@/views/Personal-details/Personal-data.vue"),
				meta: { requiresAuth: false, title: "TA的资料", index: 1 },
			}
		]
	},
	{
		path: "/Activity_Poster_list",
		name: "Activity_Poster_list",
		component: () =>
			import("../views/Activity_poster/Activity_Poster_list.vue"),
		meta: { requiresAuth: false, title: "活动海报", index: 0 }
	},
	{
		path: "/Ueditor",
		name: "Ueditor",
		component: () =>
			import("../views/Ueditor.vue"),
		meta: { requiresAuth: false, title: "Ueditor", index: 0 }
	},
	{
		path: "/Ueditor-demo",
		name: "Ueditor-demo",
		component: () =>
			import("../views/Ueditor-demo.vue"),
		meta: { requiresAuth: false, title: "Ueditor-demo", index: 0 }
	},
	{
		path: "/Tinymce",
		name: "Tinymce",
		component: () =>
			import("../components/Index/Tinymce.vue"),
		meta: { requiresAuth: false, title: "Tinymce", index: 0 }
	},
	{
		path: "/Game-foto",
		name: "Game-foto",
		component: () =>
			import("../views/Activity_poster/Game-foto.vue"),
		meta: { requiresAuth: false, title: "活动集锦", index: 0 }
	},
	{
		path: "/Game_foto_details",
		name: "Game_foto_details",
		component: () =>
			import("../views/Activity_poster/Game_foto_details.vue"),
		meta: { requiresAuth: false, title: "活动集锦详情", index: 0 }
	},
	{
		path: "/Publish-topic",
		name: "Publish-topic",
		component: () =>
			import("../views/Topic-discussion/Publish-topic.vue"),
		meta: { requiresAuth: false, title: "发布话题", index: 0 }
	},
	{
		path: "/Topic-discussion-list",
		name: "Topic-discussion-list",
		component: () =>
			import("../views/Topic-discussion/Topic-discussion-list.vue"),
		meta: { requiresAuth: false, title: "话题讨论", index: 0 }
	},
	{
		path: "/Topic-discussion-details",
		name: "Topic-discussion-details",
		component: () =>
			import("../views/Topic-discussion/Topic-discussion-details.vue"),
		meta: { requiresAuth: false, title: "话题详情", index: 0 }
	},
	{
		path: "/about",
		name: "about",
		component: () =>
			import("../views/About.vue"),
		meta: { requiresAuth: false, title: "学习中心", index: 0 }
	},
	{
		path: "/studycenter",
		name: "studycenter",
		component: () =>
			import("../views/study_center/studycenter.vue"),
		meta: { requiresAuth: false, title: "学习中心", index: 0 }
	},
	{
		path: "/Tsingma-list",
		name: "Tsingma-list",
		component: () =>
			import("../views/study_center/Tsingma-list.vue"),
		meta: { requiresAuth: false, title: "青马在线列表", index: 0 }
	},
	{
		path: "/poems-list",
		name: "poems-list",
		component: () =>
			import("../views/study_center/poems-list.vue"),
		meta: { requiresAuth: false, title: "古诗词鉴赏", index: 0 }
	},
	{
		path: "/explore-list",
		name: "explore-list",
		component: () =>
			import("../views/study_center/explore-list.vue"),
		meta: { requiresAuth: false, title: "探索与发现", index: 0 }
	},
	{
		path: "/Online-resources-details",
		name: "Online-resources-details",
		component: () =>
			import("../views/study_center/Online-resources-details.vue"),
		meta: { requiresAuth: false, title: "资源详情", index: 0 }
	},
	{
		path: "/Tsingma-resources-details",
		name: "Tsingma-resources-details",
		component: () =>
			import("../views/study_center/Tsingma-resources-details.vue"),
		meta: { requiresAuth: false, title: "青马资源详情", index: 0 }
	},
	
	{
		path: "/Studio-joining-application",
		name: "Studio-joining-application",
		component: () =>
			import("../views/Studio-joining-application.vue"),
		meta: { requiresAuth: false, title: "工作坊加入申请", index: 0 }
	},
	{
		path: "/AgreeInvite",
		name: "AgreeInvite",
		component: () =>
			import("../views/AgreeInvite.vue"),
		meta: { requiresAuth: false, title: "工作坊加入申请", index: 0 }
	},
	{
		path: "/Upload-resources",
		name: "Upload-resources",
		component: () =>
			import("../views/Upload-resources.vue"),
		meta: { requiresAuth: false, title: "资源上传", index: 0 }
	},
	{
		path: "/Article-published",
		name: "Article-published",
		component: () =>
			import("../views/Article-published.vue"),
		meta: { requiresAuth: false, title: "文章发表", index: 0 }
	},
	{
		path: "/Member-role-settings",
		name: "Member-role-settings",
		component: () =>
			import("../views/Member-role-settings.vue"),
		meta: { requiresAuth: false, title: "成员角色设置", index: 0 }
	},
	{
		path: "/Poster-details",
		name: "Poster-details",
		component: () =>
			import("../views/Activity_poster/Poster-details.vue"),
		meta: { requiresAuth: false, title: "海报详情", index: 0 }
	},
	{
		path: "/activity-sign-up",
		name: "activity-sign-up",
		component: () =>
			import("../views/Activity_poster/Activity-sign-up.vue"),
		meta: { requiresAuth: false, title: "活动报名", index: 0 }
	},
	{
		path: "/Workspace-resource",
		name: "Workspace-resource",
		component: () =>
			import("../views/Workspace-resource.vue"),
		meta: { requiresAuth: false, title: "工作坊资源详情", index: 0 }
	},
	{
		path: "*",
		redirect: "/Home"
	}
];

const router = new VueRouter({
	mode: "hash",
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, form, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			// 如果不是通过上述行为切换组件，就会让页面回到顶部
			return { x: 0, y: 0 }
		}
	}
});
router.onError((error) => {
	const pattern = /Loading chunk (\d)+ failed/g;
	const isChunkLoadFailed = error.message.match(pattern);
	const targetPath = router.history.pending.fullPath;
	if (isChunkLoadFailed) {
		router.replace(targetPath);
	}
});

export default router;