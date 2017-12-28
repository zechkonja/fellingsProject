import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  isLogged: !!localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]'),
  emotion: {
    insertDate: '',
    shared: false,
    text: '',
    value: 0,
  },
};

const mutations = {
  LOGIN_USER(state) {
    state.isLogged = true;
  },

  LOGOUT_USER(state) {
    state.isLogged = false;
  },

  ADD_EMOTION_VALUE(state, number) {
    state.emotion.value = number;
  },

  ADD_SHARED_VALUE(state, shared) {
    state.emotion.shared = shared;
  },

};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
});
