import Game from './pages/Game';
import Homepage from './pages/Homepage';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import About from './pages/About';
import AdminQuestions from './pages/admin/Questions';
import EditQuestion from './pages/admin/EditQuestion';

const PREFIX_ADMIN = '/admin';

export const USER_ROUTES = {
  game: {
    path: '/game',
    component: Game,
    isExact: true,
  },
  profile: {
    path: '/profile',
    component: Profile,
    isExact: true,
  },
  about: {
    path: '/about',
    component: About,
    isExact: true,
  },
  ranking: {
    path: '/ranking',
    component: Ranking,
    isExact: true,
  },
  homepage: {
    path: '/',
    component: Homepage,
    isExact: true,
  },
};

export const ADMIN_ROUTES = {
  adminQuestions: {
    path: PREFIX_ADMIN + '/questions',
    component: AdminQuestions,
    isExact: true,
  },
  editQuestion: {
    path: PREFIX_ADMIN + '/questions/edit',
    component: EditQuestion,
    isExact: true,
  },
};
