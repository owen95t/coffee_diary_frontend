<template>
  <div id="form">
    <div class="container">
      <div class="heading">
        <h1>{{ header }}</h1>
      </div>
      <div class="form-input">
        <b-form>
          <b-form-input id="input-email" class="input" placeholder="ENTER EMAIL" v-model="email" required></b-form-input>
        </b-form>
        <b-form>
          <b-form-input type="password" id="input-password" class="input" placeholder="ENTER PASSWORD" required></b-form-input>
        </b-form>
        <div class="buttons">
          <b-button class="custom-button" v-on:click="submit">{{button_text}}</b-button>
          <b-button class="custom-button" v-on:click="$router.push('/')">CANCEL</b-button>
        </div>
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
      email: '',
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
        username: this.email,
        password: this.password
      }
      await customAxios.post('http://localhost:3000/api/user/login', userInfo).then(response => {
        if (response) {
          console.log(response.data.message)
          if (response.status == 200) {
            alert('Log in success! Taking you to your dashboard...')
            this.$router.push('/dashboard')
          }
        }
      }).catch(e => {
        if (e) {
          console.log('LOG IN ERROR: ')
          console.log(e.response.data.message)
        }
      })
    },
    sendRegister() {
      const userInfo = {
        username: this.email,
        password: this.password
      }
      customAxios.post('http:localhost:3000/api/user/register', userInfo).then(response => {
        if (response) {
          console.log(response.data.message)
          if (response.status == 201) {
            alert('User created successfully! Taking you to your dashboard...')
            this.$router.push('/dashboard')
          }
        }
      }).catch(e => {
        if (e) {
          console.log('REGISTER ERROR: ')
          console.log(e.response.data.message)
        }
      })
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

.container {
  /*border: 1px solid black;*/
  /*width: 50%;*/
  text-transform: uppercase;
}
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
  position: relative;
  margin-top: 25%;
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
  width: 100%;
  margin-left: 1em;
}
.input:focus{
  box-shadow: none;
}


</style>