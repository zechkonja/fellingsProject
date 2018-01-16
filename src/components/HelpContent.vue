<template>
<div id="help-content" class="row content">
  <div class="columns is-mobile">
    <div class="column">
      <h2>Help</h2>
    </div>
  </div>
  <div class="columns is-mobile help-content">
    <div class="column">
      <h5><b>How to add Emotion?</b></h5>
      <p>You can add Emotion by clicking on heart and press button Next</p>
    </div>
  </div>
</div>
</template>

<script>
// import config from '../components/Config';
import router from '../router';
import store from '../store';

export default {
  name: 'help-content',
  data() {
    return {};
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  beforeMount() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
#help-content {
  background-color: #f8f4f8;
  padding: auto;
  margin-bottom: 0px;
  flex: 1;
  overflow: auto;
}

.columns {
  margin: 0;
}

.help-content {
  text-align: left;
}
</style>
