<template>
<div id="advisor" class="row content">
  <div class="columns is-mobile background-gradient">
    <div class="column">
      <h5>My Emotion Advisor</h5>
      <div class="image">
        <img :src="advisor.imageUrl ? advisor.imageUrl : require('../assets/advisor_img.png')" />
      </div>
      <div class="advisor-name">
        <h5>{{advisor.fullName}}</h5>
      </div>
      <div v-show="!addedConnection.patient">
        <button @click="add" class="button add-advisor">Add</button>
      </div>
      <div v-show="addedConnection.patient">
        <button @click="remove" class="button add-advisor">Remove</button>
      </div>
    </div>
  </div>
  <div style="width: 85%;margin: 0 auto;">
    <div class="columns is-mobile advisor-info">
      <div class="column is-4">
        <div>
          <span class="colored-info">{{advisor.experience}} Years</span>
          <span>Experience</span>
        </div>
      </div>
      <div class="column is-4">
        <div>
          <span class="colored-info">{{advisor.fallowers}}</span>
          <span>Followers</span>
        </div>
      </div>
      <div class="column is-4">
        <div>
          <span class="colored-info">
            <star-rating
              :rating="advisor.rating"
              :increment="0.5"
              :max-rating="5"
              :show-rating="false"
              :read-only="true"
              :star-size="15"
              inactive-color="#e1bad9"
              active-color="#9c6ed4">
            </star-rating>
          </span>
          <span>Rating</span>
        </div>
      </div>
    </div>
  </div>
  <div class="columns is-mobile about">
    <div class="column">
      <h5>About {{advisor.fullName}}</h5>
      <p>{{advisor.about}}</p>
    </div>
  </div>
</div>
</template>

<script>
import StarRating from 'vue-star-rating';
import router from '../router';
import store from '../store';

export default {
  name: 'advisor',
  components: {
    StarRating,
  },
  computed: {
    advisor() {
      return store.state.choosenAdvisor;
    },
    addedConnection: {
      set() {
      },
      get() {
        return store.state.addedConnection;
      },
    },
    error() {
      return store.state.error;
    },
  },
  beforeCreate() {
    if (!store.state.isLogged) {
      router.push('/login');
    }
  },
  mounted() {
    store.dispatch('CHECK_ADDED_CONNECTION');
  },
  beforeDestroy() {
    store.dispatch('RESET_CHECK_CONNECTION');
  },
  methods: {
    add() {
      this.$dialog.confirm({
        title: 'Advisor added',
        message: 'You added your emotion advisor, you will be notified when your application is approved!',
        onConfirm: () => {
          this.isAdded = true;
          store.dispatch('CREATE_CONNECTION', this.advisor);
          router.push('/emotions');
        },
      });
    },
    remove() {
      this.$dialog.confirm({
        title: 'Deleting connection',
        message: 'Are you sure you want to <b>delete</b> connection with advisor? This action cannot be undone.',
        confirmText: 'Delete connection',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.isAdded = false;
          store.dispatch('DELETE_CONNECTION', this.addedConnection);
          router.push('/emotions');
        },
      });
    },
  },
};
</script>

<style scoped>
#advisor {
  background-color: #f8f4f8;
  padding: auto;
  margin-bottom: 0px;
  flex: 1;
  overflow: auto;
}

.columns {
  margin: 0;
}

.column h5 {
  margin-top: 30px;
  font-size: 20px;
}

.advisor-name h5 {
  margin-top: 15px;
  font-weight: bold;
}

.image img {
  margin: 0 auto;
  width: 70px;
  height: 70px;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
}

.add-advisor {
  font-size: 13px;
  font-weight: bold;
  color: #8f84a0;
  background-color: transparent;
  border: 1px solid rgba(232, 232, 232, 0.75);
  border-radius: 50px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 30px;
}

.background-gradient {
  background: linear-gradient(0deg, #cd57ae, #996dd5 80%) no-repeat;
}

.columns:not(:last-of-type) * {
  color: white;
}

.advisor-info {
  margin-top: -25px;
}

.advisor-info * {
  background-color: white;
  color: black;
  font-size: 14px;
}

.about {
  text-align: left;
}

.colored-info {
  display: block;
  color: #9c6ed4;
  font-weight: bold;
}

.colored-info .vue-star-rating {
  display: inline-block;
}
</style>
