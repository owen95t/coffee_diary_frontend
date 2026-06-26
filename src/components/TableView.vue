<template>
  <div id="table-view">
    <div>
      <b-table
          hover
          bordered
          fixed
          responsive="sm"
          sticky-header="30rem"
          :items="results"
          :fields="fields"
          :sort-by="sortBy"
          :sort-compare="mySortCompare"
          @row-clicked="handleRowClicked"
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

<script setup lang="ts">
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted, reactive, ref, toRef, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { createEmptyCoffeeEntry } from '@/types/coffee'
import type { CoffeeEntry, CoffeeEntryUpdate } from '@/types/coffee'

dayjs.extend(advancedFormat)

type TableSortOrder = 'desc' | 'asc' | undefined

interface ModalInfo {
  title: string
  content: CoffeeEntry
}

interface TableFieldFormatterObject<T> {
  value: unknown
  key: string
  item: T
}

interface TableFieldLike<T> {
  key: string
  label?: string
  sortable?: boolean
  formatter?: (obj: TableFieldFormatterObject<T>) => string
}

interface TableSortByLike {
  key: string
  order: TableSortOrder
}

interface TableRowClickEvent<T> {
  item: T
  index: number
  event: Readonly<MouseEvent> | Readonly<KeyboardEvent>
}

const props = defineProps<{
  search: string
}>()

const search = toRef(props, 'search')
const appStore = useAppStore()
const { results } = storeToRefs(appStore)

const modalInfo = reactive<ModalInfo>({
  title: '',
  content: createEmptyCoffeeEntry(),
})

const fields: TableFieldLike<CoffeeEntry>[] = [
  {
    key: 'date',
    label: 'Date',
    sortable: true,
    formatter: ({ item }) => dayjs(item.date).format('MMM Do, YYYY'),
  },
  {
    key: 'brand',
    label: 'Brand',
    sortable: true,
  },
  {
    key: 'beans',
    label: 'Beans',
    sortable: true,
  },
  {
    key: 'roast',
    label: 'Roast',
    sortable: true,
  },
]

const disabled = ref(true)
const sortBy = ref<TableSortByLike[]>([{ key: 'date', order: 'desc' }])
const showContentModal = ref(false)
const showDeleteModal = ref(false)
const showEditModal = ref(false)

const info = (item: CoffeeEntry): void => {
  modalInfo.content = { ...item }
  modalInfo.title = `${item.brand} ${item.beans}`
  disabled.value = true
  showContentModal.value = true
}

const handleRowClicked = ({ item }: TableRowClickEvent<CoffeeEntry>): void => {
  info(item)
}

const modalClose = (): void => {
  disabled.value = true
  modalInfo.title = ''
  modalInfo.content = createEmptyCoffeeEntry()
  showDeleteModal.value = false
  showEditModal.value = false
}

const toggleDisabled = (): void => {
  disabled.value = !disabled.value
}

const mySortCompare = (a: CoffeeEntry, b: CoffeeEntry, key: string): number => {
  if (key === 'date') {
    return Date.parse(a.date) - Date.parse(b.date)
  }

  return String(a[key as keyof CoffeeEntry] ?? '').localeCompare(String(b[key as keyof CoffeeEntry] ?? ''))
}

const deleteCheck = (): void => {
  showDeleteModal.value = true
}

const deleteEntry = async (): Promise<void> => {
  const id = modalInfo.content._id

  try {
    await appStore.deleteEntry(id)
  } catch (error: unknown) {
    console.log(error)
  } finally {
    showDeleteModal.value = false
    showContentModal.value = false
  }
}

const editCheck = (): void => {
  showEditModal.value = true
}

const editEntry = async (): Promise<void> => {
  const item: CoffeeEntryUpdate = {
    id: modalInfo.content._id,
    body: { ...modalInfo.content },
  }

  try {
    await appStore.editEntry(item)
  } catch (error: unknown) {
    console.log(error)
  } finally {
    showEditModal.value = false
    showContentModal.value = false
  }
}

onMounted(() => {
  void appStore.getAllData()
})

watch(showContentModal, (newValue) => {
  if (!newValue) {
    modalClose()
  }
})

onBeforeUnmount(() => {
  appStore.clearResults()
})
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