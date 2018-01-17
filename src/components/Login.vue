<template>
<div id="login">
  <section class="section">
    <div class="columns">
      <div class="column is-4">
      </div>
      <div class="column is-4">
        <div><img src="../assets/logo-heart.png" /></div>
        <h1>Fellings App</h1>
        <span class="small-title">Login</span>
        <div class="login-form">
          <form v-on:submit.prevent="validateEmailAddress">
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
                <button class="button login-btn" v-on:click="loginWithData">Login</button>
              </p>
            </div>
          </form>
        </div>
        <div><span class="small-title"> <router-link to="new-account">Create Account</router-link></span></div>
        <div><span class="small-title"><a href="#">Lost your password?</a></span></div>
      </div>
    </div>
    <hr />
    <div class="columns">
      <div class="column is-12">
        <button class="button signin-button" v-on:click="login">Google login</button>
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
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        store.dispatch('VERIFY_USER', result.user);
        store.commit('LOGIN_USER');
        store.dispatch('UPDATE');
        router.push('/');
      }).catch((error) => {
        const errorMessage = error.message;
        throw new Error(errorMessage);
      });
    },
    loginWithData() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          store.commit('LOGIN_USER');
          router.push('/');
        }).catch((error) => {
        // const errorCode = error.code;
          const errorMessage = error.message;
          throw new Error(errorMessage);
        });
    },
    validateEmailAddress: (e) => {
      if (e.keyCode === 13) {
        this.loginWithData();
      }
    },
  },
};
</script>

<style>
#login {
  background-color: #f8f3f7;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}

.small-title {
  font-size: 12px;
  margin: 10px;
  font-weight: bold;
}

.login-form {
  margin-top: 20px;
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

.signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border: none;
  border-radius: 3px;
  background-color: #e04fa2;
  color: #fff;
  box-shadow: 0 3px 0 #9a70d7;
  margin: 0px 10px 20px 10px;
}
</style>
