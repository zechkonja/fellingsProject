<template>
<div id="emotions" class="box">
  <app-header></app-header>
  <app-content></app-content>
  <app-footer></app-footer>
</div>
</template>

<script>
import router from '../router';
import store from '../store';
import appHeader from './Header';
import AllEmotions from './AllEmotions';
import appFooter from './Footer';

export default {
  name: 'emotions',
  components: {
    'app-header': appHeader,
    'app-content': AllEmotions,
    'app-footer': appFooter,
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
};
</script>

<style scoped>
#emotions {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
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
