<template>
<div id="emotion-added" class="box">
  <app-header></app-header>
  <app-content></app-content>
  <app-footer></app-footer>
</div>
</template>

<script>
// import config from '../components/Config';

import router from '../router';
import store from '../store';

import appHeader from './Header';
import Added from './Added';
import appFooter from './Footer';

export default {
  name: 'emotion-added',
  components: {
    'app-header': appHeader,
    'app-content': Added,
    'app-footer': appFooter,
  },
  data() {
    return {

    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  methods: {

  },
};
</script>

<style scoped>
#emotion-added {
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
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

.box .row.content {
  flex: 1 1 auto;
}

.box .row.footer {
  flex: 0 1 52px;
}
</style>
