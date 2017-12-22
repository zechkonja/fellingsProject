<template>
<div id="home">
  <div>HOME</div>


  <button class="button" v-on:click="logout">Logout</button>
</div>
</template>

<script>
// import config from '../components/Config';
import firebase from 'firebase';
import router from '../router';
import store from '../store';

export default {
  name: 'home',
  data() {
    return {

    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(function() {
        localStorage.removeItem('token');
        store.commit('LOGOUT_USER');
        router.push('login');
      }).catch(function(error) {
        // An error happened.
      });

    },

  },
};
</script>

<style>

</style>
