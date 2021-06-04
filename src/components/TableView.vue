<template>
  <div id="table-view">
<!--    <b-spinner variant="primary" v-if="loading" class="d-flex justify-content-center" style="width: 5rem; height: 5rem;" label="Loading..."></b-spinner>-->
    <b-overlay :show="show" spinner-type="grow">
    <div>
      <b-table
          hover
          bordered
          responsive="sm"
          sticky-header="30rem"
          :items="this.$store.getters.getAllData"
          :per-page="perPage"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-compare="mySortCompare"
          @row-clicked="info"
          :key="modalKey"
          fixed
          class="table-view m-0 w-100"
          :filter="search"
      >
      </b-table>
<!--      Options-->
<!--      :sort-desc.sync="sortDesc"-->
<!--      :sort-by.sync="sortBy"-->

    </div>
    </b-overlay>
    <!--    MODAL     -->
    <b-modal
        id="content"
        @hide="modalClose"
        size="lg"
        >
      <template #modal-header>{{modalInfo.title.toUpperCase()}}</template>
      <template>
        <b-row id="row1">
          <b-col id="r1c1">
            <b-form-group

                :disabled="disabled"
            >
              <label for="showBrand" class="mb-0">Brand:</label>
              <b-form-input v-model="modalInfo.content.brand" id="showBrand"></b-form-input>
              <label for="showBeans" class="mb-0 mt-1">Beans:</label>
              <b-form-input v-model="modalInfo.content.beans" id="showBeans"></b-form-input>
              <label for="showRoast" class="mb-0 mt-1">Roast:</label>
              <b-form-input v-model="modalInfo.content.roast" id="showRoast"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col id="r1c2" class="w-100">
            <b-form-group
                :disabled="disabled"
            >
              <label for="showWeight" class="mb-0">Weight:</label>
              <b-form-input v-model="modalInfo.content.weight" id="showWeight"></b-form-input>
              <label for="showGrind" class="mb-0 mt-1">Grind Size:</label>
              <b-form-input v-model="modalInfo.content.grind_size" id="showGrind"></b-form-input>
              <label for="showYield" class="mb-0 mt-1">Yield (gm):</label>
              <b-form-input v-model="modalInfo.content.yield" id="showYield"></b-form-input>
              <label for="showTime" class="mb-0 mt-1">Time (sec):</label>
              <b-form-input v-model="modalInfo.content.time" id="showTime"></b-form-input>
              <label for="showEquip" class="mb-0 mt-1">Equipment:</label>
              <b-form-input v-model="modalInfo.content.equipment" id="showEquip"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row id="row2">
          <b-form-group
              :disabled="disabled"
            class="w-100 m-3"
          >
            <label for="showRemarks" class="mb-0 mt-1">Remarks:</label>
            <b-form-textarea
                v-model="modalInfo.content.remarks"
              rows="3"
            id="showRemarks">
            </b-form-textarea>
          </b-form-group>
        </b-row>
        <b-row id="row3">
          <b-form-group
              :disabled="disabled"
            class="w-100 m-3"
          >
            <label for="showRR" class="mb-0 mt-1">Roaster Remarks:</label>
            <b-form-textarea
                v-model="modalInfo.content.roaster_remarks"
              rows="3"
              class="w-100"
                id="showRR"
              >
            </b-form-textarea>
          </b-form-group>
        </b-row>
      </template>
      <template #modal-footer>
        <b-button v-on:click="deleteCheck" variant="danger" v-show="disabled == true">Delete</b-button>
        <b-button v-on:click="$bvModal.hide('content')" v-show="disabled == false">Cancel</b-button>
        <b-button v-show="disabled == false" v-on:click="toggleDisabled">Cancel Edit</b-button>
        <b-button v-show="disabled==true" v-on:click="toggleDisabled">Edit</b-button>
        <b-button v-on:click="$bvModal.hide('content')" variant="primary" v-show="disabled==true">OK</b-button>
        <b-button v-show="disabled == false" v-on:click="editCheck">Save</b-button>
      </template>
    </b-modal>
