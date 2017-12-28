<template>
<div id="footer" class="row footer">
  <div class="footer-content">
    <div :class="[!addComment ? activeClass : hideClass]">
      <div class="columns is-mobile">
        <div class="column">
          <router-link class="button" :to="'/emotions'"><img src="../assets/heart-rate.png" />Track Emotions</router-link>
        </div>
        <a href="#" class="add-emotion" :class="[addEmotion ? activeClass : hideClass]"><i class="fa fa-plus"></i></a>
        <div class="column">
          <router-link class="button" :to="'/advisors'"><img src="../assets/emotion-adv-icon.png" /> Emotion Advisor</router-link>
        </div>
      </div>
    </div>

    <div class="form-controls" :class="[addComment ? activeClass : hideClass]">
      <div class="columns is-mobile">
        <div class="column">
          <router-link class="button" :to="'/emotion'">Go back</router-link>
        </div>
        <div class="column">
          <router-link class="button" :to="'/advisors'">Skip</router-link>
        </div>
      </div>
    </div>

  </div>


  <!-- </div> -->
</div>
</template>

<script>
// import config from '../components/Config';
import router from '../router';
import store from '../store';

export default {
  name: 'app-content',
  data() {
    return {
      addEmotion: false,
      addComment: false,
      activeClass: 'show',
      hideClass: 'hide',
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
#footer {
  padding: 0px;
  background-color: white;
}

#footer .columns {
  margin: 0;
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

.add-emotion .fa {
  font-size: 24px;
  background-color: #fc428c;
  color: white;
  margin-top: -7px;
}

.show {
  display: inline-block;
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
</style>
