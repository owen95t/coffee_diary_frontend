<template>
  <div id="dashboard">
    <b-container fluid="xl">
      <b-row class="justify-content-center mt-5">
        <h1>Welcome to your Coffee Diary!</h1>
      </b-row>
      <b-row class="">
        <b-col>
          <b-input-group class="mt-4">
            <b-form-input class="custom-input-search" v-model="search_term" placeholder="Search..."></b-form-input>
            <b-input-group-append class=""><b-button class="custom-button" v-on:click="openModal">NEW ENTRY</b-button></b-input-group-append>
          </b-input-group>

        </b-col>
      </b-row>
      <b-row class="mt-3 border border-dark no-gutters mb-3" no-gutters style="height: 30rem">
        <b-col class="main-column">
<!--          main content-->
          <b-overlay :show="show">
          <TableView :search="search_term"/>
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
    <b-link v-on:click="logout" class="logout-button">LOG OUT</b-link>
    <!--  MODAL NEW ENTRY-->
    <InputForm ref="modalComp"/>
<!--    <b-button v-on:click="testCSRF">Test CSRFToken</b-button>-->
<!--    <p>{{tokenTest}}</p>-->

  </div>
</template>

<script>
import customAxios from "@/customAxios/customAxios";
//import NewEntry from "@/components/NewEntry";
import TableView from "@/components/TableView";
import InputForm from "@/components/InputForm";


// customAxios.defaults.xsrfHeaderName = 'X-CSRFToken';
// customAxios.defaults.xsrfCookieName = 'csrftoken';

export default {
  name: "Dashboard",
  components: {InputForm, TableView},
  data() {
    return {
      message: '',
      search_term: '',
      tokenTest: '',
      show: true
    }
  },
  computed: {
    isLoggedIn(){
      return this.$store.state.isLoggedIn
    },
    gettingWatch() {
      console.log(this.$store.getters.getGettingData)
      return this.$store.getters.getGettingData
    }
  },
  watch: {
    gettingWatch(newStat) {
      if (newStat === true) {
        console.log('newstatTrue')
        this.show = true
      }else if (newStat === false) {
        this.show = false
      }
    }
  },

  created() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
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
    async logout() {
      await customAxios.get('user/logout').then(response => {
        if (response) {
          console.log('logout response is...')
          console.log(response.data.message)
          this.$store.dispatch('setLoggedIn', false)
          this.$router.push('/')
        }
      }).catch(e => {
        if (e) {
          console.log(e);
          this.message = e.response.data.message
        }
      })
    },
    openModal(){
      this.$refs.modalComp.show()
    },
    // async testCSRF() {
    //   let token = this.$store.getters.getToken
    //
    //   try{
    //     let response = await customAxios.get('user/test', {
    //       params: {
    //         _csrf: token
    //       }
    //     })
    //     if (response) {
    //       this.tokenTest = response.data
    //     }
    //   }catch (e) {
    //     console.log(e)
    //   }
    // }
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
  text-decoration: none;
}
.logout-button:hover{
  text-decoration: none;
  text-transform: lowercase;
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