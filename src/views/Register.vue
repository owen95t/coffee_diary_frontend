<template>
  <div id="register-page">
    <h1>Register</h1>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-form>
            <b-form-group label="Email Address:">
              <div>
                <b-form-input id="input-email" v-model="form.username" placeholder="Enter email" required></b-form-input>
              </div>
            </b-form-group>
            <b-form-group label="Password:">
              <div>
                <b-form-input id="input-password" v-model="form.password" placeholder="Enter password" required></b-form-input>
              </div>
            </b-form-group>
          </b-form>
          <b-button variant="success">Login</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>