<template>
<div id="new-account">
  <div>New account</div>
  <div class="login-form">
    <div class="field">
      <p class="control">
        <input class="input is-medium" v-model="email" type="email" placeholder="Email">
      </p>
    </div>
    <div class="field">
      <p class="control">
        <input class="input is-medium" v-model="password" type="password" placeholder="Password">
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button login-btn" v-on:click="signUp">Create</button>
        <span>Or go back to <router-link to="/login">login</router-link>.</span>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'new-account',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  beforeCreate() {

  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        function(user){
          alert('Your account has been created!');
        },
        function(err){
          alert('Oops. ' + err.message);
        },
      );
    }
  },
};
</script>

<style>

</style>
