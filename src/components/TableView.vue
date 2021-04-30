<template>
  <div id="table-view">
<!--    <b-container v-if="!this.$store.getters.getLoggedIn">-->
<!--      <p>You are not logged in. Please log in again!</p>-->
<!--    </b-container>-->
    <b-container class="m-0 p-0">
      <b-table
          hover
          bordered
          responsive="sm"
          :items="this.$store.getters.getAllData"
          :per-page="perPage"
          :fields="fields"
          @row-clicked="info"
          :key="modalKey">
      </b-table>
    </b-container>
  </div>
</template>

<script>

import customAxios from "@/customAxios/customAxios";

export default {
  name: "TableView",
  data() {
    return {
      list_results: [],
      perPage: '',
      fields: [{
        key: 'date',
        label: 'Date'
      }, {
        key: 'brand',
        label: 'Brand'
      }, {
        key: 'beans',
        label: 'Beans'
      }, {
        key: 'roast',
        label: 'Roast'
      }],
      modalKey: '',
      selectedItem: '',
    }
  },
  methods: {
    info() {

    },
    // async getAll() {
    //   await customAxios.get('coffee/all').then(response => {
    //     if (response) {
    //       console.log(response)
    //       this.list_results = response.data
    //     }
    //   }).catch(e => {
    //     if (e) {
    //       console.log('getAll error: ' + e)
    //     }
    //   })
    // },
    getData() {
      try{
        this.$store.dispatch("getAllData")
      }catch (e) {
        console.log("tableview store dispatch error: "+ e)
      }
    }
  },
  mounted() {
    // this.getAll()
    this.getData()
  }
}
</script>

<style scoped>

</style>