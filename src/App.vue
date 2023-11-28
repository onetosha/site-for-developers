<template>
    <div id="app">
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <router-link to="/" class="navbar-brand">Справочник разработчика</router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Главная</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Войти</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/registration" class="nav-link">Зарегистрироваться</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
  
      <main class="container mt-4">
        <router-view></router-view>
      </main>
  
      <footer class="mt-4 text-center">
        Все права защищены &copy; {{ currentYear }}
      </footer>
    </div> 
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        currentYear: new Date().getFullYear()
      };
    }
  };
</script>