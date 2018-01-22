<template>
<div id="profile" class="row content">
  <div class="columns is-mobile background-gradient">
    <div class="column">
      <h5>My Profile</h5>
      <div class="image">
        <img :src="profile.imageUrl ? profile.imageUrl : require('../assets/advisor_img.png')" />
      </div>
      <div class="profile-name">
        <h5>{{profile.fullName}}</h5>
      </div>
      <input v-model="fullName" placeholder="Name and Surname">
      <button @click="update">Update</button>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';
import router from '../router';
import store from '../store';

export default {
  name: 'profile',
  computed: {
    userId() {
      return store.state.userId;
    },
  },
  data() {
    return {
      profile: {},
      fullName: '',
    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  mounted() {
    const leadsRef = firebase.database().ref(`users/${this.userId}`);
    leadsRef.on('value', (snapshot) => {
      this.profile = snapshot.val();
    });
  },
  beforeDestroy() {},
  methods: {
    update() {
      profile.fullName = this.fullName;
      store.dispatch('UPDATE_USER', profile);
    }
  },
};
</script>

<style scoped>
#profile {
  background-color: #f8f4f8;
  padding: auto;
  margin-bottom: 0px;
  flex: 1;
  overflow: auto;
}

.columns {
  margin: 0;
}

.column h5 {
  margin-top: 30px;
  font-size: 20px;
}

.profile-name h5 {
  margin-top: 15px;
  font-weight: bold;
}

.image img{
  margin: 0 auto;
  border-radius: 100px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  background-size: cover;
  display: block;
  height: 150px;
  width: 150px;
}
</style>
