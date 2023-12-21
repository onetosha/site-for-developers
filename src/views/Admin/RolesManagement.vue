<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <h2>Создать роль</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createRole">
              <v-text-field
                v-model="createRoleName"
                label="Role name"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Создать</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <h2>Удалить роль</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="deleteRole">
              <v-text-field
                v-model="deleteRoleName"
                label="Role name"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Удалить</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="6">
        <p>{{ resultMessage }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      createRoleName: '',
      deleteRoleName: '',
      resultMessage: '',
    };
  },
  methods: {
    async createRole() {
      try {
        const response = await axios.post(
          '/roles/create',
          { roleName: this.createRoleName },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.access_token}`,
            },
          }
        );
        this.resultMessage = response.data;
        console.log(response.data);
      } catch (error) {
        this.resultMessage = error.response.data;
        console.error(error.response.data);
        // Обработка ошибок
      }
    },
    async deleteRole() {
      try {
        const response = await axios.post(
          '/roles/delete',
          { roleName: this.deleteRoleName },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.access_token}`,
            },
          }
        );
        this.resultMessage = response.data;
        console.log(response.data);
      } catch (error) {
        this.resultMessage = error.response.data;
        console.error(error.response.data);
        // Обработка ошибок
      }
    },
  },
};
</script>