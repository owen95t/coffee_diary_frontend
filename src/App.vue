<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import customAxios from "@/customAxios/customAxios";
import store from "@/store";

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

  },
  metaInfo: {
    title: 'Coffee Diary',
  },
  created() {
    this.$store.dispatch('checkSession')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Public+Sans');

#app {
  /*font-family: Inconsolata, sans-serif;*/
  font-family: Public Sans, sans-serif;
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
