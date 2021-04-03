<template>
  <div id="login-page">
    <b-container class="justify-content-center mt-5">
      <h1>Login</h1>
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
                <b-form-input id="input-password" v-model="form.password" placeholder="Enter password" required v-on:keyup.enter="Login"></b-form-input>
              </div>
            </b-form-group>
          </b-form>
          <b-button variant="success" v-on:click="Login">Login</b-button>
<!--          <b-button v-on:click="getStatus">set isLoggedIn</b-button>-->
<!--          <p>{{status}}</p>-->
        </b-col>
        <b-col></b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>

import customAxios from "@/customAxios/customAxios";

customAxios.defaults.xsrfHeaderName = 'X-CSRFToken';
customAxios.defaults.xsrfCookieName = 'csrftoken';

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // status: '',
    }
  },
  methods: {
    // getStatus() {
    //   //this.status = this.$store.getters.getLoggedIn
    //   console.log(this.$store.getters.getLoggedIn)
    //   if (this.$store.getters.getLoggedIn) {
    //     this.$store.commit("setLoggedIn", false)
    //     console.log('getStatus changed to false')
    //   }else if (!this.$store.getters.getLoggedIn) {
    //     this.$store.commit("setLoggedIn", true)
    //     console.log('getStatus changed to true')
    //   }
    //   this.status = this.$store.getters.getLoggedIn
    // },
    async Login() {
      const user = {
        username: this.form.username,
        password: this.form.password
      }
      customAxios.post('http://localhost:3000/api/user/login', user).then(res => {
        if (res.status == 200) {
          //If res.status is 200, access granted...
          alert('Login Successful!')
          this.$store.dispatch("setLoggedIn", true)
          this.$router.push('dashboard')
        }
      }).catch(e => {
        console.log(e.response.status)
        if (e.response.status == 400) {
          alert('Login Unsuccessful: ' + e.response.data.message)
          this.$router.go(0)
          // if (e.status ) {
          //   //if error status is 401,
          //   //display error message (received in json)
          //   //this.$store.dispatch("setLoggedIn", false)
          //   //then redirect back to login (refresh page? or reroute)
          //   //this.$router.push('Login')
          // }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>