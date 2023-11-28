<script setup>
import axios from 'axios';
</script>

<template>
  <div>
    <h2>Создать роль</h2>
    <form @submit.prevent="createRole">
      <input type="text" name="createRole" placeholder="Role name" v-model="createRoleName" required />
      <button type="submit">Create</button>
    </form>
  </div>
  <div>
    <h2>Удалить роль</h2>
    <form @submit.prevent="deleteRole">
      <input type="text" name="deleteRole" placeholder="Role name" v-model="deleteRoleName" required />
      <button type="submit">Delete</button>
    </form>
  </div>

  <div>
    <h2>Изменить роли пользователя</h2>
    <form @submit.prevent="getRoles">
      <input type="text" name="getRoles" placeholder="User name" v-model="userName" required>
      <button type="submit">Submit</button>
    </form>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="allRoles === null">User not found.</div>
      <div v-else>
        <h2>Изменение ролей для пользователя {{ userName }}</h2>
        <form @submit.prevent="editRoles">
          <input type="hidden" name="userId" :value="userId" />
          <div v-for="role in allRoles" :key="role.name" class="form-group">
            <input
              type="checkbox"
              :name="role.name"
              :value="role.name"
              :checked="userRoles.includes(role.name)"
            />
            {{ role.name }} <br />
          </div>
          <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>
        <p>{{ resultMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      createRoleName: '',
      deleteRoleName: '',
      resultMessage: '',
      userName: '',
      isLoading: false,
      error: '',
      userName: '',
      userId: '',
      userRoles: [],
      allRoles: [],
      selectedRoles: [],
    };
  },
  methods: {
    async createRole() {
      try {
        const response = await axios.post('/roles/create', { roleName: this.createRoleName }, {
          headers: {
            'Authorization': `Bearer ${localStorage.access_token}`
          }
        });
        this.resultMessage = response.data;
        console.log(response.data);
      } catch (error) {
        this.resultMessage = error.response.data;
        console.error(error.response.data); // Обработка ошибок
      }
    },
    async deleteRole() {
      try {
        const response = await axios.post('/roles/delete', { roleName: this.deleteRoleName }, {
          headers: {
            'Authorization': `Bearer ${localStorage.access_token}`
          }
        });
        this.resultMessage = response.data;
        console.log(response.data);
      } catch (error) {
        this.resultMessage = error.response.data;
        console.error(error.response.data); // Обработка ошибок
      }
    },
    async getRoles() {
      this.isLoading = true;
      this.error = '';

      try {
        const response = await axios.post('/roles/userroles', { userName: this.userName }, {
          headers: {
            'Authorization': `Bearer ${localStorage.access_token}`
          }
        });
        this.userId = response.data.userId;
        this.userRoles = response.data.userRoles;
        this.allRoles = response.data.allRoles;
        this.selectedRoles = this.userRoles.slice();
      } catch (error) {
        console.error(error);
        this.error = 'An error occurred';
      } finally {
        this.isLoading = false;
      }
    },
    async editRoles() {
      try {
        const selectedRoles = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(
          (checkbox) => checkbox.value
        );
        const response = await axios.post(
          '/roles/edit',
          {
            userName: this.userName,
            roles: selectedRoles
          },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.access_token}`
            }
          }
        );

        this.resultMessage = response.data;
      } catch (error) {
        console.error(error.response.data);
        this.resultMessage = error.response.data;
      }
    }
  }
};
</script>