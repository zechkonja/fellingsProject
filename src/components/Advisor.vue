<template>
<div id="advisor" class="row content">
  <div class="columns is-mobile">
    <div class="column">
      <h1>Advisor</h1>
    </div>
  </div>
</div>
</template>

<script>
// import config from '../components/Config';
import router from '../router';
import store from '../store';

export default {
  name: 'advisor',
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

  },
  methods: {},
};
</script>

<style scoped>
#advisor {
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
</style>
