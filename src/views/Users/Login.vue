<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <h2>Вход</h2>
          </v-card-title>
          <v-card-text>
            <Form @submit="onSubmit" v-slot="{ isSubmitting }">
              <v-text-field
                v-model="values.userName"
                label="Имя пользователя"
                required
              ></v-text-field>
              <v-text-field
                v-model="values.password"
                label="Пароль"
                required
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="primary" :disabled="isSubmitting">
                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                Вход
              </v-btn>
            </Form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Form } from 'vee-validate';
import axios from 'axios';
export default {
  components: {
    Form,
  },
  data() {
    return {
      values: {
        userName: '',
        password: '',
      },
    };
  },
  methods: {
    async onSubmit( { setErrors } ) {
      const { userName, password } = this.values;
      try {
        const response = await axios.post('/users/login', { userName, password });
        console.log(response);
        this.$store.dispatch('updateUserName', userName);
        this.$router.push('/list');
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ apiError: error.response.data.message });
        } else {
          console.error(error);
        }
      }
    }
  }
}
</script>