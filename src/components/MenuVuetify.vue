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
            <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">Админ</v-btn>
            </template>
              <v-list>
                <v-list-item to="/manage" link>Роли</v-list-item>
                <v-list-item to="/logs" link>Логи</v-list-item>
              </v-list>
          </v-menu>
        </v-toolbar-items>
    </v-app-bar>
    <v-main class="container mt-4"> 
      <router-view></router-view>
    </v-main>
    </v-app>
  </template>
  
<script>

  export default {
    data() {
      return {

      };
    }
  };
  </script>