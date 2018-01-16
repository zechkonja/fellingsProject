<template>
<div id="delete-content" class="row content">
  <div class="columns is-mobile">
    <div class="column">
      <h1>Are you sure?</h1>
    </div>
  </div>
  <div class="columns is-mobile">
    <div class="column">
      <button class="button login-btn" v-on:click="remove">Remove your emotion</button>
      <button @click="back" type="button" class="button back-button">Back</button>
    </div>
  </div>
</div>
</template>

<script>
import router from '../router';
import store from '../store';

export default {
  name: 'delete-content',
  computed: {
    removeEmotion() {
      return store.state.removeEmotion;
    },
    selectedIndex() {
      return store.state.removeEmotionIndex;
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
    remove() {
      store.dispatch('DELETE_EMOTION');
      router.push('/emotions');
    },
    back() {
      router.push('/emotions');
    },
  },
};
</script>

<style scoped>
#delete-content {
  background-color: #F8F4F8;
  padding: 20px;
  margin-bottom: 0px;
  flex: 1;
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

.fellings-textarea {
  width: 100%;
  height: 200px;
  padding: 5px;
}

.emotion-value {
  font-weight: bolder;
}

.back-button {
  background-color: transparent;
  border-radius: 50px;
  font-weight: bold;
  font-size: 14px;
  padding-left: 30px;
  padding-right: 30px;
  color: #e096cb;
  border: 1px solid #e096cb;
  margin-top: 15px;
}
</style>
