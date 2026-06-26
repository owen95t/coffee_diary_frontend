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

<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import customAxios from '@/customAxios/customAxios'
import router from '@/router'
import { useAppStore } from '@/stores/app'
import type { ApiMessageResponse, Credentials } from '@/types/api'
import { getErrorMessage, normalizeHeaderValue } from '@/utils/api'

const props = withDefaults(
  defineProps<{
    isLogin?: boolean
    isRegister?: boolean
  }>(),
  {
    isLogin: false,
    isRegister: false,
  }
)

const isLogin = toRef(props, 'isLogin')
const isRegister = toRef(props, 'isRegister')
const appStore = useAppStore()

const username = ref('')
const password = ref('')
const show = ref(false)
const waiting = ref(true)

const header = computed(() => {
  if (isRegister.value) {
    return 'REGISTER'
  }

  if (isLogin.value) {
    return 'LOG IN'
  }

  return ''
})

const buttonText = computed(() => {
  if (isRegister.value) {
    return 'REGISTER'
  }

  if (isLogin.value) {
    return 'LOG IN'
  }

  return ''
})

const sendRegister = async (): Promise<void> => {
  const userInfo: Credentials = {
    username: username.value.toLowerCase(),
    password: password.value,
  }

  try {
    const response = await customAxios.post<ApiMessageResponse>('user/register', userInfo)

    if (response.status === 201) {
      alert('User Created Successfully! Please Login to Access Your Dashboard')
      await router.push('/login')
    }
  } catch (error: unknown) {
    const message = getErrorMessage(error)
    console.log(`Registration Error: ${message}`)
    alert(`Registration Error. Please try again.\n${message}`)
    waiting.value = true
    show.value = false
  }
}

const sendLogin = async (): Promise<void> => {
  const userInfo: Credentials = {
    username: username.value,
    password: password.value,
  }

  waiting.value = true

  try {
    const response = await customAxios.post('user/login', userInfo)

    if (response.status === 200) {
      waiting.value = false

      const csrfToken = normalizeHeaderValue(response.headers['csrftoken'])

      if (csrfToken) {
        localStorage.setItem('csrftoken', csrfToken)
      }

      appStore.setLoggedIn(true)
      window.setTimeout(() => {
        void router.push('/dashboard')
      }, 3000)
    }
  } catch (error: unknown) {
    console.log(`Log in error: ${getErrorMessage(error)}`)
    alert(`Log in error: ${getErrorMessage(error)}`)
    waiting.value = true
    show.value = false
  }
}

const submit = async (): Promise<void> => {
  waiting.value = true
  show.value = true

  if (isRegister.value) {
    await sendRegister()
    return
  }

  if (isLogin.value) {
    await sendLogin()
    return
  }
  show.value = false
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