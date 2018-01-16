import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';
import NewAccount from '@/components/NewAccount';
import EmotionText from '@/components/EmotionText';
import Emotions from '@/components/Emotions';
import EmotionsAdded from '@/components/EmotionsAdded';
import Advisors from '@/components/Advisors';
import ChooseAdvisor from '@/components/ChooseAdvisor';
import UpdateEmotion from '@/components/UpdateEmotion';
import Offices from '@/components/Offices';
import Help from '@/components/Help';
import DeleteEmotion from '@/components/DeleteEmotion';

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
    {
      path: '/offices',
      name: 'Offices',
      component: Offices,
    },
    {
      path: '/advisors',
      name: 'Advisors',
      component: Advisors,
    },
    {
      path: '/choose-advisor',
      name: 'ChooseAdvisor',
      component: ChooseAdvisor,
    },
    {
      path: '/update-emotion',
      name: 'UpdateEmotion',
      component: UpdateEmotion,
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
    },
    {
      path: '/delete-emotion',
      name: 'DeleteEmotion',
      component: DeleteEmotion,
    },
  ],
});
