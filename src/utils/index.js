import Vue from 'vue';
import axios from 'axios';
import store from '../store/index';
import router from "../router/index";


let loginUrl = "";
if (process.env.VUE_APP_CURRENTMODE == 'developer') {
	loginUrl = "http://study.hnedu123.cn/login"
	Vue.prototype.$fileApi = "http://120.78.220.65:9099/" // 文件上传
} else if (process.env.VUE_APP_CURRENTMODE == 'test') {
	loginUrl = 'http://study.hnedu123.cn/login'
	Vue.prototype.$fileApi = "http://120.78.220.65:9099/" // 文件上传
} else {
	console.log(process)
	console.log('production');
	loginUrl = "http://study.hnedu123.cn/login"
	Vue.prototype.$fileApi = "http://120.78.220.65:9099/" // 文件上传

}

const baseURL = "/requestApi"; // 配置axios请求的地址
// const $http = axios.create({
//     baseURL,
// })
axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = false; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization
// axios.defaults.headers.common["token"] = store.getters.user.access_token; // 页面刷新获取token
axios.defaults.headers.common["token"] = store.getters.token;
axios.defaults.headers.common["eduCheck"] = "hnedu";

// 请求拦截
axios.interceptors.request.use(config => {
	return config;
}, error => {
	return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(
	response => {
		//当返回信息为未登录或者登录失效的时候重定向为登录页面
		if (response.data.code == '401' || response.data.message == '请重新登录') {
			// localStorage.clear()
			setTimeout(() => {
				// router.push({
				//     path: "/login",
				//     querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
				// })

				window.location.replace(loginUrl)
			}, 1000);
		}
		return response;
	},
	error => {
		return Promise.reject(error)
	})
// 导航守卫
router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requiresAuth)) { // 判断该路由是否需要登录权限
		// console.log(store.getters.isLogin);
		if (store.getters.isLogin) { // 如果当前有登录
			next();
		} else {
			console.log("没有登录吖")
			next({
				path: '/Home',
				// query: { redirect: to.fullPath }
			})
		}
	} else {
		next();
	}
});

export const get = (url, params) => {
	params = params || {};
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params,
		}).then(res => {
			resolve(res);
		}).catch(error => {
			console.log('请求异常');
			reject(error);
		})
	})
}
export const post = (url, params) => {
	return new Promise((resolve, reject) => {
		axios.post(url, params).then(res => {
			resolve(res);
		}).catch(error => {
			console.log(url, params);
			console.log('请求异常');
			reject(error);
		})
	})
}

export const postDownload = (url, params) => {    
    return new Promise((resolve, reject) => {         
        axios({
            method: "POST",
            url: url,
            responseType: "blob",
            data: params,
          })        
        .then(res => {            
            resolve(res);        
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}