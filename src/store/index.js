import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

const state = {
  isLogged: !!localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]'),
  userId: (JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]'))) ? JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]')).uid : '',
  emotion: {
    insertDate: '',
    shared: false,
    text: '',
    value: 0,
    error: false,
    reversedId: 0,
  },
  emotions: [],
};

const mutations = {
  LOGIN_USER(state) {
    state.isLogged = true;
    state.userId = (JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]'))) ? JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E:[DEFAULT]')).uid : '';
  },

  LOGOUT_USER(state) {
    state.isLogged = false;
    state.userId = '';
  },

  ADD_EMOTION_VALUE(state, number) {
    state.emotion.value = number;
  },

  ADD_REVERSEDID_VALUE(state, reversedId) {
    state.emotion.reversedId = reversedId;
  },

  ADD_SHARED_VALUE(state, shared) {
    state.emotion.shared = shared;
  },

  ADD_TEXT_VALUE(state, text) {
    state.emotion.text = text;
  },

  RESET_EMOTION(state) {
    state.emotion = {
      insertDate: '',
      shared: false,
      text: '',
      value: 0,
    };
  },

  SAVE_EMOTION(state) {
    state.error = false;
  },

  ERROR_ON_SAVING(state) {
    state.error = true;
  },

  GET_EMOTIONS(state, emotions) {
    state.emotions = emotions;
  },

  EDIT_EMOTION(state, e) {
    e.shared = !e.shared;
    firebase.database().ref().child(`/emotions/${this.state.userId}/${e.id}`)
      .update({
        shared: e.shared,
      });
  },

};

const actions = {
  SAVE_EMOTION(context) {
    const myRef = firebase.database().ref(`/emotions/${this.state.userId}`);
    const newData = {
      insertDate: Math.round((new Date()).getTime() / 1000),
      shared: state.emotion.shared,
      text: state.emotion.text,
      value: state.emotion.value,
    };

    // handle errors please
    myRef.push(newData);
    context.commit('SAVE_EMOTION');
  },

  GET_EMOTIONS(context) {
    const emotions = [];
    const leadsRef = firebase.database().ref(`/emotions/${this.state.userId}`);
    leadsRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        childData.id = childSnapshot.key;
        emotions.push(childData);
      });

      // handle errors please
      context.commit('GET_EMOTIONS', emotions);
    });
  },

  EDIT_SHARED_VALUE(context, emotion) {
    context.commit('EDIT_EMOTION', emotion);
  },
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
});
