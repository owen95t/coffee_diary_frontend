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
          <b-button variant="success" v-on:click="register">Register</b-button>
          <b-button v-on:click="testCustomAxios">Cancel</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

// import service from '../customAxios/customAxios'
import customAxios from '../customAxios/customAxios'
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
    register() {
      const user = {
        username: this.form.username,
        password: this.form.password
      }
      customAxios.post('user/register', user).then(res => {
        if (res) {
          console.log(res.data.message + '')
          alert('Logged In successful!')
          this.$store.dispatch("setLoggedIn", true)
          this.$router.push('dashboard')
          console.log('Logged In status: ' + this.$store.getters.getLoggedIn);
        }
      }).catch(e => {
        if (e) {
          console.log(e.response.data.message);
          alert('Login Unsuccessful. + ' + e.response.data.message)
          this.$router.go(0);
        }
      })
      // axios.post('http://localhost:3000/api/user/register', user).then(res => {
      //   if (res) { //response is ok
      //     console.log(res.data.message + '')
      //     console.log(res)
      //     //alert user created success.
      //     this.$store.dispatch("setLoggedIn", true)
      //     //alert user created
      //     //Redirect to dashboard
      //     // alert(res.data.message)
      //     this.$router.push('dashboard')
      //   }
      // }).catch(e => {
      //   if (e) {
      //     console.log(e.response.data.message);
      //     //alert(e.response.data.message);
      //     this.$router.go(0);
      //   }
      // })
    },
    testCustomAxios() {
      const user = {
        username: this.form.username,
        password: this.form.password
      }
      customAxios.post('user/register', user).then(response => {
        if (response) {
          console.log('test' + response)
        }
      }).catch(e => {
        console.log('ERROR'+e);
      })
    }
  }
}
</script>

<style scoped>

</style>