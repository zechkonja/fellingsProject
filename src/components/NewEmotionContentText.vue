<template>
<div id="new-emotion-content-text" class="row content">
  <ContentTop />
  <div class="columns is-mobile">
    <div class="column">
      <h1>Why do you feel this way?</h1>
    </div>
  </div>
  <div class="columns is-mobile">
    <div class="column">
      <textarea v-model="emotionText" class="fellings-textarea" placeholder="Describe your fellings...">
      </textarea>
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
import router from '../router';
import store from '../store';
import ContentTop from './ContentTop';
import mixin from '../mixins/mixin';

export default {
  name: 'new-emotion-content-text',
  components: {
    ContentTop,
  },
  mixins: [mixin],
  props: ['UpdateEmotion'],
  computed: {
    emotion() {
      return store.state.emotion;
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
  methods: {
    save() {
      store.dispatch('SAVE_EMOTION', this.encrypt(this.emotionText));
      router.push('/added');
    },
  },
};
</script>

<style scoped>
#new-emotion-content-text {
  background-color: #F8F4F8;
  padding: 20px;
  margin-bottom: 0px;
  flex: 1;
  overflow: auto;
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

.emotion-value {
  font-weight: bolder;
}

</style>
