const login = {
    state: {
        isLogin: false, // true为已经登录，false为没登录
        token: '',  // token
    },
    mutations: {
        SET_IS_LOGIN(state, isLogin) {
            state.isLogin = isLogin;
        },
        SET_TOKEN(state, val) {
            state.token = val;
        }
    },
    actions: {

    },
}
export default login;