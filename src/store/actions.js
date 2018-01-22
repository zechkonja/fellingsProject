import firebase from 'firebase';

export default {
  UPDATE() {
    const currentDate = Math.floor(Date.now() / 1000);
    const leadsRef = firebase.database().ref(`emotions/${this.state.userId}`);
    leadsRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        childData.id = childSnapshot.key;
        if ((currentDate - childData.insertDate) > (24 * 60 * 60)) {
          firebase.database().ref(`/emotions/${this.state.userId}/${childData.id}`).update({
            oneDayEdit: false,
          });
        }
      });
    });
  },

  SAVE_EMOTION(context, emotionText) {
    context.commit('ADD_TEXT_VALUE', emotionText);
    const newPostKey = firebase.database().ref('emotions').child(this.state.userId).push().key;
    firebase.database().ref(`/emotions/${this.state.userId}/${newPostKey}`).set({
      insertDate: Math.floor(Date.now() / 1000),
      shared: this.state.emotion.shared,
      text: this.state.emotion.text,
      value: this.state.emotion.value,
      oneDayEdit: true,
    });

    // handle errors please
    context.commit('SAVE_EMOTION');
  },

  DELETE_EMOTION(context) {
    firebase.database().ref(`/emotions/${this.state.userId}/${this.state.removeEmotion.id}`).remove();
    context.commit('DELETE_EMOTION');
  },

  UPDATE_EMOTION(context, encryptedText) {
    firebase.database().ref().child(`/emotions/${this.state.userId}/${this.state.updateEmotion.id}`)
      .update({
        text: encryptedText,
      });
    context.commit('UPDATE_EMOTION', encryptedText);
  },

  GET_ADVISORS(context) {
    const advisors = [];
    const leadsRef = firebase.database().ref('/advisors');
    leadsRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (context.rootState.choosenOffice.id === childData.officeId) {
          childData.id = childSnapshot.key;
          advisors.push(childData);
        }
      });

      // handle errors please
      context.commit('GET_ADVISORS', advisors);
      context.commit('ADVISORS_DATA_READY');
    });
  },

  EDIT_SHARED_VALUE(context, emotion) {
    emotion.shared = !emotion.shared;
    firebase.database().ref().child(`/emotions/${this.state.userId}/${emotion.id}`)
      .update({
        shared: emotion.shared,
      });
    context.commit('EDIT_EMOTION', emotion);
  },

  VERIFY_USER(context, user) {
    const leadsRef = firebase.database().ref();
    const timestamp = (new Date()).getTime();
    leadsRef.once('value', (snapshot) => {
      if (snapshot.child(`/users/${user.uid}`).exists()) {
        leadsRef.child(`/users/${user.uid}`).update({
          lastLogin: timestamp,
        });
      } else {
        firebase.database().ref(`users/${user.uid}`).set({
          email: user.email,
          emailVerified: user.emailVerified,
          fullName: user.displayName,
          isAdmin: 'false',
          isPsy: 'false',
          isSuper: 'false',
          lastLogin: timestamp,
          uid: user.uid,
          imageUrl: user.photoURL,
        });
      }
    });
    context.commit('USER_DATA', user);
    context.dispatch('CHECK_CONNECTION', user);
  },

  VERIFY_USER_EMAIL_PASS(context, user) {
    const leadsRef = firebase.database().ref();
    const timestamp = (new Date()).getTime();
    leadsRef.once('value', (snapshot) => {
      if (snapshot.child(`/users/${user.uid}`).exists()) {
        leadsRef.child(`/users/${user.uid}`).update({
          lastLogin: timestamp,
        });
      } else {
        firebase.database().ref(`users/${user.uid}`).set({
          email: user.email,
          emailVerified: user.emailVerified,
          fullName: user.displayName,
          isAdmin: 'false',
          isPsy: 'false',
          isSuper: 'false',
          lastLogin: timestamp,
          uid: user.uid,
          imageUrl: '',
        });
      }
    });
    context.commit('USER_DATA', user);
    context.dispatch('CHECK_CONNECTION', user);
  },

  CHECK_CONNECTION(context, user) {
    const leadsRef = firebase.database().ref('connections/');
    leadsRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        childSnapshot.forEach((connected) => {
          const con = connected.val();
          if (con.patient === user.uid) {
            context.commit('CHECK_CONNECTION', con);
          }
        });
      });
    });
  },

  DATA_READY(context) {
    context.commit('DATA_READY');
  },

  RESET_EMOTION(context) {
    context.commit('RESET_EMOTION');
  },

  ADD_TEXT_VALUE(context, text) {
    context.commit('ADD_TEXT_VALUE', text);
  },

  ADD_VALUE_FOR_UPDATE(context, emotion) {
    context.commit('ADD_VALUE_FOR_UPDATE', emotion);
  },

  GET_OFFICES(context) {
    const offices = [];
    const leadsRef = firebase.database().ref('/offices');
    leadsRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        childSnapshot.forEach((child) => {
          const office = child.val();
          offices.push(office);
        });
      });

      // handle errors please
      context.commit('GET_OFFICES', offices);
      context.commit('OFFICES_DATA_READY');
    });
  },

  SET_OFFICE(context, office) {
    context.commit('SET_OFFICE', office);
  },

  SET_ADVISOR(context, advisor) {
    context.commit('SET_ADVISOR', advisor);
  },

  CHECK_ADDED_CONNECTION(context) {
    const leadsRef = firebase.database().ref(`connections/${this.state.choosenAdvisor.id}`);
    leadsRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const con = childSnapshot.val();
        con.id = childSnapshot.key;
        if (con.patient === this.state.userId) {
          context.commit('CHECK_ADDED_CONNECTION', con);
        }
      });
    });
  },

  RESET_CHECK_CONNECTION(context) {
    context.commit('RESET_ADDED_CONNECTION');
  },

  CREATE_CONNECTION(context, advisor) {
    const newPostKey = firebase.database().ref('connections').child(advisor.id).push().key;
    firebase.database().ref(`/connections/${advisor.id}/${newPostKey}`).set({
      insertDate: Math.floor(Date.now() / 1000),
      approved: false,
      patient: this.state.userId,
      fullName: this.state.userInfo.displayName,
    });
  },

  DELETE_CONNECTION(context, connection) {
    firebase.database().ref(`/connections/${this.state.choosenAdvisor.id}/${connection.id}`).remove();
  },

  ADD_EMOTION_FOR_REMOVE(context, emotion) {
    context.commit('ADD_EMOTION_FOR_REMOVE', emotion);
  },

  ADD_INDEX_FOR_REMOVE(context, index) {
    context.commit('ADD_INDEX_FOR_REMOVE', index);
  },

  ADD_NUM_ALL_EMOTIONS(context, number) {
    context.commit('ADD_NUM_ALL_EMOTIONS', number);
  },

};
