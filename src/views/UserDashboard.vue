<template>
  <div id="dashboard">
    <b-overlay :show="loggingOut" style="height: 100vh">
    <b-container fluid="xl">
      <b-row class="justify-content-center mt-5">
        <h1>Welcome to your Coffee Diary!</h1>
      </b-row>
      <b-row class="">
        <b-col>
          <b-input-group class="mt-4">
            <b-form-input class="custom-input-search" v-model="searchTerm" placeholder="Search..."></b-form-input>
            <template #append>
              <b-button class="custom-button" @click="openModal">NEW ENTRY</b-button>
            </template>
          </b-input-group>

        </b-col>
      </b-row>
      <b-row class="mt-3 border border-dark g-0 mb-3" style="height: 30rem">
        <b-col class="main-column">
<!--          main content-->
          <b-overlay :show="gettingData">
          <TableView :search="searchTerm"/>
            <template #overlay>
              <div class="text-center">
                <b-spinner variant="info" style="height: 5rem; width: 5rem"></b-spinner>
                <p>Working on it!</p>
              </div>
            </template>
          </b-overlay>
        </b-col>
      </b-row>
    </b-container>
    <b-link @click="handleLogout" class="logout-button">LOG OUT</b-link>
    <!--  MODAL NEW ENTRY-->
    <InputForm ref="modalComp"/>
<!--    <b-button v-on:click="testCSRF">Test CSRFToken</b-button>-->
<!--    <p>{{tokenTest}}</p>-->
      <template #overlay>
        <div class="text-center">
          <b-spinner variant="info" style="height: 7rem; width: 7rem;"></b-spinner>
          <p>Logging you out...</p>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import TableView from '@/components/TableView.vue'
import InputForm from '@/components/InputForm.vue'
import { useAppStore } from '@/stores/app'

export default {
  name: "UserDashboard",
  components: {InputForm, TableView},
  data() {
    return {
      searchTerm: '',
    }
  },
  computed: {
    ...mapState(useAppStore, ['gettingData', 'isLoggedIn', 'loggingOut']),
  },
  watch: {
    isLoggedIn(newValue) {
      if (!newValue && !this.loggingOut) {
        this.$router.push('/login')
      }
    },
  },
  methods: {
    ...mapActions(useAppStore, ['logout']),
    async handleLogout() {
      const loggedOut = await this.logout()
      if (loggedOut) {
        await this.$router.push('/')
      }
    },
    openModal(){
      this.$refs.modalComp.show()
    },
  }
}
</script>

<style scoped>
#dashboard{
  height: 100vh;
}
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
.custom-input-search {
  border: 1px solid black;
  border-radius: 0;
  color: black;
}

.sidebar {
  max-width: 25%;
  height: 100%;
}

.logout-button {
  color: black;
  text-decoration: underline;
}
.logout-button:hover{
  text-decoration: underline;
  font-style: italic;
}

.main-column{

}

.input-form{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
</style>