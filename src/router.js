import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Users/Login.vue';
import UsersManagement from '@/views/Users/UsersManagement.vue';
import NotFound from '@/views/NotFound.vue';
import UsersList from '@/views/Admin/UsersList.vue';
import RolesManagement from '@/views/Admin/RolesManagement.vue';
import Logs from '@/views/Admin/Logs.vue';

function isAuthenticated() {
  const accessToken = localStorage.access_token;
  return !!accessToken; // Возвращает true, если пользователь авторизован, иначе false
}

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
    meta: { public: true } 
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

router.beforeEach((to, from, next) => {
  if (to.meta.public || isAuthenticated()) {
    // Если страница является публичной или пользователь аутентифицирован, продолжить нормальную навигацию
    next();
  } else {
    // Если страница требует аутентификации и пользователь не аутентифицирован, перенаправить на страницу входа
    next('/login');
  }
});
export default router;