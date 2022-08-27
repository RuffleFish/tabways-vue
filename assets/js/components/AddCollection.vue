<template>
  <form @submit.prevent="onSubmit()" > <!-- v-on:submit.prevent=-->
<!--    <label>Add Collection</label>-->
    <input type="text" id="collectionName" v-model="collectionName" name="collectionName">
    <button class="btn" type="submit"> + Add Collection </button>
  </form>
</template>

<script>
import Button from './Button'

export default {
  name: 'AddCollection',
  components: {
    Button,
  },
  data() {
    return {
      collectionName: 'test',
      goal: ''
    }
  },
  methods: {
    onSubmit() {
      console.log("clicked"+this.collectionName)
      this.$emit("submitted", this.collectionName)
      // const data = {
      //   title: '',
      //   collectionName: ''
      // }
      // console.log(data);
      this.collectionName = '' // clear the field
    },
  },
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