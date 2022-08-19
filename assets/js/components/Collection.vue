<template>
  <div v-if="collection">
    <div :key="link.id" v-for="link in collection">
    <Link :link="link" />
    </div>
  </div>
  <div v-else>
    <h3>...loading</h3> <!-- can put loading animation here -->
  </div>
</template>

<script>
import Link from './Link'

export default {
  name: "Collection",
  components: {
    Link
  },
  props: {
    collection: Array,
  },
}
</script>

<style scoped>

</style>