<template>
    <div class="wrapper">

      <h1>Tabways</h1>
      <p>Select a space. </p>
      <div class='field'>
        <label for='select1'>Select</label>
        <select id='select1'>
          <option value=''>Select</option>
          <option value='Select One'>Select One</option>
          <option value='Select Two'>Select Two</option>
          <option value='Select Three'>Select Three</option>
        </select>
      </div>

      <div class='fieldset'>
        <button @click="onClick()" type='submit'>Submit Form</button>
      </div></div>
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
