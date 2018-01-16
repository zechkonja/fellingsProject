import Vue from 'vue';

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

  GET_ADVISORS(state, advisors) {
    state.advisors = advisors;
  },

  EDIT_EMOTION(state, emotion) {
    state.emotions.forEach((element, index) => {
      if (element.id === emotion.id) {
        state.emotions[index].shared = emotion.shared;
      }
    });
  },

  UPDATE_EMOTION(state, cryptedText) {
    state.emotions.forEach((element, index) => {
      if (element.id === state.updateEmotion.id) {
        state.emotions[index].text = cryptedText;
      }
    });
  },

  EMOTIONS_DATA_READY(state) {
    state.emotionsReady = true;
  },

  ADVISORS_DATA_READY(state) {
    state.advisorsReady = true;
  },

  DELETE_EMOTION(state) {
    state.emotions.forEach((element, index) => {
      if (element.id === state.removeEmotion.id) {
        delete state.emotions[index];
      }
    });
  },

  ADD_VALUE_FOR_UPDATE(state, emotion) {
    state.updateEmotion = emotion;
  },

  ADD_EMOTION_FOR_REMOVE(state, emotion) {
    state.removeEmotion = emotion;
  },

  ADD_INDEX_FOR_REMOVE(state, index) {
    state.removeEmotionIndex = index;
  },

  CHECK_CONNECTION(state, connection) {
    state.connected = true;
    state.approved = connection.approved;
  },

  GET_OFFICES(state, offices) {
    state.offices = offices;
  },

  OFFICES_DATA_READY(state) {
    state.officesReady = true;
  },

  SET_OFFICE(state, office) {
    state.choosenOffice = office;
  },

  SET_ADVISOR(state, advisor) {
    state.choosenAdvisor = advisor;
  },

  USER_DATA(state, user) {
    state.userInfo = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
    };
  },

  CHECK_ADDED_CONNECTION(state, connection) {
    state.addedConnection = connection;
  },

  RESET_ADDED_CONNECTION(state) {
    state.addedConnection = {};
  },

};
