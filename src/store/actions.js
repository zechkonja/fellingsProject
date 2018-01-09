import firebase from 'firebase';

export default {
  SAVE_EMOTION(context) {
    const myRef = firebase.database().ref(`/emotions/${this.state.userId}`);
    const newData = {
      insertDate: Math.round((new Date()).getTime() / 1000),
      shared: this.state.emotion.shared,
      text: this.state.emotion.text,
      value: this.state.emotion.value,
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

};
