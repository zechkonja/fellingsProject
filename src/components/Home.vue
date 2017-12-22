<template>
<div id="home">
<div>HOME</div>


<button class="button" v-on:click="logout">Logout</button>
</div>
</template>

<script>
// import config from '../components/Config';
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
      localStorage.removeItem('token');
      store.commit('LOGOUT_USER');
      router.push('login');
    },

  },
};
</script>

<style>

</style>
