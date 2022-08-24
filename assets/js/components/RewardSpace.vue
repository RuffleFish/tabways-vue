<template>
<div class="rewardSpace">
  <img src="../../images/reward-space-mockup-r.png" alt="Rewards space mockup image.">
  <Button text="Go to Reward Space" color="grey"/>
</div>
</template>

<script>
import Button from './Button'

export default {
  name: "RewardSpace",
  components: {
    Button
  }
}
</script>

<style scoped>
img {
  max-width: 550px;
}
div.rewardSpace {
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  align-items: center;
}
</style>