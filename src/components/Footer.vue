<template>
<div id="footer" class="row footer">
  <div class="footer-content">
    <div :class="[!addComment ? activeClass : hideClass]">
      <div class="columns is-mobile">
        <div class="column">
          <router-link class="button" :class="[trackPage ? 'track-emotions' : '']" :to="'/emotions'"><span :class="[trackPage ? 'heart-rate-colored' : 'heart-rate']"></span>Track Emotions</router-link>
        </div>
        <router-link to="/" class="add-emotion" :class="[addEmotion ? activeClass : hideClass]">
          <i class="fa fa-plus"></i>
        </router-link>
        <div to="/" class="add-emotion" :class="[!addEmotion ? activeClass : hideClass]">

        </div>
        <div class="column">
          <router-link class="button" :to="'/advisors'"><img src="../assets/emotion-adv-icon.png" /> Emotion Advisor</router-link>
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
// import config from '../components/Config';
import router from '../router';
import store from '../store';

export default {
  name: 'app-content',
  computed: {
    emotion() {
      return store.state.emotion;
    },
  },
  data() {
    return {
      addEmotion: false,
      addComment: false,
      activeClass: 'show',
      hideClass: 'hide',
      trackPage: false,
    };
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  mounted() {
    this.checkEmotion();
  },
  methods: {
    checkEmotion() {
      if (this.$route.path === '/emotion-text') {
        this.addComment = true;
        this.addEmotion = false;
        this.trackPage = false;
      } else if (this.$route.path === '/') {
        this.addComment = false;
        this.addEmotion = false;
        this.trackPage = false;
      } else if (this.$route.path === '/emotions') {
        this.addComment = false;
        this.addEmotion = true;
        this.trackPage = true;
      } else {
        this.addComment = false;
        this.addEmotion = true;
        this.trackPage = false;
      }
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
  width: 47px;
}

.add-emotion .fa {
  font-size: 24px;
  background-color: #fc428c;
  color: white;
  margin-top: -7px;
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

</style>
