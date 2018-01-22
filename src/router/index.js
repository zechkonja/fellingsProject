import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/NewEmotionContent';
import NewAccount from '@/components/NewAccount';
import EmotionText from '@/components/NewEmotionContentText';
import Emotions from '@/components/AllEmotions';
import EmotionsAdded from '@/components/Added';
import Advisors from '@/components/AllAdvisors';
import ChooseAdvisor from '@/components/Advisor';
import UpdateEmotion from '@/components/UpdateContentText';
import Offices from '@/components/AllOffices';
import Help from '@/components/HelpContent';
import DeleteEmotion from '@/components/DeleteContent';
import Profile from '@/components/Profile';

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
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
  ],
});
