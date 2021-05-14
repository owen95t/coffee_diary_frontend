<template>
  <div class="modal-template">
    <b-button class="custom-button m-0" v-on:click="$bvModal.show('input-modal')">
      NEW ENTRY
    </b-button>
    <b-modal id="input-modal" size="lg" class="entry-modal">
      <template id="modal-body">

        <template v-if="this.page == 0" id="page1">
          <div>
            <b-form-group
                label="Brand: "
                label-for="input-brand"
            >
              <b-form-input
                  id="input-brand"
                  required
                  v-model="entryInfo.brand"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
                label="Beans: "
                label-for="input-beans"
            >
              <b-form-input
                  id="input-beans"
                  required
                  v-model="entryInfo.beans"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
                label="Roast: "
                label-for="input-roast"
            >
              <b-form-input
                  id="input-roast"
                  required
                  v-model="entryInfo.roast"
              >
              </b-form-input>
            </b-form-group>
          </div>
        </template>

        <template v-else-if="this.page == 1" id="page2">
          <div>
            <b-form-group
                label="Weight: "
                label-for="input-weight"
            >
              <b-form-input
                  id="input-weight"
                  required
                  v-model="entryInfo.weight"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
                label="Grind Size: "
                label-for="input-grindsize"
            >
              <b-form-input
                  id="input-grindsize"
                  required
                  v-model="entryInfo.grind_size"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
                label="Yield: "
                label-for="input-yield"
            >
              <b-form-input
                  id="input-yield"
                  required
                  v-model="entryInfo.yield"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
                label="Time: "
                label-for="input-time"
            >
              <b-form-input
                  id="input-time"
                  required
                  v-model="entryInfo.time"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
                label="Equipment: "
                label-for="input-equipment"
            >
              <b-form-input
                  id="input-equipment"
                  v-model="entryInfo.equipment"
              >
              </b-form-input>
            </b-form-group>
          </div>
        </template>

        <template v-else-if="this.page == 2" id="page3">
          <div>
            <b-form-group
                label="Remarks: "
                label-for="input-remarks"
            >
              <b-form-textarea
                  id="input-remarks"
                  v-model="entryInfo.remarks"
                  rows="3"
              >
              </b-form-textarea>
            </b-form-group>
            <b-form-group
                label="Roaster Remarks: "
                label-for="input-roasterremarks"
            >
              <b-form-textarea
                  id="input-roasterremarks"
                  v-model="entryInfo.roaster_remarks"
                  rows="3"
              >
              </b-form-textarea>
            </b-form-group>
          </div>
        </template>

      </template>
      <template #modal-footer id="modal-footer">
        <b-button
            v-on:click="$bvModal.hide('input-modal')"
            variant="danger"
        >
          Close
        </b-button>
        <b-button
            v-show="page > 0"
            v-on:click="page--"
            variant="outline-dark"
        >
          Previous
        </b-button>
        <b-button
            v-show="page != 2"
            v-on:click="page++"
            variant="outline-dark"
        >
          Next
        </b-button>
        <b-button
            variant="success"
            v-show="page == 2"
            v-on:click="submit"
        >
          Submit
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "InputForm",
  data() {
    return {
      page: 0,
      templates: [],
      entryInfo: {
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
      }
    }
  },
  methods: {
    async submit() {
      this.$store.commit('setPost', this.entryInfo)
      try{
        let response = await this.$store.dispatch('postEntry')
        if(response.status == 201){
          this.$bvModal.hide('input-modal')
        }
      }catch (e) {
        console.log('Error caught at submit: ' + e)
        alert('Error Submitting + e')
      }
    }
  }
}
</script>

<style scoped>

.custom-button {
  background: none;
  border: 1px solid black;
  border-radius: 0;
  color: black;
  /*box-shadow: 5px 5px black;*/
}
.custom-button:hover {
  background: none;
  border: 1px solid black;
  color: black;
  font-style: italic;
}
.entry-modal{
  height: 50%;
}
#modal-body{
  height: 75%
}

</style>