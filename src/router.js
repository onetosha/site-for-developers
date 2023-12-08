import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Users/Login.vue';
import Registration from '@/views/Users/Registration.vue';
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
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/list',
    name: 'UsersList',
    component: UsersList,
  },
  {
    path: '/manage',
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

export default router;