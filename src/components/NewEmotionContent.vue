<template>
<div id="new-emotion-content" class="row content">
  <div class="columns is-mobile">
    <div class="column">
      <span>{{ emotion.value }}%</span> <span class="happiness-level">Happiness level</span>
    </div>
    <div class="column">
      <a href="#" class="button share-button"
          v-bind:class="{ shared: shared }"
          v-on:click="shareState">
        <i class="fa fa-share-alt" aria-hidden="true"></i>Share
      </a>
    </div>
  </div>
  <div class="columns is-mobile">
    <div class="column">
      <h1>How do you feel?</h1>
    </div>
  </div>
  <div class="columns is-mobile">
    <div class="column">
      <Heart />
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
    this.shared = this.emotion.shared;
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
  background-color: #f8f4f8;
  padding: 20px;
  margin-bottom: 0px;
}


.help-text{
  margin-top: 30px;
}

.help-text .column p {
  margin-bottom: 0;
  font-size: 14px;
}

.share-button{
  background-color: transparent;
  border-radius: 50px;
  font-weight: bold;
  font-size: 12px;
  padding-left: 15px;
  padding-right: 15px;
}

.share-button i{
  margin-right: 5px;
}

.fa-share-alt::before {
  font-size: 10px;
  font-weight: 100;
}

.happiness-level{
  font-size: 12px;
}

.shared {
  background-color: #e74c9c;
  color: white;
}

.next-button{
  background-color: transparent;
  border-radius: 50px;
  font-weight: bold;
  font-size: 18px;
  padding-left: 30px;
  padding-right: 30px;
  color: #e096cb;
}

</style>
