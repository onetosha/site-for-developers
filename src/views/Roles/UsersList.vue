<script setup>
import axios from 'axios';
</script>

<template>
    <div>
      <h2>Список пользователей</h2>
      <ul>
        <li v-for="user in users" :key="user.email">{{ user.userName }}</li>
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
          const response = await axios.get('/roles/list', {
              headers: {
                'Authorization': `Bearer ${localStorage.access_token}`
              }
            });
          this.users = response.data;
        }
        catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>