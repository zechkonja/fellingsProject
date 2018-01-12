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
        <h1>Well Done!</h1>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <button class="added1" @click="finishEmotion">
          <b-icon
                pack="fa"
                icon="check"
                size="is-large">
            </b-icon>
        </button>
      </div>
    </div>
    <div class="columns is-mobile help-text">
      <div class="column">
        <p>You can edit/delete your emotions</p>
        <p>in the next <b>24 hours</b></p>
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
      store.dispatch('RESET_EMOTION');
      router.push('/emotions');
    },
  },
};
</script>

<style scoped>
#added {
  background-color: #F8F4F8;
  padding: 20px;
  margin-bottom: 0px;
  flex: 1;
  overflow: auto;
}


.help-text {
  margin-top: 0px;
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

.added1 {
  background-color: transparent !important;
  width: 111px;
  height: 111px;
  color: inherit;
  border: none;
  padding: 0! important;
  font: inherit;
  cursor: pointer;
  outline: inherit !important;
  border-radius: 500px;
  color: white;

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
