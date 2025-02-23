import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { auth } from '../services/firebase';
import Home from '../pages/Home.vue';
import Game from '../pages/Game.vue';
import Login from '../pages/Login.vue';
import UserDashboard from '../pages/UserDashboard.vue';
import SignUp from '../pages/SignUp.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { 
    path: '/game/:level', 
    component: Game,
    meta: { requiresAuth: true }
  },
  {
    path: '/user-dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

let authInitialized = false;
const authInitialization = new Promise<void>((resolve) => {
  auth.onAuthStateChanged(() => {
    if (!authInitialized) {
      authInitialized = true;
      resolve();
    }
  });
});

router.beforeEach(async (to, from, next) => {
  if (!authInitialized) {
    await authInitialization;
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (to.path === '/login' && currentUser) {
    next('/game');
  } else if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
