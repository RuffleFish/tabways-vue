<template>
  <form>
<!--    <label>Add Collection</label>-->
    <input type="text" id="collectionName" v-model="collectionName" name="collectionName">
    <button @click="onClicked()" type="submit"> + Add Collection </button>
  </form>
</template>

<script>
import Button from './Button'

export default {
  name: 'AddCollection',
  components: {
    Button
  },
  data() {
    return {
      collectionName: 'test',
      goal: ''
    }
  },
  methods: {
    onClicked(e) {
      e.preventDefault();
      this.$emit("clicked");
      const data = {
        title: '',
      }
    }
  }
}
</script>

<style scoped>
input {
  font-family: Titillium Web, Arial, Helvetica, sans-serif;
  line-height:1.7;
  margin-bottom: 7px;
  margin-right:0.5rem;
  padding-top: 3px;
}
</style>