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
      <div class="column" v-if="this.emotionsTest.length > 0">
        <span>{{ avg }}%</span> <span class="happiness-level">Average Happiness level</span>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column" :class="showHide ? 'show' : 'hide'">
        <div>You don't have any emotions! Add some!</div>
      </div>
    </div>
    <div class="columns is-mobile emotion-item" v-for="(em, index) in emotionsTest">
      <button @click="confirmCustomDelete(em, index)" v-show="em.oneDayEdit" type="button" class="delete right-corner"></button>
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
            <p>{{ em.decryptedText | cutText }}</p>
          </div>
          <div class="actions">
            <button @click="openEdit(em)" v-show="em.oneDayEdit" class="clear-button edit"></button>
            <button class="clear-button share" :class="{'share-colored': em.shared}" v-on:click="shareState(em)"></button>
          </div>
        </div>
      </div>
    </div>
    <div :class="showLoader ? 'show' : 'hide'">
      <div class="loading-emotion">Loading Emotions</div>
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';
import router from '../router';
import store from '../store';
import mixin from '../mixins/mixin';
import Heart from './Heart';

export default {
  name: 'all-emotions',
  components: {
    Heart,
  },
  mixins: [mixin],
  computed: {
    rsaKey() {
      return store.state.RSAkey;
    },
    dataReady() {
      return store.state.emotionsReady;
    },
    userId() {
      return store.state.userId;
    },
    RSAkey() {
      return store.state.RSAkey;
    },
    avg() {
      let sum = this.values.reduce((previous, current) => current += previous);
      return Math.round(sum / this.values.length);
    },
    referenceToOldestKey() {
      return store.state.referenceToOldestKey;
    },
    AllEmotions() {
      return store.state.AllEmotions;
    }
  },
  data() {
    return {
      emotionsTest: [],
      filter: '',
      isActive: false,
      interval: null,
      showLoader: false,
      showHide: false,
      values: [],
    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  beforeMount() {},
  mounted() {
    this.interval = setInterval(() => {
      store.dispatch('UPDATE');
    }, 43200);
    store.commit('EMOTIONS_DATA_UNREADY');

    const leadsRef = firebase.database().ref(`emotions/${this.userId}`);
    leadsRef.on('value', (snapshot) => {
      store.commit('ADD_NUM_ALL_EMOTIONS', snapshot.numChildren());
      snapshot.forEach((childData) => {
        const data = childData.val();
        this.values.push(data.value);
      });

      if (this.AllEmotions > 0) {
        this.getEmotions();
        $(
          ($) => {
            $('#all-emotions').bind('scroll', () => {
              if ($('#all-emotions').scrollTop() + $('#all-emotions').innerHeight() >= $('#all-emotions')[0].scrollHeight) {
                if (this.emotionsTest.length < this.AllEmotions) {
                  this.showLoader = true;
                  setTimeout(() => {
                    this.getEmotions();
                  }, 500);
                } else {
                  this.showLoader = false;
                }
              }
            });
          });
      } else {
        this.showHide = true;
      }
    });
  },
  beforeUpdate() {},
  beforeDestroy() {
    store.commit('ADD_OLDEST_KEY', '');
    clearInterval(this.interval);
  },
  methods: {
    getEmotions() {
      this.showLoader = false;
      const leadsRef = firebase.database().ref(`emotions/${this.userId}`);
      if (!this.referenceToOldestKey) {
        // if initial fetch
        leadsRef
          .orderByKey()
          .limitToLast(5)
          .once('value')
          .then((snapshot) => {
            // changing to reverse chronological order (latest first)
            const arrayOfKeys = Object.keys(snapshot.val())
              .sort()
              .reverse();
            // transforming to array
            const results = arrayOfKeys
              .map((key) => {
                const element = snapshot.val()[key];
                element.id = key;
                element.decryptedText = this.decrypt(element.text);
                return element;
              });

            // storing reference
            store.commit('ADD_OLDEST_KEY', arrayOfKeys[arrayOfKeys.length - 1]);
            this.emotionsTest = results;
            store.commit('EMOTIONS_DATA_READY');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        leadsRef
          .orderByKey()
          .endAt(this.referenceToOldestKey)
          .limitToLast(6)
          .once('value')
          .then((snapshot) => {
            // changing to reverse chronological order (latest first)
            // & removing duplicate
            const arrayOfKeys = Object.keys(snapshot.val())
              .sort()
              .reverse()
              .slice(1);
            // transforming to array
            const results = arrayOfKeys
              .map((key) => {
                const element = snapshot.val()[key];
                element.id = key;
                element.decryptedText = this.decrypt(element.text);
                return element;
              });
            // updating reference
            store.commit('ADD_OLDEST_KEY', arrayOfKeys[arrayOfKeys.length - 1]);
            for (let i = 0; i < results.length; i++) {
              this.emotionsTest.push(results[i]);
            }
            store.commit('EMOTIONS_DATA_READY');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    shareState(emotion) {
      store.dispatch('EDIT_SHARED_VALUE', emotion);
      if (emotion.shared) {
        this.isActive = !this.isActive;
      }
    },
    confirmCustomDelete(emotion, index) {
      store.dispatch('ADD_EMOTION_FOR_REMOVE', emotion);
      store.dispatch('ADD_INDEX_FOR_REMOVE', index);
      router.push('/delete-emotion');
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

.happiness-level {
    font-size: 12px;
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

.info .short-text p {
    word-break: break-all;
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

.loading-emotion {
    display: inline-block;
    font-weight: bold;
}

.spinner {
    display: inline-block;
    margin-left: 10px;
}

.spinner > div {
    width: 8px;
    height: 8px;
    background-color: #9c6ed4;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}

.spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
    0%,
    100%,
    80% {
        -webkit-transform: scale(0);
    }
    40% {
        -webkit-transform: scale(1.0);
    }
}

@keyframes sk-bouncedelay {
    0%,
    100%,
    80% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
    }
}
</style>
