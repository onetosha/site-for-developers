import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    userName: null,
    userRoles: []
  },
  mutations: {
    setUserName(state, userName) {
      state.userName = userName;
    },
    setUserRoles(state, userRoles) {
      state.userRoles = userRoles;
    }
  },
  actions: {
    async updateUserData({ commit }, userName) {
      commit('setUserName', userName);
      if (userName != null) {
        try {
          console.log(userName);
          const response = await axios.post('/roles/user', { userName });
          if (response.data != null) {
            commit('setUserRoles', response.data.data);
          }
          console.log(response.data.data);
        } 
        catch (error) {
            console.error(error);
        }
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.userName,
    userRoles: state => state.userRoles,
    hasRole: (state) => (role) => {
      return state.userRoles.some(r => r.name === role);
    }
  }
});
export default store;