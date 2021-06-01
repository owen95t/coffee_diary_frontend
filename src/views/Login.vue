<template>
  <div>
    <b-row>
      <b-col>
        <Form isLogin="true"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import customAxios from "@/customAxios/customAxios";
import Form from "@/components/Form";

// customAxios.defaults.xsrfHeaderName = 'X-CSRFToken';
// customAxios.defaults.xsrfCookieName = 'csrftoken';

export default {
  name: "Login",
  components: {Form},
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>


</style>