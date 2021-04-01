<template>
  <div id="dashboard">
    <h1>Welcome to your Dashboard!</h1>
    <b-button v-on:click="testRequest">Test Request</b-button>
    <p>{{message}}</p>
    <NewEntry/>
    <TableView/>
  </div>
</template>

<script>
import customAxios from "@/customAxios/customAxios";
import NewEntry from "@/components/NewEntry";
import TableView from "@/components/TableView";

customAxios.defaults.xsrfHeaderName = 'X-CSRFToken';
customAxios.defaults.xsrfCookieName = 'csrftoken';

export default {
  name: "Dashboard",
  components: {TableView, NewEntry},
  data() {
    return {
      message: ''
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
    }
  }
}
</script>

<style scoped>

</style>