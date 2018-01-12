import firebase from 'firebase';
import cryptico from 'cryptico';

export default {
  UPDATE(context) {
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
    context.commit('ADD_TEXT_VALUE', cryptico.encrypt(emotionText, cryptico.publicKeyString(this.state.RSAkey)).cipher);
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

  DELETE_EMOTION(context, emotion) {
    firebase.database().ref(`/emotions/${this.state.userId}/${emotion.id}`).remove();
    context.commit('DELETE_EMOTION', emotion);
  },

  UPDATE_EMOTION(context, emotion) {
    firebase.database().ref().child(`/emotions/${this.state.userId}/${emotion.id}`)
      .update({
        text: cryptico.encrypt(emotion.text, cryptico.publicKeyString(this.state.RSAkey)).cipher,
      });
    context.commit('UPDATE_EMOTION', emotion);
  },

  GET_EMOTIONS(context) {
    const emotions = [];
    const leadsRef = firebase.database().ref(`emotions/${this.state.userId}`);
    leadsRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        childData.id = childSnapshot.key;
        emotions.push(childData);
      });

      // handle errors please
      context.commit('GET_EMOTIONS', emotions);
      context.commit('EMOTIONS_DATA_READY');
    });
  },

  GET_ADVISORS(context) {
    const advisors = [];
    const leadsRef = firebase.database().ref('/users/');
    leadsRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.isPsy === true) {
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

};
