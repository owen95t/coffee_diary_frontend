<template>
  <keep-alive>
  <component
    v-bind:is="inputButton">
  </component>
  </keep-alive>
</template>

<script>
export default {
  name: "InputButton",
  data(){
    return{
      inputButton: {
        template: '<b-button>New Entry</b-button>'
      }
    }
  }
}
</script>

<style scoped>

</style>