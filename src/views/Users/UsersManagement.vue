<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <p>{{ resultMessage }}</p>
          <v-card-title>
            <h2>Регистрация</h2>
          </v-card-title>
          <v-card-text>
            <Form
              @submit="onSubmit"
              v-slot="{ isSubmitting, setErrors }"
            >
              <v-text-field
                v-model="values.userName"
                label="Имя пользователя"
                required
              ></v-text-field>
              <v-text-field
                v-model="values.email"
                label="Email"
                required
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="values.password"
                label="Пароль"
                required
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="primary" :disabled="isSubmitting">
                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                Зарегистрировать
              </v-btn>
              <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
            </Form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <h2>Изменить роли пользователя</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="getRoles">
              <v-text-field
                v-model="userNameEdit"
                label="User name"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Принять</v-btn>
            </v-form>
            <div v-if="isLoading">Loading...</div>
            <div v-else-if="error">{{ error }}</div>
            <div v-else>
              <div v-if="allRoles === null">User not found.</div>
              <div v-else>
                <h3>Роли {{ this.userNameEdit }}:</h3>
                <v-form @submit.prevent="editRoles">
                  <input type="hidden" name="userId" :value="userId" />
                  <v-row v-for="role in allRoles" :key="role.name">
                    <v-col cols="12">
                      <v-checkbox
                        :label="role.name"
                        v-model="selectedRoles"
                        :value="role.name"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-btn type="submit" color="primary" :disabled="selectedRoles.length === 0">Сохранить</v-btn>
                </v-form>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { Form } from 'vee-validate';

export default {
  components: {
    Form,
  },
  data() {
    return {
      values: {
        userName: '',
        email: '',
        password: '',
      },
      userNameEdit: '',
      resultMessage: '',
      userId: '',
      userRoles: [],
      allRoles: [],
      selectedRoles: [],
      errors: {},
      isLoading: false,
      error: '',
    };
  },
  methods: {
    async onSubmit({ setErrors }) {
      const { userName, email, password } = this.values;
      try {
        const response = await axios.post('/users/register', {
          userName,
          email,
          password,
        });
        this.resultMessage = response.data.message;
        this.values = {
          userName: '',
          email: '',
          password: '',
        };
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({
            apiError: error.response.data.message,
          });
        } else {
          console.error(error);
        }
      }
    },
    async getRoles() {
      this.isLoading = true;
      this.error = '';

      try {
        const response = await axios.post('/roles/userroles', { userName: this.userNameEdit }, {
          headers: {
            'Authorization': `Bearer ${localStorage.access_token}`,
          },
        });
        this.userId = response.data.userId;
        this.userRoles = response.data.userRoles;
        this.allRoles = response.data.allRoles;
        this.selectedRoles = this.userRoles.slice();
      }
      catch (error) {
        this.error = 'Error retrieving user roles.';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async editRoles() {
      try {
        await axios.post('/roles/edit', {
            userName: this.userNameEdit,
            roles: this.selectedRoles,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.access_token}`,
          },
        });
        this.resultMessage = 'Roles updated successfully.';
      } catch (error) {
        this.error = 'Error updating roles.';
        console.error(error);
      }
    },
  },
};
</script>