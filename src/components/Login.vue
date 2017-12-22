<template>
<div id="login">
  <section class="section">
    <div class="container">

      <div class="columns">
        <div class="column is-4">
        </div>
        <div class="column is-4">
          <div class="logo-image"><img src="../assets/logo-heart.png" /></div>
          <h1>Fellings App</h1>
          <span class="small-title">Login</span>
          <div class="login-form">
            <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
              Google
            </g-signin-button>
            <div class="field">
              <p class="control">
                <input class="input is-medium" type="email" placeholder="Email">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <input class="input is-medium" type="password" placeholder="Password">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button login-btn" v-on:click="login">Login</button>
              </p>
            </div>
          </div>
          <div><span class="small-title"> <router-link to="new-account">Create Account</router-link></span></div>
          <div><span class="small-title"><a href="#">Lost your password?</a></span></div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
// import config from '../components/Config';
import firebase from 'firebase';
import router from '../router';
import store from '../store';

export default {
  name: 'login',
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '104782811210-ua87mce48mlqh9rv130jefel48q9ktoj.apps.googleusercontent.com',
      },
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
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        console.log(user);
        localStorage.setItem('token', token);
        store.commit('LOGIN_USER');
        router.push('/');
        // ...
      }).catch((error) => {
        // Handle Errors here.
        // let errorCode = error.code;
        // let errorMessage = error.message;
        // // The email of the user's account used.
        // let email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // let credential = error.credential;
      });
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getAuthResponse(); // etc etc
      localStorage.setItem('token', profile.id_token);
      store.commit('LOGIN_USER');
      router.push('/');
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error);
    },
  },
};
</script>

<style>
#login {
  background-color: #f8f5f8;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

.logo-image {
  margin-top: 30px;
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

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #e04fa2;
  color: #fff;
  box-shadow: 0 3px 0 #9a70d7;
  margin: 0px 10px 20px 10px;
}
</style>
