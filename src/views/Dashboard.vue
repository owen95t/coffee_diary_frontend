<template>
  <div id="dashboard">
    <b-container fluid="xl">
      <b-row class="justify-content-center mt-5">
        <h1>Welcome to your Dashboard!</h1>
      </b-row>
      <b-row class="mt-3 h-auto">
        <b-col cols="10">
          <b-form-input class="custom-input-search" v-model="search_term" placeholder="Search..."></b-form-input>
        </b-col>
        <b-col>
<!--          <div class="float-right"><NewEntry/></div>-->
          <div class="float-right"><InputForm/></div>
        </b-col>
      </b-row>
      <b-row class="mt-3 border border-dark no-gutters mb-3" no-gutters style="height: 30rem">
        <b-col>
<!--          main content-->
          <TableView/>
        </b-col>
      </b-row>
    </b-container>
    <p v-on:click="logout">Logout</p>
  </div>
</template>

<script>
import customAxios from "@/customAxios/customAxios";
//import NewEntry from "@/components/NewEntry";
import TableView from "@/components/TableView";
import InputForm from "@/components/InputForm";

customAxios.defaults.xsrfHeaderName = 'X-CSRFToken';
customAxios.defaults.xsrfCookieName = 'csrftoken';

export default {
  name: "Dashboard",
  components: {InputForm, TableView},
  data() {
    return {
      message: '',
      search_term: ''
    }
  },
  methods: {
    testRequest() {
      // customAxios.defaults.headers.get['auth-token']
      customAxios.get('user/details').then(response => {
        if (response) {
          this.message = response.data.message
        }
      }).catch(e => {
        if (e) {
          console.log(e)
          this.message = e.response.data.message
        }
      })
    },
    logout() {
      customAxios.get('user/logout').then(response => {
        if (response) {
          console.log(response.data.message)
          this.$router.push('/')
        }
      }).catch(e => {
        if (e) {
          console.log(e);
          this.message = e.response.data.message
        }
      })
    }
  }
}
</script>

<style scoped>
.custom-input-search {
  border: 1px solid black;
  border-radius: 0;
  color: black;
}

.sidebar {
  max-width: 25%;
  height: 100%;
}
</style>