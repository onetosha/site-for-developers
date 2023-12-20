<script setup>
    async function onSubmit(values, {
        setErrors
    }) {
        const { userName, email, password } = values;
        try {
            const response = await axios.post('/users/register', {
                userName,
                email,
                password
            });
            router.push('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors({
                    apiError: error.response.data.message
                });
            } else {
                console.error(error);
            }
        }
    }
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <h2>Регистрация</h2>
          </v-card-title>
          <v-card-text>
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              v-slot="{ errors, isSubmitting }"
            >
              <v-text-field
                v-model="values.userName"
                label="Имя пользователя"
                :error-messages="errors.userName"
                required
              ></v-text-field>
              <v-text-field
                v-model="values.email"
                label="Email"
                :error-messages="errors.email"
                required
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="values.password"
                label="Пароль"
                :error-messages="errors.password"
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
                v-model="userName"
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
                <h2>Изменение ролей для пользователя {{ userName }}</h2>
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
                  <v-btn type="submit" color="primary">Сохранить</v-btn>
                </v-form>
                <p>{{ resultMessage }}</p>
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
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRouter } from 'vue-router';

const schema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const router = useRouter();

export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      values: {
        userName: '',
        email: '',
        password: '',
      },
      resultMessage: '',
      userName: '',
      isLoading: false,
      error: '',
      userId: '',
      userRoles: [],
      allRoles: [],
      selectedRoles: [],
    };
  },
  methods: {
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
        const response = await axios.post(
          '/roles/edit',
          {
            userName: this.userName,
            roles: this.selectedRoles,
          },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.access_token}`,
            },
          }
        );

        this.resultMessage = response.data;
      } catch (error) {
        console.error(error.response.data);
        this.resultMessage = error.response.data;
      }
    },
  },
};
</script>