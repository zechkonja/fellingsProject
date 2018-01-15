import Vue from 'vue';
import Vuex from 'vuex';
import cryptico from 'cryptico';
import mutators from './mutators';
import actionsFile from './actions';

Vue.use(Vuex);

const state = {
  isLogged: !!localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]'),
  userId: (JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]'))) ? JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]')).uid : '',
  RSAkey: cryptico.generateRSAKey('The Moon is a Harsh Mistress.', 1024),
  connected: false,
  approved: false,
  added: false,
  userInfo: {
    displayName: '',
    email: '',
    uid: 0,
  },
  emotion: {
    insertDate: '',
    shared: false,
    text: '',
    value: 0,
    error: false,
    reversedId: 0,
  },
  updateEmotion: {
    insertDate: '',
    shared: false,
    text: '',
    value: 0,
    error: false,
    reversedId: 0,
  },
  choosenOffice: {
    address: '',
    id: 0,
    name: '',
    officeUrl: '',
    imageUrl: '',
    phone: 0,
    shortInfo: 0,
  },
  choosenAdvisor: {
    fullName: '',
    about: '',
    experience: 0,
    fallowers: 0,
    imageUrl: '',
    officeId: 0,
    rating: 0,
  },
  emotions: [],
  advisors: [],
  offices: [],
  emotionsReady: false,
  advisorsReady: false,
  officesReady: false,
};

const getters = {
  encryptedEmotions: (state) => {
    const encryptedEmotions = state.emotions.map(emotion => ({
      id: emotion.id,
      insertDate: emotion.insertDate,
      shared: emotion.shared,
      text: cryptico.decrypt(emotion.text, state.RSAkey).plaintext,
      value: emotion.value,
      oneDayEdit: emotion.oneDayEdit,
    }));
    return encryptedEmotions;
  },
};

const mutations = mutators;
const actions = actionsFile;

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
});
