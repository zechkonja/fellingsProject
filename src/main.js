// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vueResource from 'vue-resource';
import GSignInButton from 'vue-google-signin-button';
import firebase from 'firebase';
import VeeValidate from 'vee-validate';
import App from './App';
import router from './router';
import './css/main.scss';

Vue.use(vueResource);
Vue.use(GSignInButton);
Vue.use(VeeValidate);

Vue.use(require('vue-moment'));

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

Vue.filter('cutText', value => value.split(' ').slice(0, 15).join(' '));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
});
