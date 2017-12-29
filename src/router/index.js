import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';
import NewAccount from '@/components/NewAccount';
import EmotionText from '@/components/EmotionText';
import Emotions from '@/components/Emotions';
import EmotionsAdded from '@/components/EmotionsAdded';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/new-account',
      name: 'NewAccount',
      component: NewAccount,
    },
    {
      path: '/emotion-text',
      name: 'EmotionText',
      component: EmotionText,
    },
    {
      path: '/emotions',
      name: 'Emotions',
      component: Emotions,
    },
    {
      path: '/added',
      name: 'EmotionAdded',
      component: EmotionsAdded,
    },
  ],
});
