import Vue from 'vue';
import Vuex from 'vuex';
import Cryptico from 'cryptico';
import mutators from './mutators';
import actionsFile from './actions';

Vue.use(Vuex);

const state = {
  isLogged: !!localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]'),
  userId: (JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]'))) ? JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]')).uid : '',
  RSAkey: Cryptico.generateRSAKey('The Moon is a Harsh Mistress.', 1024),
  emotion: {
    insertDate: '',
    shared: false,
    text: '',
    value: 0,
    error: false,
    reversedId: 0,
  },
  emotions: [],
  advisors: [],
  emotionsReady: false,
  advisorsReady: false,
};

const mutations = mutators;
const actions = actionsFile;

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
});
