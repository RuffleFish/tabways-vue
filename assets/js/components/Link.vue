<template>
  <div class="wrapper">
    <div class="icon-wrapper">
      <img v-if="link.favIconUrl" :src="link.favIconUrl">
      <img v-else :src="icon">
    </div>
    <div class="link-wrapper">
      <h4>{{link.title}}</h4>
      <p>{{link.url}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Link",
  props: {
    link: Object,
    icon: String
  },
  created () {
    this.test();
  },
  methods: {
    test() {
      console.log(this.icon);
    }
  }
}
</script>

<style scoped>
div.wrapper {
  display: flex;
  flex-direction: row;
  background-color: #fefefe;
  /*padding-left:  1rem;*/
  margin: 0.5rem 0 0.5rem 0;
}
div.link-wrapper {
  margin-left: 0.5rem;
  max-width: 100%;
}
div.icon-wrapper {
  width:32px;
  margin: 0.2rem 0rem 0.2rem 0rem;
}
img {
  max-width:32px;
}
h4 {
  margin: 0.2rem 0rem 0.2rem 0rem;
}
p {
  margin: 0.2rem 0rem 0.2rem 0rem;
}
</style>