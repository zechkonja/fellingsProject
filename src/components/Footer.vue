<template>
<div id="footer" class="row footer">
  <div class="footer-content">
    <div :class="[!addComment ? activeClass : hideClass]">
      <div class="columns is-mobile">
        <div class="column">
          <router-link class="button menu-link" :class="[trackPage ? 'track-emotions' : '']" :to="'/emotions'"><span :class="[trackPage ? 'heart-rate-colored' : 'heart-rate']"></span>Track Emotions</router-link>
        </div>
        <button @click="addNew" class="clear-button add-emotion" :class="[addEmotion ? activeClass : hideClass]">
          <i class="fa fa-plus"></i>
        </button>
        <div to="/" class="add-emotion" :class="[!addEmotion ? activeClass : hideClass]">
        </div>
        <div class="column">
          <div>
            <router-link class="button menu-link" :class="[trackPageOffice ? 'track-emotions' : '']" :to="'/offices'"><span :class="[trackPageOffice ? 'emotion-adv-icon-colored' : 'emotion-adv-icon']"></span>Choose Office</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="form-controls" :class="[addComment ? activeClass : hideClass]">
      <div class="columns is-mobile">
        <div class="column">
          <router-link class="button" :to="'/'">Go back</router-link>
        </div>
        <div class="column">
          <router-link class="button" :to="'/emotions'">Skip</router-link>
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
  name: 'app-content',
  computed: {
    emotion() {
      return store.state.emotion;
    },
    approved() {
      return store.state.approved;
    },
    connected() {
      return store.state.connected;
    },
  },
  data() {
    return {
      addEmotion: false,
      addComment: false,
      activeClass: 'show',
      hideClass: 'hide',
      trackPage: false,
      trackPageOffice: false,
    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  beforeUpdate() {
    this.checkEmotion();
  },
  mounted() {
    this.checkEmotion();
  },
  methods: {
    checkEmotion() {
      if (this.$route.path === '/') {
        this.trackPage = false;
        this.trackPageOffice = false;
        this.addComment = false;
        this.addEmotion = false;
      } else if (this.$route.path === '/emotion-text') {
        this.trackPage = false;
        this.trackPageOffice = false;
        this.addComment = true;
        this.addEmotion = false;
      } else if (this.$route.path === '/emotions') {
        this.addEmotion = true;
        this.trackPage = true;
        this.addComment = false;
        this.trackPageOffice = false;
      } else if (this.$route.path === '/offices') {
        this.addEmotion = true;
        this.trackPageOffice = true;
        this.addComment = false;
        this.trackPage = false;
      } else {
        this.addEmotion = true;
        this.addComment = false;
        this.trackPage = false;
        this.trackPageOffice = false;
      }
    },
    addNew() {
      store.dispatch('RESET_EMOTION');
      router.push('/');
    },
  },
};
</script>

<style scoped>
#footer {
  z-index: 1;
  padding: 0px;
  background-color: white;
  font-weight: bold;
}

#footer .columns {
  margin: 0;
}

#footer .columns .column {
  padding: 10px 0px 10px 0px;
}

#footer .columns .column a {
  font-size: 14px;
}

.form-controls {
  display: none;
}

.button {
  border: none;
}

.add-emotion {
  width: 50px;
  height: 50px;
  margin-top: -7px;
  position: relative;
  margin-bottom: 5px;
}

.add-emotion .fa {
  font-size: inherit;
  background-color: #fc428c;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.add-emotion .fa::before {
  font-size: 24px;
  font-weight: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.show {
  display: block;
}

.hide {
  display: none;
}

.fa-plus::before {
  font-size: 24px;
  font-weight: 100;
}

.footer-content {
  -webkit-box-shadow: 0px -2px 2px rgba(182, 182, 182, 0.25);
  -moz-box-shadow: 0px -2px 2px rgba(182, 182, 182, 0.25);
  box-shadow: 0px -2px 2px rgba(182, 182, 182, 0.25);
}

i.fa {
  display: inline-block;
  border-radius: 60px;
  box-shadow: 0px 0px 2px #888;
  padding: 0.5em 0.6em;
}

.track-emotions {
  color: #fc428c;
  font-weight: bold;
}

.heart-rate {
  background-image: url('../assets/heart-rate.png');
  width: 16px;
  height: 14px;
}

.heart-rate-colored {
  background-image: url('../assets/heart-rate-colored.png');
  width: 16px;
  height: 14px;
}

.emotion-adv-icon {
  background-image: url('../assets/emotion-adv-icon.png');
  width: 16px;
  height: 12px;
}

.emotion-adv-icon-colored {
  background-image: url('../assets/emotion-adv-icon-colored.png');
  width: 16px;
  height: 12px;
}

.clear-button {
  background-color: transparent !important;
  background-repeat: no-repeat;
  color: inherit;
  border: none;
  padding: 0! important;
  font: inherit;
  cursor: pointer;
  outline: inherit !important;
}

.menu-link img,
.menu-link span {
  margin-right: 5px;
}
</style>
