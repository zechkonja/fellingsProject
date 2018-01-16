<template>
<div id="content-top" class="row">
  <div class="columns is-mobile">
    <div class="column">
      <span class="emotion-value">{{ emotion.value }}%</span> <span class="happiness-level">Happiness level</span>
    </div>
    <div class="column">
      <a href="#" class="button share-button" v-bind:class="{ shared: emotion.shared }" v-on:click="shareState">
        <i class="fa fa-share-alt" aria-hidden="true"></i>Share
      </a>
    </div>
  </div>
</div>
</template>

<script>
import router from '../router';
import store from '../store';

export default {
  name: 'content-top',
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
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  methods: {
    shareState() {
      this.shared = !this.shared;
    },
  },
};
</script>

<style scoped>
#content-top {
  background-color: #F8F4F8;
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

.emotion-value {
  font-weight: bolder;
}

</style>
