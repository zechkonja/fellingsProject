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
    <div class="columns is-mobile emotion-item" v-for="office in offices">
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
// import config from '../components/Config';
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
  data() {
    return {};
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

/* .emotion-item {
  background-color: #fcf5f8;

  -webkit-box-shadow: 0 0px 5px 5px rgba(232, 232, 232, 0.75);
  -moz-box-shadow: 0 0px 5px 5px rgba(232, 232, 232, 0.75);
  box-shadow: 0 0px 5px 5px rgba(232, 232, 232, 0.75);
} */

.emotion-item {
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
