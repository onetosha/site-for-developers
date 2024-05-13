import { createStore } from 'vuex';

const store = createStore({
  state: {
    userName: null
  },
  mutations: {
    setUserName(state, userName) {
      state.userName = userName;
    }
  },
  actions: {
    updateUserName({ commit }, userName) {
      commit('setUserName', userName);
    }
  }
});
export default store;