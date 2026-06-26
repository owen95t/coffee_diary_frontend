<template>
  <div class="pagewrap">
    <b-nav>
      <b-nav-item class="back-nav" to="/"><i class="bi bi-arrow-left"></i> Home</b-nav-item>
    </b-nav>
    <div class="form-wrapper">
      <h1 class="mt-5 mb-0 form-header">Coffee Diary</h1>
      <div class="account-form">
        <!--      OVERLAY-->
        <b-overlay :show="show">
          <b-form @submit.prevent="submit">
            <h2 class="text-center">{{header}}</h2>
            <b-form-group class="mt-3">
              <b-form-input type="text" class="form-control" placeholder="Email Address" v-model.trim="username" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="password" class="form-control" placeholder="Password" v-model.trim="password" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button variant="primary" class="w-100" type="submit">{{ buttonText }}</b-button>
            </b-form-group>
          </b-form>
          <template #overlay>
            <div v-if="waiting === true">
              <div class="text-center">
                <b-spinner variant="info" style="height: 5rem; width: 5rem"></b-spinner>
                <p>Hold your horses!</p>
              </div>
            </div>
            <div v-else>
              <div class="text-center">
<!--                <b-spinner variant="info" style="height: 5rem; width: 5rem"></b-spinner>-->
                <p>Success!</p>
              </div>
            </div>
          </template>
        </b-overlay>
        <router-link v-show="isLogin" class="text-center" to="/register">Create an account</router-link>
        <router-link v-show="isRegister" class="text-center" to="/login">Log In</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import customAxios from "@/customAxios/customAxios";
import { useAppStore } from '@/stores/app'

export default {
  name: "AccountForm",
  props: {
    isLogin: Boolean,
    isRegister: Boolean
  },
  data(){
    return{
      header: '',
      buttonText: '',
      username: '',
      password: '',
      show: false,
      waiting: true,
    }
  },
  methods: {
    check() {
      if (this.isRegister) {
        this.header = 'REGISTER'
        this.buttonText = 'REGISTER'
      }else if (this.isLogin) {
        this.header = 'LOG IN'
        this.buttonText = 'LOG IN'
      }
    },
    submit() {
      this.waiting = true
      if(this.isRegister){
        this.sendRegister()
        this.show = true
      }else if (this.isLogin) {
        this.sendLogin()
        this.show = true
      }
    },
    async sendRegister(){
      const userInfo = {
        username: this.username.toLowerCase(),
        password: this.password
      }
      try{
        let response = await customAxios.post('user/register', userInfo)
        if(response.status === 201){
          alert('User Created Successfully! Please Login to Access Your Dashboard')
          await this.$router.push('/login')
        }
      }catch (e) {
        const message = e.response?.data?.message ?? e.message
        console.log('Registration Error: ' + message)
        alert('Registration Error. Please try again.' + '\n' + message)
        this.show = false
      }
    },
    async sendLogin(){
      const userInfo = {
        username: this.username,
        password: this.password
      }
      this.waiting = true;
      try {
        let response = await customAxios.post('user/login', userInfo)
        if(response.status === 200){
          this.waiting = false
          console.log('CSRFToken: ' + response.headers['csrftoken'])
          localStorage.setItem('csrftoken', response.headers['csrftoken'])
          const appStore = useAppStore()
          appStore.setLoggedIn(true)
          window.setTimeout(() => this.$router.push('/dashboard'), 3000)
        }
      }catch (e) {
        console.log('Log in error: ' + e)
        alert('Log in error: ' + (e.response?.data?.message ?? e.message))
        this.show = false
      }
    },
  },
  mounted() {
    this.check()
  }
}
</script>

<style scoped>
@media screen and (min-width: 300px) and (max-width: 500px){
  .form-header {
    font-size: 10vw;
  }
}
@media screen and (min-width: 501px){
  .form-header{
    font-size: 5rem
  }
}
.form-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 60vh;
}


.account-form {
  width: 340px;
  margin: auto;
  font-size: 1rem;
}
.account-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control, .btn {
  min-height: .5rem;
  border-radius: 10px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}

.back-nav{
  font-size: 1rem;
  color: black;
  text-decoration: none;
}

</style>