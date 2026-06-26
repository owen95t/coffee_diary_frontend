<template>
  <div id="table-view">
    <div>
      <b-table
          hover
          bordered
          fixed
          responsive="sm"
          sticky-header="30rem"
          :items="dataWatch"
          :fields="fields"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          :sort-compare="mySortCompare"
          @row-clicked="info"
          class="table-view m-0 w-100"
          id="my-table"
          :filter="search"
      >
      </b-table>
<!--      Options-->
<!--      :sort-desc.sync="sortDesc"-->
<!--      :sort-by.sync="sortBy"-->

    </div>
<!--    </b-overlay>-->
    <!--    MODAL     -->
<!--    MODAL OVERLAY-->
<!--    TODO: overlay-->
    <b-modal
        v-model="showContentModal"
        size="lg"
        :title="modalInfo.title.toUpperCase()"
        >
      <template>
        <b-row id="row1">
          <b-col id="r1c1">
            <b-form-group>
              <label for="showBrand" class="mb-0">Brand:</label>
              <b-form-input v-model="modalInfo.content.brand" id="showBrand" :disabled="disabled"></b-form-input>
              <label for="showBeans" class="mb-0 mt-1">Beans:</label>
              <b-form-input v-model="modalInfo.content.beans" id="showBeans" :disabled="disabled"></b-form-input>
              <label for="showRoast" class="mb-0 mt-1">Roast:</label>
              <b-form-input v-model="modalInfo.content.roast" id="showRoast" :disabled="disabled"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col id="r1c2" class="w-100">
            <b-form-group>
              <label for="showWeight" class="mb-0">Weight:</label>
              <b-form-input v-model="modalInfo.content.weight" id="showWeight" :disabled="disabled"></b-form-input>
              <label for="showGrind" class="mb-0 mt-1">Grind Size:</label>
              <b-form-input v-model="modalInfo.content.grind_size" id="showGrind" :disabled="disabled"></b-form-input>
              <label for="showYield" class="mb-0 mt-1">Yield (gm):</label>
              <b-form-input v-model="modalInfo.content.yield" id="showYield" :disabled="disabled"></b-form-input>
              <label for="showTime" class="mb-0 mt-1">Time (sec):</label>
              <b-form-input v-model="modalInfo.content.time" id="showTime" :disabled="disabled"></b-form-input>
              <label for="showEquip" class="mb-0 mt-1">Equipment:</label>
              <b-form-input v-model="modalInfo.content.equipment" id="showEquip" :disabled="disabled"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row id="row2">
          <b-form-group class="w-100 m-3">
            <label for="showRemarks" class="mb-0 mt-1">Remarks:</label>
            <b-form-textarea
                v-model="modalInfo.content.remarks"
              rows="3"
                id="showRemarks"
                :disabled="disabled">
            </b-form-textarea>
          </b-form-group>
        </b-row>
        <b-row id="row3">
          <b-form-group class="w-100 m-3">
            <label for="showRR" class="mb-0 mt-1">Roaster Remarks:</label>
            <b-form-textarea
                v-model="modalInfo.content.roaster_remarks"
              rows="3"
              class="w-100"
                id="showRR"
               :disabled="disabled"
              >
        </b-form-textarea>
      </b-form-group>
    </b-row>
  </template>
  <template #footer>
    <b-button @click="deleteCheck" variant="danger" v-show="disabled === true">Delete</b-button>
    <b-button @click="showContentModal = false" v-show="disabled === false">Cancel</b-button>
    <b-button v-show="disabled === false" @click="toggleDisabled">Cancel Edit</b-button>
    <b-button v-show="disabled === true" @click="toggleDisabled">Edit</b-button>
    <b-button @click="showContentModal = false" variant="primary" v-show="disabled === true">OK</b-button>
    <b-button v-show="disabled === false" @click="editCheck">Save</b-button>
  </template>
