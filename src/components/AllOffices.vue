<template>
<div id="all-offices" class="row content">
  <div class="columns is-mobile">
    <div class="column">
      <h2>Choose Office</h2>
    </div>
  </div>
  <div class="columns is-mobile">
    <div class="column">
      <span class="happiness-level">Choose office from list</span>
    </div>
  </div>
  <div :class="{'is-waiting': !dataReady}">
    <div class="columns is-mobile office-item" v-for="office in offices">
      <div class="column is-two-fifths">
        <div class="image">
          <img :src="office.imageUrl ? office.imageUrl : require('../assets/advisor_img.png')" />
        </div>
      </div>
      <div class="column">
        <div class="info">
          <div class="title">
            {{office.name}}
          </div>
          <div class="short-text">
            {{office.shortInfo | cutText}}
          </div>
          <div class="actions">
            <button @click="chooseOffice(office)" class="clear-button advisor-btn">Choose Office</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import router from '../router';
import store from '../store';

export default {
  name: 'all-offices',
  computed: {
    offices() {
      return store.state.offices;
    },
    dataReady() {
      return store.state.officesReady;
    },
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  mounted() {
    this.getOffice();
    store.commit('RESET_EMOTION');
  },
  methods: {
    getOffice() {
      store.dispatch('GET_OFFICES');
    },
    chooseOffice(office) {
      store.dispatch('SET_OFFICE', office);
      store.dispatch('GET_ADVISORS');
      router.push('/advisors');
    },
  },
};
</script>

<style scoped>
#all-offices {
  background-color: #f8f4f8;
  padding: 20px;
  margin-bottom: 0px;
  flex: 1;
  overflow: auto;
}

.happiness-level {
  font-size: 12px;
}

.office-item {
  background-color: white;
  padding-top: 10px;
  margin-bottom: 20px;

  -webkit-box-shadow: 0 0px 5px 5px rgba(232, 232, 232, 0.75);
  -moz-box-shadow: 0 0px 5px 5px rgba(232, 232, 232, 0.75);
  box-shadow: 0 0px 5px 5px rgba(232, 232, 232, 0.75);
}

.image img {
  margin: 0 auto;
  width: 70%;
  height: 70%;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
}

.info {
  text-align: left;
}

.info .title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}

.info .value .emotion-value {
  font-size: 20px;
  margin-right: 10px;
}

.info .short-text {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 10px;
}

.clear-button {
  background-color: transparent !important;
  background-repeat: no-repeat;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit !important;
}

.advisor-btn {
  font-size: 13px;
  font-weight: bold;
  color: #8f84a0;
  border: 1px solid rgba(232, 232, 232, 0.75);
  border-radius: 50px;
  padding-left: 15px;
  padding-right: 15px;

}
</style>
