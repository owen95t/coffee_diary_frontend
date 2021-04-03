<template>
<!--button component-->
<!--  Upon click, modal pops up for new entry-->
  <div id="new-entry">
    <b-button class="custom-button" v-on:click="$bvModal.show('new-entry-modal')">NEW ENTRY</b-button>
    <b-modal id="new-entry-modal" v-on:ok="postEntry" @hide="resetModal" title="New Entry">
      <template>
        <b-form-input placeholder="Enter Brand" v-model="entryInfo.brand"></b-form-input>
        <b-form-input placeholder="Enter Beans" v-model="entryInfo.beans"></b-form-input>
        <b-form-input placeholder="Enter Roast" v-model="entryInfo.roast"></b-form-input>
        <b-form-input placeholder="Enter Weight (grams)" v-model="entryInfo.weight"></b-form-input>
        <b-form-input placeholder="Enter Grind Size" v-model="entryInfo.grind_size"></b-form-input>
        <b-form-input placeholder="Enter Yield" v-model="entryInfo.yield"></b-form-input>
        <b-form-input placeholder="Enter Time (seconds)" v-model="entryInfo.time"></b-form-input>
        <b-form-input placeholder="Enter Equipment" v-model="entryInfo.equipment"></b-form-input>
        <b-form-input placeholder="Enter Remarks" v-model="entryInfo.remarks"></b-form-input>
        <b-form-input placeholder="Enter Roaster's Remarks" v-model="entryInfo.roaster_remarks"></b-form-input>
      </template>
    </b-modal>
  </div>
</template>
<script>

import customAxios from "@/customAxios/customAxios";

export default {
  name: "NewEntry",
  data() {
    return {
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
    postEntry() {
      //validate entry first
      const data = this.entryInfo
      customAxios.post('coffee/new', data).then(response => {
        if (response) {
          console.log(response.data.message);
          alert('New Entry Success')
        }
      }).catch(e => {
        console.log(e.response.data.message)
        alert('Error: '+ e.response.data.message)
      })
    },
    resetModal() {
      this.$bvModal.hide('new-entry-modal')
      for (let item in this.entryInfo) {
        this.entryInfo[item] = '';
        console.log(item)
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


</style>