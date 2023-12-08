<template>
  <div id="app">
    <Menu></Menu>

    <footer class="mt-4 text-center">
      Все права защищены &copy; {{ currentYear }}
    </footer>
  </div>
</template>

<script>
import Menu from './components/MenuVuetify.vue';

export default {
  name: 'App',
  components: {
    Menu,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>