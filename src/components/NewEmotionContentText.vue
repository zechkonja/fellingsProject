<template>
<div id="new-emotion-content-text" class="row content">
  <div class="columns is-mobile">
    <div class="column">
      <span>{{ emotion.value }}%</span> <span class="happiness-level">Happiness level</span>
    </div>
    <div class="column">
      <a href="#" class="button share-button" v-bind:class="{ shared: emotion.shared }" v-on:click="shareState">
        <i class="fa fa-share-alt" aria-hidden="true"></i>Share
      </a>
    </div>
  </div>
  <div class="columns is-mobile">
    <div class="column">
      <h1>Why do you feel this way?</h1>
    </div>
  </div>
  <div class="columns is-mobile">
    <div class="column">
      <textarea v-model="emotionText" class="fellings-textarea" placeholder="Describe your fellings..."></textarea>
    </div>
  </div>
  <div class="columns is-mobile">
    <div class="column">
      <button class="button login-btn" v-on:click="save">Save your emotion</button>
    </div>
  </div>
</div>
</template>

<script>
// import config from '../components/Config';
import router from '../router';
import store from '../store';

export default {
  name: 'new-emotion-content-text',
  computed: {
    emotion() {
      return store.state.emotion;
    },
    shared: {
      set(v) {
        store.commit('ADD_SHARED_VALUE', v);
      },
      get() {
        return store.state.emotion.shared;
      },
    },
  },
  data() {
    return {
      emotionText: '',
    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  mounted() {},
  methods: {
    shareState() {
      this.shared = !this.shared;
    },
    save() {
      store.commit('ADD_TEXT_VALUE', this.emotionText);
      store.dispatch('SAVE_EMOTION');
      router.push('/added');
    },
  },
};
</script>

<style scoped>
#new-emotion-content-text {
  background-color: #f8f4f8;
  padding: 20px;
  margin-bottom: 0px;
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


.fellings-textarea {
  width: 100%;
  height: 200px;
  padding: 5px;
}
</style>
