<template>
  <div>
    <b-row>
      <b-col>
        <Form isLogin="true"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import customAxios from "@/customAxios/customAxios";
import Form from "@/components/Form";

customAxios.defaults.xsrfHeaderName = 'X-CSRFToken';
customAxios.defaults.xsrfCookieName = 'csrftoken';

export default {
  name: "Login",
  components: {Form},
  data() {
    return {
      // form: {
      //   username: '',
      //   password: ''
      // },
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
    // async Login() {
    //   const user = {
    //     username: this.form.username,
    //     password: this.form.password
    //   }
    //   customAxios.post('http://localhost:3000/api/user/login', user).then(res => {
    //     if (res.status == 200) {
    //       //If res.status is 200, access granted...
    //       alert('Login Successful!')
    //       this.$store.dispatch("setLoggedIn", true)
    //       this.$router.push('dashboard')
    //     }
    //   }).catch(e => {
    //     console.log(e.response.status)
    //     if (e.response.status == 400) {
    //       alert('Login Unsuccessful: ' + e.response.data.message)
    //       this.$router.go(0)
    //       // if (e.status ) {
    //       //   //if error status is 401,
    //       //   //display error message (received in json)
    //       //   //this.$store.dispatch("setLoggedIn", false)
    //       //   //then redirect back to login (refresh page? or reroute)
    //       //   //this.$router.push('Login')
    //       // }
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>


</style>