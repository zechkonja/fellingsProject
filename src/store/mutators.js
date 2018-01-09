import firebase from 'firebase';
import cryptico from 'cryptico';

export default {
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
    const text1 = cryptico.encrypt(text, cryptico.publicKeyString(this.state.RSAkey));
    state.emotion.text = text1.cipher;
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

  GET_ADVISORS(state, advisors) {
    state.advisors = advisors;
  },

  EDIT_EMOTION(state, e) {
    e.shared = !e.shared;
    firebase.database().ref().child(`/emotions/${this.state.userId}/${e.id}`)
      .update({
        shared: e.shared,
      });
  },

  EMOTIONS_DATA_READY(state) {
    state.emotionsReady = true;
  },

  ADVISORS_DATA_READY(state) {
    state.advisorsReady = true;
  },

};