</b-modal>
<!--    MODAL DELETE CONFIRM-->
<b-modal v-model="showDeleteModal" :title="`Delete ${modalInfo.title.toUpperCase()} ?`">
  <template>
    <p>Are you sure you want to delete this entry? ID: </p>
    <pre>{{modalInfo.content._id}}</pre>
  </template>
  <template #footer>
    <b-button @click="showDeleteModal = false" variant="secondary">Cancel</b-button>
    <b-button @click="deleteEntry" variant="danger">Delete</b-button>
  </template>
</b-modal>

<!--    MODAL EDIT CONFIRM-->
<b-modal v-model="showEditModal" :title="`Edit ${modalInfo.title.toUpperCase()} ?`">
  <template>
    <p>Are you sure you want to edit this entry?</p>
  </template>
  <template #footer>
    <b-button @click="showEditModal = false" variant="secondary">Cancel</b-button>
    <b-button @click="editEntry" variant="primary">Confirm Edit</b-button>
  </template>
</b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useAppStore } from '@/stores/app'

dayjs.extend(advancedFormat)

const createEmptyContent = () => ({
  _id: '',
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
})

export default {
  name: "TableView",
  props: [
      'search'
  ],
  data() {
    return {
      modalInfo: {
        title: '',
        content: createEmptyContent(),
      },
      fields: [{
        key: 'date',
        label: 'Date',
        sortable: true,
        formatter: (value, key, item) => {
          return dayjs(item.date).format('MMM Do, YYYY')
        }
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
      disabled: true,
      sortBy: 'date',
      sortDesc: true,
      showContentModal: false,
      showDeleteModal: false,
      showEditModal: false,
    }
  },
  methods: {
    ...mapActions(useAppStore, {
      fetchAllData: 'getAllData',
      removeEntry: 'deleteEntry',
      saveEntry: 'editEntry',
      resetResults: 'clearResults',
    }),
    info(item) {
      this.modalInfo.content = { ...item }
      this.modalInfo.title = item.brand + " " + item.beans
      this.disabled = true
      this.showContentModal = true
    },
    modalClose(){
      this.disabled = true
      this.modalInfo.title = ''
      this.modalInfo.content = createEmptyContent()
      this.showDeleteModal = false
      this.showEditModal = false
    },
    toggleDisabled() {
      this.disabled = !this.disabled
    },
    mySortCompare(a, b, key) {
      if (key === 'date') {
        // Assuming the date field is a `Date` object, subtraction
        // works on the date serial number (epoch value)
        return Date.parse(a[key]) - Date.parse(b[key])
      } else {
        // Let b-table handle sorting other fields (other than `date` field)
        return false
      }
    },
    deleteCheck() {
      this.showDeleteModal = true
    },
    async deleteEntry() {
      const id = this.modalInfo.content._id
      try {
        await this.removeEntry(id)
      } catch (error) {
        console.log(error)
      } finally {
        this.showDeleteModal = false
        this.showContentModal = false
      }
    },
    editCheck(){
      this.showEditModal = true
    },
    async editEntry(){
      const item = {
        id: this.modalInfo.content._id,
        body: { ...this.modalInfo.content }
      }
      try {
        await this.saveEntry(item)
      } catch (error) {
        console.log(error)
      } finally {
        this.showEditModal = false
        this.showContentModal = false
      }
    }
  },
  mounted() {
    this.fetchAllData()
  },
  watch: {
    showContentModal(newValue) {
      if (!newValue) {
        this.modalClose()
      }
    },
  },
  computed: {
    ...mapState(useAppStore, ['results']),
    dataWatch() {
      return this.results
    },
  },
  beforeUnmount() {
    this.resetResults()
  }
}
</script>

<style>

.table-view {
  overflow: auto;
  font-size: 1rem;
  height: inherit;
  width: 100%;
  cursor: pointer;
}

#my-table.table-hover tbody tr:hover {
  color: white;
  background-color: var(--bs-info);
}

</style>