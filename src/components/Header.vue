<template>
<div id="header" class="row header">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand is-large">
        <router-link class="navbar-item" to="/emotions">
          <img src="../assets/small-heart.png" alt="Fellings" height="100px">
          <span class="nav-title">Fellings</span>
        </router-link>
        <button @click="makeBurger" class="button navbar-burger" data-target="navMenu" v-bind:class="{ 'is-active': activator }">
              <span class="stripe"></span>
              <span class="stripe"></span>
              <span class="stripe"></span>
        </button>
      </div>
      <div class="navbar-menu" id="navMenu" v-bind:class="{ 'is-active': activator }">
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link class="navbar-item" to="/help">
              <span class="nav-title">Help</span>
            </router-link>
          </div>
          <div class="navbar-item">
            <button class="button" v-on:click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
// import config from '../components/Config';
import firebase from 'firebase';
import router from '../router';
import store from '../store';

export default {
  name: 'app-header',
  data() {
    return {
      activator: false,
    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        store.commit('LOGOUT_USER');
        router.push('login');
      }).catch((error) => {
        // An error happened.
        throw new Error(error);
      });
    },
    makeBurger() {
      this.activator = !this.activator;
      return this.activator;
    },
    help() {

    },
  },
};
</script>

<style scoped>
.navbar {
  -moz-box-shadow: 0 2px 2px rgba(182, 182, 182, 0.25);
  -webkit-box-shadow: 0 2px 2px rgba(182, 182, 182, 0.25);
  box-shadow: 0 2px 2px rgba(182, 182, 182, 0.25);
}

.nav-title {
  margin-left: 5px;
  font-weight: bold;
}

.navbar-burger {
  border: 0;
}

.stripe {
  background-image: url('../assets/stripe.png');
  background-color: transparent;
  width: 16px;
  height: 4px;
}

.button.navbar-burger.is-active .stripe {
  background-image: url('../assets/flat-stripe.png');
  background-color: transparent;
  width: 16px;
  height: 2px;
}
</style>
