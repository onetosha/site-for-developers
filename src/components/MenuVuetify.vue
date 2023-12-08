
<template>
    <v-app>
        <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Справочник разработчика</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn to="/home" text>Главная</v-btn>
            <v-btn to="/login" text>Войти</v-btn>
            <v-btn to="/registration" text>Зарегистрироваться</v-btn>
            <v-btn to="/manage" text>Роли</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawerOpen" app>
      <!-- Содержимое бокового меню -->
    </v-navigation-drawer>
    <v-main class="container mt-4"> 
      <router-view></router-view>
    </v-main>

    </v-app>
  </template>
  
<script>

  export default {
    data() {
      return {
        drawerOpen: false, // Изначально меню закрыто
      };
    },
    methods: {
      toggleDrawer() {
        this.drawerOpen = !this.drawerOpen; // Инвертируем текущее состояние меню
      },
    },
  };
  </script>