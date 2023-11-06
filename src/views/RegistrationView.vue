<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm password is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required')
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, firstName, lastName, password, confirmPassword } = values;

    return authStore
        .register(username, password, confirmPassword, firstName, lastName)
        .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
    <div>
        <h2>Registration</h2>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-group">
            <label>Username</label>
            <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
            <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-group">
            <label>First Name</label>
            <Field name="firstName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
            <div class="invalid-feedback">{{ errors.firstName }}</div>
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
            <div class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
        <div class="form-group">
            <label>Password</label>
            <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
            <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="form-group">
            <label>Confirm Password</label>
            <Field name="confirmPassword" type="password" class="form-control" :class="{ 'is-invalid': errors.confirmPassword }" />
            <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Register
            </button>
        </div>
        <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
        </Form>
  </div>
</template>