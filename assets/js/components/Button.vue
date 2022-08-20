<template>
  <button class='btn' @click="onClick()" :style="{background: color}"> {{ text }} </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
    space: Boolean,
    spaceName: String,
    icon: String
  },
  methods: {
    onClick() {
      this.$emit('clicked')
    }
  }
}
</script>

<style scoped>

</style>