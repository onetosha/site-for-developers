<script setup>
import axios from 'axios';
</script>

<template>
    <div>
      <h2>Список пользователей</h2>
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.username }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: []
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('/users/list');
          this.users = response.data.data;
        }
        catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>