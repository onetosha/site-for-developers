<template>
    <v-app>
        <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Справочник разработчика</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-if="this.hasRole('Admin')" v-bind="props">Админ</v-btn>
            </template>
              <v-list>
                <v-list-item to="/admin/roles" link>Роли</v-list-item>
                <v-list-item to="/admin/logs" link>Логи</v-list-item>
                <v-list-item to="/admin/users" link>Пользователи</v-list-item>
              </v-list>
          </v-menu>
          <v-menu v-if="userName">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">{{ userName }}</v-btn>
            </template>
            <v-list>
              <v-list-item @click="logout" link>Выйти</v-list-item>
            </v-list>
          </v-menu>
          <v-btn v-else to="/login" text>Вход</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawerOpen" app>
      <v-list>
        <v-list-item to="/home" link >
          <template v-slot:prepend>
            <v-icon>mdi-home</v-icon>
            <v-list-item-title>Главная</v-list-item-title>
          </template>
        </v-list-item>
       </v-list>
    </v-navigation-drawer>
    <v-main class="container mt-4"> 
      <router-view></router-view>
    </v-main>
    </v-app>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        drawerOpen: false, // Изначально меню закрыто
      };
    },
    computed: {
      userName() {
        return this.$store.state.userName;
      },
      ...mapGetters([
        'hasRole'
      ])
    },
    methods: {
      toggleDrawer() {
        this.drawerOpen = !this.drawerOpen; // Инвертируем текущее состояние меню
      },
      logout() {
        this.$store.dispatch('updateUserData', null);
        this.$router.push('/login');
      }
    },
  };

  </script>