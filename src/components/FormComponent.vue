<template>
    <div class="container">
      <div class="heading">
        <h1>{{ header }}</h1>
      </div>
      <form class="form-input mx-auto" @submit.prevent="submit">
        <div class="mb-0">
          <input id="input-email" class="input form-control" type="email" placeholder="ENTER EMAIL" v-model="username" required>
        </div>
        <div class="mt-0">
          <input type="password" id="input-password" class="input form-control" placeholder="ENTER PASSWORD" v-model="password" required>
        </div>
        <a @click="proxy.$router.push('/')" style="font-size: 3vw; cursor: pointer">Forgot Password</a>
        <div class="buttons">
          <button type="button" class="btn custom-button me-1" @click="submit">{{button_text}}</button>
          <button type="button" class="btn custom-button ms-1" @click="proxy.$router.push('/')">CANCEL</button>
        </div>
      </form>
    </div>
</template>

<!-- <script>
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
        let response = await customAxios.post('user/login', userInfo)
        if(response.status == 200){
          alert('Log in success! Taking you to your dashboard...')
          console.log('CSRFToken: ' + response.headers['csrftoken'])
          localStorage.setItem('csrftoken', response.headers['csrftoken'])
          // this.$store.commit("setCSRFToken", token)
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
</script> -->

<script setup>
import customAxios from "../customAxios/customAxios";
import { onMounted, onUnmounted, ref, getCurrentInstance } from 'vue';

const props = defineProps({
  isRegister: Boolean,
  isLogin: Boolean,
})

const header = ref('')
const button_text = ref('')
const username = ref('')
const password = ref('')

const { proxy } = getCurrentInstance()

const check = () => {
  if (props.isRegister) {
    header.value = 'REGISTER'
    button_text.value = 'REGISTER'
  }else if (props.isLogin) {
    header.value = 'LOG IN'
    button_text.value = 'LOG IN'
  }
}

const submit = () => {
  if (props.isRegister) {
    sendRegister()
  }else if (props.isLogin) {
    sendLogin()
  }
}

const sendLogin = async () => {
  const userInfo = {
    username: username.value,
    password: password.value
  }
  try {
    let response = await customAxios.post('user/login', userInfo)
    if(response.status == 200){
      alert('Log in success! Taking you to your dashboard...')
      console.log('CSRFToken: ' + response.headers['csrftoken'])
      localStorage.setItem('csrftoken', response.headers['csrftoken'])
      // this.$store.commit("setCSRFToken", token)
      await proxy.$store.dispatch("setLoggedIn", true);
      await proxy.$router.push('/dashboard')
    }
  }catch (e) {
    console.log('Log in error: ' + e)
    alert('Log in error: ' + e.response.data.message)
  }
}

const sendRegister = async () => {
  const userInfo = {
    username: username.value,
    password: password.value
  }
  //console.log(userInfo)
  try{
    let response = await customAxios.post('http://localhost:3000/api/user/register', userInfo)
    if (response.status == 201) {
      alert('User created successfully! Taking you to your dashboard...')
      await proxy.$router.push('/dashboard')
    }
  }catch (e) {
    console.log('Registration Error: ' + e.response.data.message)
    alert('Registration Error: ' + e.response.data.message)
  }
}

const destroy = () => {
  header.value = ''
  button_text.value = ''
}

onMounted(() => {
  check()
})

onUnmounted(() => {
  destroy()
})

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
  border-color: black;
}
/*NEW*/

.form-container {
  background: #f1faee;
  /*height: 100vh;*/
}

</style>