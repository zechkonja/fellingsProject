<template>
<div id="all-emotions" class="row content">
  <div class="columns is-mobile">
    <div class="column">
      <h2>Learn your emotions</h2>
      <section class="fixed-position">
        <b-notification class="info-notify" :active.sync="isActive">
          You shared your emotion with Emotion advisor!
        </b-notification>
      </section>
    </div>
  </div>
  <div :class="{'is-waiting': !dataReady}">
    <div class="columns is-mobile">
      <div class="column" v-if="emotions.length > 0">
        <span>{{ avg }}%</span> <span class="happiness-level">Average Happiness level</span>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column" :class="showHide ? 'show' : 'hide'">
        <div>You don't have any emotions! Add some!</div>
      </div>
    </div>
    <div class="columns is-mobile emotion-item" v-for="em in encryptedEmotions">
      <button @click="confirmCustomDelete(em)" v-show="em.oneDayEdit" type="button" class="delete right-corner"></button>
      <div class="column is-two-fifths">
        <div class="heart">
          <Heart :value="em.value" :size="50" :enabled="false" />
        </div>
      </div>
      <div class="column">
        <div class="info">
          <div class="time">
            <span>{{ em.insertDate | moment("D. MM. YYYY") }}</span> AT
            <span>{{ em.insertDate | moment("h:mm") }}</span>
          </div>
          <div class="value">
            <span class="emotion-value">{{ em.value }}%</span><span>Happines level</span>
          </div>
          <div class="short-text">
            <p>{{ em.text | cutText }}</p>
          </div>
          <div class="actions">
            <button @click="openEdit(em)" v-show="em.oneDayEdit" class="clear-button edit"></button>
            <button class="clear-button share" :class="{'share-colored': em.shared}" v-on:click="shareState(em)"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import config from '../components/Config';
import cryptico from 'cryptico';
import router from '../router';
import store from '../store';
import Heart from './Heart';

export default {
  name: 'all-emotions',
  components: {
    Heart,
  },
  computed: {
    emotion() {
      return store.state.emotion;
    },
    emotions() {
      return store.state.emotions;
    },
    encryptedEmotions() {
      return store.getters.encryptedEmotions;
    },
    rsaKey() {
      return store.state.RSAkey;
    },
    dataReady() {
      return store.state.emotionsReady;
    },
    avg() {
      let total = 0;
      const length = store.state.emotions.length;
      for (let i = 0; i < length; i++) {
        total += parseFloat(store.state.emotions[i].value);
      }
      return Math.round(total / length);
    },
    showHide() {
      if (store.state.emotions.length === 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      filter: '',
      isActive: false,
      interval: null,
    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  beforeMount() {
    store.dispatch('UPDATE');
    store.dispatch('GET_EMOTIONS');
  },
  mounted() {
    this.interval = setInterval(() => {
      store.dispatch('UPDATE');
    }, 43200);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    shareState(emotion) {
      store.dispatch('EDIT_SHARED_VALUE', emotion);
      if (emotion.shared) {
        this.isActive = !this.isActive;
      }
    },
    confirmCustomDelete(emotion) {
      this.$dialog.confirm({
        title: 'Deleting emotion',
        message: 'Are you sure you want to <b>delete</b> your emotion? This action cannot be undone.',
        confirmText: 'Delete emotion',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => store.dispatch('DELETE_EMOTION', emotion),
      });
    },

    openEdit(emotion) {
      store.dispatch('ADD_VALUE_FOR_UPDATE', emotion);
      router.push('/update-emotion');
    },

  },
};
</script>

<style lang="scss" scoped>
#all-emotions {
    background-color: #f8f4f8;
    padding: 20px;
    margin-bottom: 0;
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
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=  '#9274dc', endColorstr='#fb438d', GradientType=1);
    /* IE6-9 */
}

.emotion-item {
    position: relative;
    background-color: #f8f4f8;
    padding-top: 10px;
    margin-bottom: 20px;

    -webkit-box-shadow: 0 0 5px 5px rgba(232, 232, 232, 0.75);
    -moz-box-shadow: 0 0 5px 5px rgba(232, 232, 232, 0.75);
    box-shadow: 0 0 5px 5px rgba(232, 232, 232, 0.75);
}

.right-corner {
    position: absolute;
    right: 7px;
    top: 7px;
}

.heart img {
    width: 80px;
    height: 70px;
}

.info {
    text-align: left;
}

.info .time {
    font-size: 14px;
    font-weight: bold;
    color: #fc428c;
}

.info .value span {
    font-weight: bold;
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
    padding: 0 !important;
    font: inherit;
    cursor: pointer;
    outline: inherit !important;
}

.info .edit {
    background-image: url("../assets/edit.png");
    width: 14px;
    height: 16px;
    margin-right: 10px;
}

.info .share {
    background-image: url("../assets/share.png");
    width: 14px;
    height: 13px;
}

.info .share-colored {
    background-image: url("../assets/share-colored.png");
    width: 14px;
    height: 13px;
}

.show {
    display: block;
    visibility: visible;
}

.hide {
    display: none;
}

.fixed-position {
    position: absolute;
    left: 0;
    top: 50px;
    margin: 15px;
    z-index: 2;
}

.info-notify {
    background-color: lightslategrey;
    color: white;
}

.theme-color {
    background-color: #fc428c;
}
</style>
