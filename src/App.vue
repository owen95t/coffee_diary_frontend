<template>
  <div id="app">
<!--    <Home/>-->
    <router-view/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

// import Home from "@/views/Home";
export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    // Home

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
  font-size: 48px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*padding: 0;*/
  /*margin: 0;*/
  /*box-sizing: border-box;*/
  /*display: flex;*/
}

</style>
