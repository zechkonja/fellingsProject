<template>
<div id="main-app" class="box">
  <app-header></app-header>
  <router-view/>
  <app-footer></app-footer>
</div>
</template>

<script>
import router from './router';
import store from './store';
import appHeader from './components/Header';
import appFooter from './components/Footer';

export default {
  name: 'main-app',
  components: {
    'app-header': appHeader,
    'app-footer': appFooter,
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
};
</script>

<style>
#main-app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  margin-bottom: 0;
}

.box {
  padding: 0;
  display: flex;
  flex-flow: column;
  height: 100%;
}

.box .row {
  border: 0;
}

.box .row.header {
  flex: 0 1 auto;
}

.box .row.content {
  flex: 1 1 auto;
}

.box .row.footer {
  flex: 0 1 52px;
}
</style>
