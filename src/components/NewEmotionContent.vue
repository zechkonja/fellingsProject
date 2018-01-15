<template>
<div id="new-emotion-content" class="row content">
  <div class="columns is-mobile">
    <div class="column">
      <h1>How do you feel?</h1>
      <span>Click on Heart</span>
    </div>
  </div>
  <div class="columns is-mobile">
    <div class="column">
      <Heart :value="emotion.value ? emotion.value : 50" :size="100" :enabled="true" />
      <router-link class="button next-button" to="emotion-text">Next</router-link>
    </div>
  </div>
  <div class="columns is-mobile help-text">
    <div class="column">
      <p>Emotions are crypted</p>
      <p>Only you can see your fellings</p>
    </div>
  </div>
</div>
</template>

<script>
// import config from '../components/Config';
import router from '../router';
import store from '../store';
import Heart from './Heart';

export default {
  name: 'new-emotion-content',
  components: {
    Heart,
  },
  computed: {
    emotion() {
      return store.state.emotion;
    },
  },
  data() {
    return {
      shared: false,
    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  mounted() {
  },
  methods: {
    shareState() {
      this.shared = !this.shared;
      store.commit('ADD_SHARED_VALUE', this.shared);
    },
  },
};
</script>

<style scoped>
#new-emotion-content {
  background-color: #F8F4F8;
  padding: 20px;
  margin-bottom: 0px;
  flex: 1;
  overflow: auto;
}


.help-text {
  /* margin-top: 30px; */
}

.help-text .column p {
  margin-bottom: 0;
  font-size: 14px;
}

.share-button {
  background-color: transparent;
  border-radius: 50px;
  font-weight: bold;
  font-size: 12px;
  padding-left: 15px;
  padding-right: 15px;
}

.share-button i {
  margin-right: 5px;
}

.fa-share-alt::before {
  font-size: 10px;
  font-weight: 100;
}

.happiness-level {
  font-size: 12px;
}

.shared {
  background-color: #e74c9c;
  color: white;
}

.next-button {
  background-color: transparent;
  border-radius: 50px;
  font-weight: bold;
  font-size: 18px;
  padding-left: 30px;
  padding-right: 30px;
  color: #996dd5;
  border: 1px solid #996dd5; 
  margin-top: 15px;
}
</style>
