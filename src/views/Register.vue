<template>
  <div>
    <b-row>
      <b-col>
        <Form isRegister="true"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Form from "@/components/Form";
export default {
name: "FormTest",
  components: {Form}
}
</script>

<style scoped>

.form {
  padding-top: 3em;
}

</style>