<template>
<div id="heart" class="row header">
  <canvas id="myCanvas" ref="myCanvas" style="border:1px solid #BBB;" width="200" height="200" />
  <img src="../assets/heart.png" />
</div>
</template>

<script>
// import config from '../components/Config';
import router from '../router';
import store from '../store';

export default {
  name: 'heart-canvas',
  data() {
    return {
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

  },
};
</script>

<style scoped>

</style>
