<template>
  <button class='btnSpace' @click="onClick()"><img :src="iconSpace" :alt="text+' space icon'">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
    iconSpace: String
  },
  methods: {
    onClick() {
      this.$emit('clicked')
    }
  }
}
</script>

<style scoped>
  button.btnSpace {
    display:flex;
    flex-direction:column;
    min-width:100px;
  }
</style>