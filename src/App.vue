<template>
  <div id="app">
    <b-navbar id="custom-nav" toggleable="lg" class="justify-content-between">
      <b-navbar-brand><router-link to="/">Coffee Diary</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/dashboard" >Dashboard</b-nav-item>
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/register">Register</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-navbar-nav class="ml-auto">
        <!--        RIGHT SIDE ITEMS    -->
<!--        TODO: MOVE LOGIN BUTTON TO RIGHT SIDE-->
      </b-navbar-nav>

    </b-navbar>
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-view/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {

  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Inconsolata');
#app {
  font-family: Inconsolata, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a.router-link-active {
  text-decoration: none;
}

#custom-nav a{
  color: black;
}
#custom-nav a:hover{
  font-style: italic;
}


</style>
