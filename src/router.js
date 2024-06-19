import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Users/Login.vue';
import UsersManagement from '@/views/Users/UsersManagement.vue';
import NotFound from '@/views/NotFound.vue';
import UsersList from '@/views/Admin/UsersList.vue';
import RolesManagement from '@/views/Admin/RolesManagement.vue';
import Logs from '@/views/Admin/Logs.vue';
import store from './stores/store';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/users',
    name: 'UsersManagement',
    component: UsersManagement,
    meta: { requiresAuth: true, role: "Admin" }
  },
  {
    path: '/list',
    name: 'UsersList',
    component: UsersList,
    meta: { requiresAuth: true }
  },
  {
    path: '/roles',
    name: 'RolesManagement',
    component: RolesManagement,
    meta: { requiresAuth: true, role: "Admin" }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
    meta: { requiresAuth: true, role: "Admin" }
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

router.beforeEach((to, from, next) => {
  const { requiresAuth, role } = to.meta;
  const isAuthenticated = store.getters.isAuthenticated;
  const hasRole = store.getters.hasRole;

  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' });
  }
  if (requiresAuth && role && !hasRole(role)) {
    return next({ name: 'Home' });
  }

  next();
});
export default router;