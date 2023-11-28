<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'vue-router';

const schema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

const router = useRouter();

async function onSubmit(values, { setErrors }) {
  const { userName, password } = values;
  try {
    const response = await axios.post('/users/login', { userName, password });
    localStorage.access_token = response.data;
    router.push('/list');
  } catch (error) {
    if (error.response && error.response.data) {
      setErrors({ apiError: error.response.data.message });
    } else {
      console.error(error);
    }
  }
}
</script>

<template>
  <div>
    <h2>Войти</h2>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <div class="form-group">
        <label>Имя пользователя</label>
        <Field name="userName" type="text" class="form-control" :class="{ 'is-invalid': errors.userName }" />
        <div class="invalid-feedback">{{ errors.userName }}</div>
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Вход
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
    </Form>

    <div class="form-group">
      <router-link to="/register" class="btn btn-link">Еще не зарегистрированы?</router-link>
    </div>
  </div>
</template>
