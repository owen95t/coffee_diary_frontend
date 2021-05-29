<template>

    <div class="container">
      <div class="heading">
        <h1>{{ header }}</h1>
      </div>
      <div class="form-input mx-auto">
        <b-form>
          <b-form-input id="input-email" class="input" placeholder="ENTER EMAIL" v-model="username" required></b-form-input>
        </b-form>
        <b-form>
          <b-form-input type="password" id="input-password" class="input" placeholder="ENTER PASSWORD" v-model="password" v-on:keyup.enter="submit" required></b-form-input>
        </b-form>
        <a v-on:click="$router.push('/')" class="">Forgot Password</a>
        <div class="buttons">
          <b-button class="custom-button" v-on:click="submit">{{button_text}}</b-button>
          <b-button class="custom-button" v-on:click="$router.push('/')">CANCEL</b-button>
        </div>
      </div>
    </div>
</template>

<script>
import customAxios from "@/customAxios/customAxios";


export default {
  name: "Form",
  props: {
    isRegister: Boolean,
    isLogin: Boolean,
  },
  data() {
    return {
      header: '',
      button_text: '',
      username: '',
      password: ''
    }
  },
  methods: {
    check() {
      if (this.isRegister) {
        this.header = 'REGISTER'
        this.button_text = 'REGISTER'
      }else if (this.isLogin) {
        this.header = 'LOG IN'
        this.button_text = 'LOG IN'
      }
    },
    submit() {
      if (this.isRegister) {
        this.sendRegister()
      }else if (this.isLogin) {
        this.sendLogin()
      }
    },
    async sendLogin() {
      const userInfo = {
        username: this.username,
        password: this.password
      }
      try {
        let response = await customAxios.post('http://localhost:3000/api/user/login', userInfo)
        if(response.status == 200){
          alert('Log in success! Taking you to your dashboard...')
          console.log(response.headers['csrftoken'])
          await this.$store.dispatch("setLoggedIn", true);
          await this.$router.push('/dashboard')
        }
      }catch (e) {
        console.log('Log in error: ' + e)
        alert('Log in error: ' + e.response.data.message)
      }
    },
    async sendRegister() {
      const userInfo = {
        username: this.username,
        password: this.password
      }
      //console.log(userInfo)
      try{
        let response = await customAxios.post('http://localhost:3000/api/user/register', userInfo)
        if (response.status == 201) {
          alert('User created successfully! Taking you to your dashboard...')
          await this.$router.push('/dashboard')
        }
      }catch (e) {
        console.log('Registration Error: ' + e.response.data.message)
        alert('Registration Error: ' + e.response.data.message)
      }
    },
    destroy() {
      this.header = ''
      this.button_text = ''
    }
  },
  mounted() {
    this.check()
  },
  destroyed() {
    this.destroy()
  }
}
</script>

<style scoped>

.heading h1{
  color: black;
  font-size: 20vw;
  font-weight: bolder;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  /*padding-left: 0.5em;*/
  /*padding-bottom: 0.5em;*/
  /*border-bottom: 1px solid black;*/
}
.form-input {
  border: 1px solid black;
  /*position: relative;*/
  margin-top: 40%;
  width: 50%;
}

.buttons {
  /*position: absolute;*/
  margin: auto;
}

.input {
  border-bottom: 1px solid black;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;

}
.input:focus{
  box-shadow: none;
}
/*NEW*/

.form-container {
  background: #f1faee;
  /*height: 100vh;*/
}

</style>