<!--    MODAL DELETE CONFIRM-->
    <b-modal id="deleteConfirm">
      <template #modal-title>
        Delete {{modalInfo.title.toUpperCase()}} ?
      </template>
      <template>
        <p>Are you sure you want to delete this entry? ID: </p>
        <pre>{{modalInfo.content._id}}</pre>
      </template>
      <template #modal-footer>
        <b-button v-on:click="$bvModal.hide('deleteConfirm')" variant="secondary">Cancel</b-button>
        <b-button v-on:click="deleteEntry" variant="danger">Delete</b-button>
      </template>
    </b-modal>
<!--    MODAL EDIT CONFIRM-->
    <b-modal id="editConfirm">
      <template #modal-title>
        Edit {{modalInfo.title.toUpperCase()}} ?
      </template>
      <template>
        <p>Are you sure you want to edit this entry? ID: </p>
        <pre>{{modalInfo.content._id}}</pre>
      </template>
      <template #modal-footer>
        <b-button v-on:click="$bvModal.hide('editConfirm')" variant="secondary">Cancel</b-button>
        <b-button v-on:click="editEntry" variant="primary">Confirm Edit</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>

import customAxios from "@/customAxios/customAxios";

export default {
  name: "TableView",
  props: [
      'search'
  ],
  data() {
    return {
      list_results: [],
      formatted_results: [],
      perPage: '',
      modalInfo: {
        title: '',
        content: ''
      },
      fields: [{
        key: 'date',
        label: 'Date',
        sortable: true
      }, {
        key: 'brand',
        label: 'Brand',
        sortable: true
      }, {
        key: 'beans',
        label: 'Beans',
        sortable: true
      }, {
        key: 'roast',
        label: 'Roast',
        sortable: true
      }],
      modalKey: '',
      selectedItem: {
        brand: '',
        beans: '',
        roast: '',
        weight: '',
        grind_size: '',
        yield: '',
        time: '',
        equipment: '',
        remarks: '',
        roaster_remarks: '',
      },
      disabled: true,
      sortBy: 'date',
      sortDesc: true,
      loading: false,
      searchFilter: '',
      show: false,

    }
  },
  methods: {
    info(item) {
      this.modalInfo.content = item
      this.modalInfo.title = item.brand + " " + item.beans
      // console.log(this.modalInfo.content.length)
      // for(let i of this.modalInfo.content){
      //   if(this.selectedItem[item]){
      //     this.selectedItem[item] = i
      //   }
      // }
      // Object.entries(this.modalInfo.content).forEach(item => {
      //   console.log(item)
      // })

      this.$bvModal.show('content')
    },
    getData() {
      this.loading = true
      try{
        this.$store.dispatch("getAllData")
        this.loading = false
      }catch (e) {
        console.log("tableview store dispatch error: "+ e)
      }
    },
    modalClose(){
      this.disabled = true
      this.modalInfo.content = ''
    },
    toggleDisabled() {
      this.disabled = !this.disabled
    },
    mySortCompare(a, b, key) {
      // TODO: Sorting table
      if (key === 'date') {
        // Assuming the date field is a `Date` object, subtraction
        // works on the date serial number (epoch value)
        return b[key] - a[key]
      } else {
        // Let b-table handle sorting other fields (other than `date` field)
        return false
      }
    },
    async saveEntry(){
      this.show = true
    },
    deleteCheck() {
      this.$bvModal.show('deleteConfirm')
    },
    deleteEntry() {
      const id = this.modalInfo.content._id
      this.$store.dispatch('deleteEntry', id)
      this.$bvModal.hide('deleteConfirm')
      this.$bvModal.hide('content')
      this.getData()
    },
    editCheck(){
      this.$bvModal.show('editConfirm')
    },
    editEntry(){
      const item = {
        id: this.modalInfo.content._id,
        body: this.modalInfo.content
      }
      this.$store.dispatch('editEntry', item)
      this.$bvModal.hide('editConfirm')
      this.$bvModal.hide('content')
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
  height: inherit;
  width: 100%;
}

</style>