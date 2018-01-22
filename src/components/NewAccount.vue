<template>
<div id="new-account">
  <section class="section">
    <div class="columns">
      <div class="column is-4">
      </div>
      <div class="column is-4">
        <h2>New account</h2>
        <div class="login-form">
          <div class="field">
            <p :class="{ 'control': true }">
              <input class="input is-medium" v-model="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>
          </div>
          <div class="field">
            <p :class="{ 'control': true }">
              <input class="input is-medium" v-model="password" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('email') }" name="password" type="password" placeholder="Password">
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
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
    </div>
  </section>
</div>
</template>

<script>
import firebase from 'firebase';
import router from '../router';
import store from '../store';

export default {
  name: 'new-account',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  beforeCreate() {},
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (result) => {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: ' ',
          }).then(function() {
            store.dispatch('VERIFY_USER_EMAIL_PASS', user);
            store.commit('LOGIN_USER');
            router.push('/');
          }).catch(function(error) {
            throw new Error(error.message);
          });
        },
        (err) => {
          throw new Error(err.message);
        },
      );
    },
  },
};
</script>

<style>
#new-account {
  z-index: 2;
  background-color: #f8f3f7;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}

.login-btn {
  width: 100%;
  border-radius: 50px;
  color: white;
  font-weight: 500;

  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#9274dc+0,b862bf+41,fb438d+100 */
  background: rgb(146, 116, 220);
  /* Old browsers */
  background: -moz-linear-gradient(left, rgba(146, 116, 220, 1) 0%, rgba(184, 98, 191, 1) 41%, rgba(251, 67, 141, 1) 100%);
  /* FF3.6-15 */
  background: -webkit-linear-gradient(left, rgba(146, 116, 220, 1) 0%, rgba(184, 98, 191, 1) 41%, rgba(251, 67, 141, 1) 100%);
  /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right, rgba(146, 116, 220, 1) 0%, rgba(184, 98, 191, 1) 41%, rgba(251, 67, 141, 1) 100%);
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9274dc', endColorstr='#fb438d', GradientType=1);
  /* IE6-9 */
}
</style>
