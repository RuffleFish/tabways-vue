<template>
  <div class="header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "Header.vue",
  props: {
    title: String,
    space: String
  }
}
</script>

<style scoped>

</style>