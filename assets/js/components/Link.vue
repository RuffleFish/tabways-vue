<template>
  <h3>{{link.title}} {{link.url}}</h3>
</template>

<script>
export default {
  name: "Link",
  props: {
    link: Object,
  },
}
</script>

<style scoped>

</style>