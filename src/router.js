import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Users/Login.vue';
import UsersManagement from '@/views/Users/UsersManagement.vue';
import NotFound from '@/views/NotFound.vue';
import UsersList from '@/views/Admin/UsersList.vue';
import RolesManagement from '@/views/Admin/RolesManagement.vue';
import Logs from '@/views/Admin/Logs.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/users',
    name: 'UsersManagement',
    component: UsersManagement
  },
  {
    path: '/list',
    name: 'UsersList',
    component: UsersList,
  },
  {
    path: '/roles',
    name: 'RolesManagement',
    component: RolesManagement,
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach(async (to) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const auth = useAuthStore();

//   if (authRequired && !auth.user) {
//       auth.returnUrl = to.fullPath;
//       return '/login';
//   }
// });


export default router;