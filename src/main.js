// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vueResource from 'vue-resource';
import GSignInButton from 'vue-google-signin-button';
import firebase from 'firebase';
import App from './App';
import router from './router';

Vue.use(vueResource);
Vue.use(GSignInButton);
Vue.config.productionTip = false;

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCOvVWZXKyn31ose1KhyxpYIzP44Rizp0E',
  authDomain: 'fellingsproject.firebaseapp.com',
  databaseURL: 'https://fellingsproject.firebaseio.com',
  projectId: 'fellingsproject',
  storageBucket: 'fellingsproject.appspot.com',
  messagingSenderId: '104782811210',
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
