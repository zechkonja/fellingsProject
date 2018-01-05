<template>
<div id="added" class="row content">
  <div v-if="error" class="columns is-mobile">
    <div class="column">
      <h2>ERROR ON SAVING</h2>
      <p>Please Try again later</p>
    </div>
  </div>
  <div v-else="!error">
    <div class="columns is-mobile">
      <div class="column">
        <span>{{ emotion.value }}%</span> <span class="happiness-level">Happiness level</span>
      </div>
      <div class="column">
        <a href="#" class="button share-button" v-bind:class="{ shared: shared }" v-on:click="shareState">
        <i class="fa fa-share-alt" aria-hidden="true"></i>Share
      </a>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <h1>Well Done!</h1>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <button class="added" @click="finishEmotion"></button>
      </div>
    </div>
    <div class="columns is-mobile help-text">
      <div class="column">
        <p>Don't forget to share your emotions</p>
        <p>With your advisor :)</p>
      </div>
    </div>
  </div>

</div>
</template>

<script>
// import config from '../components/Config';
import router from '../router';
import store from '../store';

export default {
  name: 'added',
  computed: {
    emotion() {
      return store.state.emotion;
    },
    error() {
      return store.state.error;
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
    finishEmotion() {
      router.push('/emotions');
    },
  },
};
</script>

<style scoped>
#added {
  background-color: #f8f4f8;
  padding: 20px;
  margin-bottom: 0px;
}


.help-text {
  margin-top: 30px;
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


.added {
  background-color: transparent !important;
  background-image: url('../assets/added.png');
  width: 111px;
  height: 111px;
  color: inherit;
  border: none;
  padding: 0! important;
  font: inherit;
  cursor: pointer;
  outline: inherit !important;
}
</style>
