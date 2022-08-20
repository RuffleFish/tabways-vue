<template>
  <div class="box-wrapper" v-if="collection">
    <div :key="link.id" v-for="link in collection">
    <Link :link="link" :collection="collection" :icon="icon" />
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
    icon: String
  },
}
</script>

<style scoped>
div.box-wrapper {
  background-color: #fefefe;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 3%;
  min-width: 420px;
}
</style>