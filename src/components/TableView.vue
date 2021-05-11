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
          :key="modalKey"
          class="table-view">
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
      formatted_results: [],
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
  },
  watch: {
    formatDate() {
      for(let i = 0; i < this.list_results.length; i++){
        let day = Date.parse(this.list_results[i].date);
        this.list_results[i].date = day.toLocaleString('en-US', {dateStyle: "short"})
      }
    }
  }
}
</script>

<style scoped>

.table-view {
  overflow: auto;
  font-size: 1rem;
}

</style>