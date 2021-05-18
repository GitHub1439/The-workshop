import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
import getters from "./getters";
import login from "./modules/login";
import keepAlive from "./modules/keepAlive";
import UserRights from "./modules/User-rights";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    keepAlive,
    UserRights
  },
  getters,
  plugins: [createPersistedState()]
});
