<template>
    <div class="wrapper">

      <h1>Tabways</h1>
      <p>Your tab is saved here:</p>
      <div class='field'>
        <label for='select1'></label>
        <select id='space'>
          <option value='work' selected>Work space</option>
          <option value='fun'>Fun space</option>
          <option value='music'>Music space</option>
        </select>
        <select id='space'>
          <option value='goal1'>Expert Cook goal</option>
          <option value='goal2'>Everyday Musician goal</option>
          <option value='goal3' selected>No Distractions goal</option>
        </select>
      </div>

<!--      <div class='fieldset'> this button is linked to Vue scripts  -->
<!--        <button @click="onClick()" type='submit'>Submit Form</button>-->
<!--      </div>-->
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: true,
            list: "example.com",
            icons: {
                active: 'images/icon-48x48.png',
                inactive: 'images/icon-48x48-off.png'
            }
        }
    },
    methods: {
        onClick() {
        console.log("click!");
        }

    }
}
</script>

<style scoped>
div.field {
  display:flex;
  flex-direction:row;
}
</style>